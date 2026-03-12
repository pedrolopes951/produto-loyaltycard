import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessSlug = searchParams.get("businessSlug");

    if (!businessSlug) {
      return NextResponse.json(
        { error: "businessSlug e obrigatorio" },
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

    const totalCustomers = await prisma.customer.count({
      where: { businessId: business.id },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stampsToday = await prisma.customer.count({
      where: {
        businessId: business.id,
        lastStampAt: { gte: today },
      },
    });

    const totalRewards = await prisma.customer.aggregate({
      where: { businessId: business.id },
      _sum: { totalRewards: true },
    });

    return NextResponse.json({
      totalCustomers,
      stampsToday,
      totalRewardsRedeemed: totalRewards._sum.totalRewards ?? 0,
      business: {
        name: business.name,
        slug: business.slug,
        stampsNeeded: business.stampsNeeded,
        rewardText: business.rewardText,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
