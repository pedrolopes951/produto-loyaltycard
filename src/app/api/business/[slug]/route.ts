import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const business = await prisma.business.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { customers: true },
        },
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Negocio nao encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      business: {
        id: business.id,
        name: business.name,
        slug: business.slug,
        stampsNeeded: business.stampsNeeded,
        rewardText: business.rewardText,
        totalCustomers: business._count.customers,
        createdAt: business.createdAt,
      },
    });
  } catch (error) {
    console.error("Business lookup error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const business = await prisma.business.findUnique({
      where: { slug },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Negocio nao encontrado" },
        { status: 404 }
      );
    }

    const updated = await prisma.business.update({
      where: { slug },
      data: {
        name: body.name ?? business.name,
        stampsNeeded: body.stampsNeeded ?? business.stampsNeeded,
        rewardText: body.rewardText ?? business.rewardText,
      },
    });

    return NextResponse.json({ business: updated });
  } catch (error) {
    console.error("Business update error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
