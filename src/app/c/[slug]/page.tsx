"use client";

import { Check, Gift, Stamp } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const DEMO_BUSINESSES: Record<string, { name: string; stampsNeeded: number; rewardText: string }> = {
  "cafe-central": { name: "Cafe Central", stampsNeeded: 10, rewardText: "1 cafe gratis!" },
  "padaria-nova": { name: "Padaria Nova", stampsNeeded: 8, rewardText: "1 pastel de nata gratis!" },
  "barbeiro-classic": { name: "Barbeiro Classic", stampsNeeded: 5, rewardText: "1 corte gratis!" },
};

interface CustomerData {
  stamps: number;
  totalRewards: number;
}

function loadCustomers(slug: string): Record<string, CustomerData> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(`loyaltycard-${slug}`);
  return raw ? JSON.parse(raw) : {};
}

export default function CustomerCardPage() {
  const params = useParams();
  const slug = params.slug as string;
  const business = DEMO_BUSINESSES[slug] ?? { name: slug, stampsNeeded: 10, rewardText: "1 gratis!" };

  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [searched, setSearched] = useState(false);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;

    const customers = loadCustomers(slug);
    const data = customers[phone.trim()] ?? null;
    setCustomer(data);
    setSearched(true);
  }

  if (!searched) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stamp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              O seu cartao de fidelidade
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Introduza o seu numero de telefone para ver os seus carimbos
            </p>
          </div>

          <form onSubmit={handleLookup} className="space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="912345678"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Ver o meu cartao
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-400">
              Powered by <span className="font-medium text-rose-400">LoyaltyCard</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stampsNeeded = business.stampsNeeded;
  const currentStamps = customer?.stamps ?? 0;
  const remaining = stampsNeeded - currentStamps;
  const progress = (currentStamps / stampsNeeded) * 100;
  const isComplete = currentStamps >= stampsNeeded;
  const cols = stampsNeeded <= 5 ? 5 : stampsNeeded <= 8 ? 4 : 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
            {business.name.substring(0, 2).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-gray-900">{business.name}</h1>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-rose-100">
          {customer ? (
            <>
              <div
                className="grid gap-3 mb-5 justify-items-center"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
              >
                {Array.from({ length: stampsNeeded }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center`}
                    style={{
                      backgroundColor: i < currentStamps ? "#f43f5e" : "#f43f5e15",
                      borderColor: i < currentStamps ? "#f43f5e" : "#f43f5e30",
                    }}
                  >
                    {i < currentStamps ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-xs font-medium" style={{ color: "#f43f5e60" }}>{i + 1}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out bg-rose-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {isComplete ? (
                <div className="text-center py-4">
                  <Gift className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Parabens!</h2>
                  <p className="text-sm text-gray-600">
                    Recompensa disponivel: <strong>{business.rewardText}</strong>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Mostre este ecra ao funcionario para resgatar
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-rose-500">
                      {remaining} {remaining === 1 ? "carimbo" : "carimbos"}
                    </span>{" "}
                    para a sua recompensa!
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{business.rewardText}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <Stamp className="w-10 h-10 text-rose-300 mx-auto mb-3" />
              <p className="text-sm text-gray-600">Ainda nao tem carimbos neste estabelecimento.</p>
              <p className="text-xs text-gray-400 mt-1">Peca o seu primeiro carimbo no balcao!</p>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => { setSearched(false); setCustomer(null); }}
            className="text-sm text-rose-500 hover:text-rose-600 font-medium"
          >
            Usar outro numero
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Powered by <span className="font-medium text-rose-400">LoyaltyCard</span>
          </p>
        </div>
      </div>
    </div>
  );
}
