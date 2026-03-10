import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const stamp = {
    id: `stamp-${Date.now()}`,
    customerCardId: id,
    scannedAt: new Date().toISOString(),
    staffNote: body.staffNote || null,
  };

  // Mock: return updated customer card state
  const customerCard = {
    id,
    customerId: "cust-1",
    loyaltyCardId: "card-1",
    currentStamps: 7,
    isComplete: false,
    completedAt: null,
  };

  return NextResponse.json({
    stamp,
    customerCard,
    message: "Carimbo adicionado com sucesso",
  });
}
