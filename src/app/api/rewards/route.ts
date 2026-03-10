import { NextRequest, NextResponse } from "next/server";

const mockRewards = [
  { id: "1", name: "Cafe Gratis", description: "Um cafe expresso ou americano a escolha", stampsRequired: 10, timesRedeemed: 34, loyaltyCardId: "card-1", businessId: "biz-1", createdAt: "2026-01-15T10:00:00Z" },
  { id: "2", name: "Desconto 20%", description: "20% de desconto na proxima compra", stampsRequired: 8, timesRedeemed: 12, loyaltyCardId: "card-3", businessId: "biz-1", createdAt: "2026-02-15T10:00:00Z" },
  { id: "3", name: "Pastel de Nata Gratis", description: "Um pastel de nata acabado de sair do forno", stampsRequired: 5, timesRedeemed: 45, loyaltyCardId: "card-2", businessId: "biz-1", createdAt: "2026-02-01T10:00:00Z" },
];

export async function GET() {
  return NextResponse.json({ rewards: mockRewards });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newReward = {
    id: `reward-${Date.now()}`,
    name: body.name,
    description: body.description || "",
    stampsRequired: body.stampsRequired || 10,
    timesRedeemed: 0,
    loyaltyCardId: body.loyaltyCardId || null,
    businessId: "biz-1",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ reward: newReward }, { status: 201 });
}
