import { NextResponse } from "next/server";

const mockCustomers = [
  { id: "1", name: "Maria Santos", phone: "+351912345678", email: "maria@email.pt", businessId: "biz-1", totalStamps: 47, cardsCompleted: 4, createdAt: "2026-01-10T10:00:00Z", updatedAt: "2026-03-10T10:00:00Z" },
  { id: "2", name: "Joao Pereira", phone: "+351923456789", email: "joao@email.pt", businessId: "biz-1", totalStamps: 38, cardsCompleted: 3, createdAt: "2026-02-05T10:00:00Z", updatedAt: "2026-03-10T10:00:00Z" },
  { id: "3", name: "Ana Rodrigues", phone: "+351934567890", email: "ana@email.pt", businessId: "biz-1", totalStamps: 32, cardsCompleted: 3, createdAt: "2026-01-20T10:00:00Z", updatedAt: "2026-03-09T10:00:00Z" },
  { id: "4", name: "Miguel Ferreira", phone: "+351945678901", email: "miguel@email.pt", businessId: "biz-1", totalStamps: 25, cardsCompleted: 2, createdAt: "2026-03-01T10:00:00Z", updatedAt: "2026-03-10T10:00:00Z" },
  { id: "5", name: "Sofia Lima", phone: "+351956789012", email: "sofia@email.pt", businessId: "biz-1", totalStamps: 21, cardsCompleted: 2, createdAt: "2026-02-15T10:00:00Z", updatedAt: "2026-03-08T10:00:00Z" },
];

export async function GET() {
  return NextResponse.json({ customers: mockCustomers });
}
