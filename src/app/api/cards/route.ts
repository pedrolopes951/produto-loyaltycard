import { NextRequest, NextResponse } from "next/server";

const mockCards = [
  {
    id: "1",
    name: "Cafe Expresso",
    description: "10 cafes, 1 gratis",
    stampsRequired: 10,
    reward: "Cafe Expresso Gratis",
    color: "#f43f5e",
    isActive: true,
    businessId: "biz-1",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Pastel de Nata",
    description: "5 pasteis, 1 gratis",
    stampsRequired: 5,
    reward: "Pastel de Nata Gratis",
    color: "#ec4899",
    isActive: true,
    businessId: "biz-1",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "3",
    name: "Desconto 20%",
    description: "8 compras, desconto especial",
    stampsRequired: 8,
    reward: "20% de Desconto",
    color: "#f472b6",
    isActive: false,
    businessId: "biz-1",
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-02-15T10:00:00Z",
  },
];

export async function GET() {
  return NextResponse.json({ cards: mockCards });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newCard = {
    id: `card-${Date.now()}`,
    name: body.name,
    description: body.description || "",
    stampsRequired: body.stampsRequired || 10,
    reward: body.reward || "",
    color: body.color || "#f43f5e",
    isActive: true,
    businessId: "biz-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({ card: newCard }, { status: 201 });
}
