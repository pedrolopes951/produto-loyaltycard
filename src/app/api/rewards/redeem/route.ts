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

    const business = await prisma.business.findUnique({
      where: { slug: businessSlug },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Negocio nao encontrado" },
        { status: 404 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: {
        phone_businessId: {
          phone,
          businessId: business.id,
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Cliente nao encontrado" },
        { status: 404 }
      );
    }

    if (customer.stamps < business.stampsNeeded) {
      return NextResponse.json(
        {
          error: `Faltam ${business.stampsNeeded - customer.stamps} carimbos para a recompensa`,
        },
        { status: 400 }
      );
    }

    const updated = await prisma.customer.update({
      where: { id: customer.id },
      data: {
        stamps: 0,
        totalRewards: customer.totalRewards + 1,
      },
    });

    return NextResponse.json({
      success: true,
      customer: {
        phone: updated.phone,
        stamps: updated.stamps,
        totalRewards: updated.totalRewards,
      },
      message: "Recompensa resgatada com sucesso!",
    });
  } catch (error) {
    console.error("Redeem error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
