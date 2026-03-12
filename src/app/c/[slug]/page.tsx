"use client";

import { Check, Gift, Stamp } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

interface CustomerData {
  phone: string;
  stamps: number;
  totalRewards: number;
  lastStampAt: string | null;
}

interface BusinessData {
  name: string;
  slug: string;
  stampsNeeded: number;
  rewardText: string;
}

function StampCircle({
  filled,
  index,
  total,
}: {
  filled: boolean;
  index: number;
  total: number;
}) {
  const size = total <= 5 ? "w-14 h-14" : total <= 8 ? "w-12 h-12" : "w-11 h-11";
  const checkSize = total <= 5 ? "w-7 h-7" : "w-5 h-5";
  const color = "#f43f5e";

  return (
    <div
      className={`${size} rounded-full border-2 flex items-center justify-center transition-all ${
        filled ? "animate-stamp-pop" : ""
      }`}
      style={{
        backgroundColor: filled ? color : color + "15",
        borderColor: filled ? color : color + "30",
        animationDelay: filled ? `${index * 0.08}s` : "0s",
        animationFillMode: "both",
      }}
    >
      {filled ? (
        <Check className={`${checkSize} text-white`} />
      ) : (
        <span className="text-xs font-medium" style={{ color: color + "60" }}>
          {index + 1}
        </span>
      )}
    </div>
  );
}

export default function CustomerCardPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/customers/${encodeURIComponent(phone.trim())}?businessSlug=${slug}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao procurar cartao");
        return;
      }

      setBusiness(data.business);
      setCustomer(data.customer);
      setSearched(true);
    } catch {
      setError("Erro de ligacao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Phone input screen
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
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Numero de telefone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="912345678"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white py-3 rounded-xl font-medium transition-colors"
            >
              {loading ? "A procurar..." : "Ver o meu cartao"}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-400">
              Powered by{" "}
              <span className="font-medium text-rose-400">LoyaltyCard</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Card display screen
  const stampsNeeded = business?.stampsNeeded ?? 10;
  const currentStamps = customer?.stamps ?? 0;
  const remaining = stampsNeeded - currentStamps;
  const progress = (currentStamps / stampsNeeded) * 100;
  const isComplete = currentStamps >= stampsNeeded;
  const cols = stampsNeeded <= 5 ? 5 : stampsNeeded <= 8 ? 4 : 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Business Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
            {business?.name.substring(0, 2).toUpperCase() ?? "??"}
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {business?.name ?? "..."}
          </h1>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>

        {/* Stamp Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-rose-100">
          {customer ? (
            <>
              <div
                className="grid gap-3 mb-5 justify-items-center"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
              >
                {Array.from({ length: stampsNeeded }).map((_, i) => (
                  <StampCircle
                    key={i}
                    filled={i < currentStamps}
                    index={i}
                    total={stampsNeeded}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out bg-rose-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Status Message */}
              {isComplete ? (
                <div className="text-center py-4">
                  <div className="relative inline-block mb-3">
                    <Gift className="w-12 h-12 text-rose-500" />
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-confetti"
                        style={{
                          backgroundColor: [
                            "#f43f5e",
                            "#ec4899",
                            "#eab308",
                            "#22c55e",
                            "#3b82f6",
                            "#8b5cf6",
                          ][i],
                          top: "50%",
                          left: "50%",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Parabens!
                  </h2>
                  <p className="text-sm text-gray-600">
                    Recompensa disponivel:{" "}
                    <strong>{business?.rewardText}</strong>
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
                  <p className="text-xs text-gray-400 mt-1">
                    {business?.rewardText}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <Stamp className="w-10 h-10 text-rose-300 mx-auto mb-3" />
              <p className="text-sm text-gray-600">
                Ainda nao tem carimbos neste estabelecimento.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Peca o seu primeiro carimbo no balcao!
              </p>
            </div>
          )}
        </div>

        {/* Past rewards */}
        {customer && customer.totalRewards > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Recompensas resgatadas:{" "}
              <span className="font-semibold text-rose-500">
                {customer.totalRewards}
              </span>
            </p>
          </div>
        )}

        {/* Change phone */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setSearched(false);
              setCustomer(null);
              setBusiness(null);
            }}
            className="text-sm text-rose-500 hover:text-rose-600 font-medium"
          >
            Usar outro numero
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Powered by{" "}
            <span className="font-medium text-rose-400">LoyaltyCard</span>
          </p>
        </div>
      </div>
    </div>
  );
}
