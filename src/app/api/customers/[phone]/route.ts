import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ phone: string }> }
) {
  try {
    const { phone } = await params;
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

    const customer = await prisma.customer.findUnique({
      where: {
        phone_businessId: {
          phone: decodeURIComponent(phone),
          businessId: business.id,
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          customer: null,
          business: {
            name: business.name,
            slug: business.slug,
            stampsNeeded: business.stampsNeeded,
            rewardText: business.rewardText,
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      customer: {
        phone: customer.phone,
        stamps: customer.stamps,
        totalRewards: customer.totalRewards,
        lastStampAt: customer.lastStampAt,
        createdAt: customer.createdAt,
      },
      business: {
        name: business.name,
        slug: business.slug,
        stampsNeeded: business.stampsNeeded,
        rewardText: business.rewardText,
      },
    });
  } catch (error) {
    console.error("Customer lookup error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
