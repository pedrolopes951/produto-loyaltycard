"use client";

import { Check, Gift, Stamp, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// Demo businesses — localStorage-backed, no server needed
const DEMO_BUSINESSES: Record<string, { name: string; stampsNeeded: number; rewardText: string }> = {
  "cafe-central": { name: "Cafe Central", stampsNeeded: 10, rewardText: "1 cafe gratis!" },
  "padaria-nova": { name: "Padaria Nova", stampsNeeded: 8, rewardText: "1 pastel de nata gratis!" },
  "barbeiro-classic": { name: "Barbeiro Classic", stampsNeeded: 5, rewardText: "1 corte gratis!" },
};

interface CustomerData {
  stamps: number;
  totalRewards: number;
}

function getStorageKey(slug: string) {
  return `loyaltycard-${slug}`;
}

function loadCustomers(slug: string): Record<string, CustomerData> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(getStorageKey(slug));
  return raw ? JSON.parse(raw) : {};
}

function saveCustomers(slug: string, customers: Record<string, CustomerData>) {
  localStorage.setItem(getStorageKey(slug), JSON.stringify(customers));
}

export default function CarimboPage() {
  const params = useParams();
  const slug = params.slug as string;

  const business = DEMO_BUSINESSES[slug] ?? { name: slug, stampsNeeded: 10, rewardText: "1 gratis!" };

  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<{ stamps: number; totalRewards: number; stampsNeeded: number; rewardText: string } | null>(null);
  const [rewardUnlocked, setRewardUnlocked] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  function handleStamp(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;

    const customers = loadCustomers(slug);
    const key = phone.trim();
    const customer = customers[key] ?? { stamps: 0, totalRewards: 0 };

    customer.stamps += 1;
    const unlocked = customer.stamps >= business.stampsNeeded;

    customers[key] = customer;
    saveCustomers(slug, customers);

    setResult({
      stamps: customer.stamps,
      totalRewards: customer.totalRewards,
      stampsNeeded: business.stampsNeeded,
      rewardText: business.rewardText,
    });
    setRewardUnlocked(unlocked);
    setRedeemed(false);
  }

  function handleRedeem() {
    const customers = loadCustomers(slug);
    const key = phone.trim();
    const customer = customers[key];
    if (!customer) return;

    customer.stamps = 0;
    customer.totalRewards += 1;
    customers[key] = customer;
    saveCustomers(slug, customers);

    setRedeemed(true);
    setRewardUnlocked(false);
    setResult({
      stamps: 0,
      totalRewards: customer.totalRewards,
      stampsNeeded: business.stampsNeeded,
      rewardText: business.rewardText,
    });
  }

  function handleReset() {
    setPhone("");
    setResult(null);
    setRewardUnlocked(false);
    setRedeemed(false);
  }

  // Result screen — shown to customer
  if (result) {
    const progress = (result.stamps / result.stampsNeeded) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="mb-6">
            {rewardUnlocked ? (
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-white" />
              </div>
            ) : redeemed ? (
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">{business.name}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {redeemed
                ? "Recompensa resgatada!"
                : rewardUnlocked
                ? "Recompensa desbloqueada!"
                : "Carimbo adicionado!"}
            </h1>
            <p className="text-sm text-gray-500">{phone}</p>
          </div>

          {/* Progress Card — flip phone to show customer */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 border border-rose-100">
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              {Array.from({ length: result.stampsNeeded }).map((_, i) => {
                const filled = i < result.stamps;
                return (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                    style={{
                      backgroundColor: filled ? "#f43f5e" : "#f43f5e15",
                      borderColor: filled ? "#f43f5e" : "#f43f5e30",
                    }}
                  >
                    {filled && <Check className="w-4 h-4 text-white" />}
                  </div>
                );
              })}
            </div>

            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out bg-rose-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-lg font-bold text-gray-900">
              {result.stamps}/{result.stampsNeeded} carimbos
            </p>

            {rewardUnlocked && !redeemed && (
              <div className="mt-4">
                <p className="text-sm text-yellow-600 font-medium mb-3">
                  {result.rewardText}
                </p>
                <button
                  onClick={handleRedeem}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  Resgatar Recompensa
                </button>
              </div>
            )}

            {redeemed && (
              <p className="text-sm text-green-600 font-medium mt-3">
                Cartao reiniciado. Total resgatadas: {result.totalRewards}
              </p>
            )}

            {!rewardUnlocked && !redeemed && (
              <p className="text-sm text-gray-500 mt-1">
                Faltam{" "}
                <span className="font-semibold text-rose-500">
                  {result.stampsNeeded - result.stamps}
                </span>{" "}
                para {result.rewardText}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Proximo cliente
            </button>
          </div>

          <div className="mt-12">
            <p className="text-xs text-gray-400">
              Powered by{" "}
              <span className="font-medium text-rose-400">LoyaltyCard</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Stamp input screen — owner types phone number
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Stamp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {business.name}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Introduza o telefone do cliente para carimbar
          </p>
        </div>

        <form onSubmit={handleStamp} className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Telefone do cliente
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="912345678"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            <Stamp className="w-5 h-5" />
            Carimbar
          </button>
        </form>

        <div className="text-center mt-12">
          <p className="text-xs text-gray-400">
            Powered by{" "}
            <span className="font-medium text-rose-400">LoyaltyCard</span>
          </p>
        </div>
      </div>
    </div>
  );
}
