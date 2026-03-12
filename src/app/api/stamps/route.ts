import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessSlug, phone } = body;

    if (!businessSlug || !phone) {
      return NextResponse.json(
        { error: "businessSlug e phone sao obrigatorios" },
        { status: 400 }
      );
    }

    // Find business
    const business = await prisma.business.findUnique({
      where: { slug: businessSlug },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Negocio nao encontrado" },
        { status: 404 }
      );
    }

    // Find or create customer
    let customer = await prisma.customer.findUnique({
      where: {
        phone_businessId: {
          phone,
          businessId: business.id,
        },
      },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          phone,
          businessId: business.id,
        },
      });
    }

    // Check if already stamped today
    if (customer.lastStampAt) {
      const today = new Date();
      const lastStamp = new Date(customer.lastStampAt);
      if (
        lastStamp.getFullYear() === today.getFullYear() &&
        lastStamp.getMonth() === today.getMonth() &&
        lastStamp.getDate() === today.getDate()
      ) {
        return NextResponse.json(
          {
            error: "Ja recebeu carimbo hoje. Volte amanha!",
            customer: {
              phone: customer.phone,
              stamps: customer.stamps,
              totalRewards: customer.totalRewards,
              stampsNeeded: business.stampsNeeded,
              rewardText: business.rewardText,
            },
          },
          { status: 429 }
        );
      }
    }

    // Add stamp
    const newStamps = customer.stamps + 1;
    let rewardUnlocked = false;
    let finalStamps = newStamps;
    let totalRewards = customer.totalRewards;

    // Check if reward reached
    if (newStamps >= business.stampsNeeded) {
      rewardUnlocked = true;
      // Don't auto-reset — let the business redeem manually
      finalStamps = newStamps;
    }

    const updated = await prisma.customer.update({
      where: { id: customer.id },
      data: {
        stamps: finalStamps,
        totalRewards,
        lastStampAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      customer: {
        phone: updated.phone,
        stamps: updated.stamps,
        totalRewards: updated.totalRewards,
        stampsNeeded: business.stampsNeeded,
        rewardText: business.rewardText,
      },
      rewardUnlocked,
      message: rewardUnlocked
        ? "Recompensa desbloqueada!"
        : "Carimbo adicionado!",
    });
  } catch (error) {
    console.error("Stamp error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
