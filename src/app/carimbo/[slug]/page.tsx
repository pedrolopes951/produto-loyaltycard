"use client";

import { Check, Gift, Stamp, ArrowRight, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface BusinessData {
  name: string;
  slug: string;
  stampsNeeded: number;
  rewardText: string;
}

interface StampResult {
  phone: string;
  stamps: number;
  totalRewards: number;
  stampsNeeded: number;
  rewardText: string;
}

export default function CarimboPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StampResult | null>(null);
  const [rewardUnlocked, setRewardUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  useEffect(() => {
    fetch(`/api/business/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.business) setBusiness(data.business);
      })
      .catch(() => {});
  }, [slug]);

  async function handleStamp(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    setRewardUnlocked(false);
    setRedeemed(false);

    try {
      const res = await fetch("/api/stamps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessSlug: slug, phone: phone.trim() }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setError(data.error);
        if (data.customer) {
          setResult(data.customer);
        }
        return;
      }

      if (!res.ok) {
        setError(data.error || "Erro ao carimbar");
        return;
      }

      setResult(data.customer);
      setRewardUnlocked(data.rewardUnlocked);
    } catch {
      setError("Erro de ligacao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRedeem() {
    setRedeeming(true);
    try {
      const res = await fetch("/api/rewards/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessSlug: slug, phone: phone.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao resgatar");
        return;
      }

      setRedeemed(true);
      setResult(data.customer);
      setRewardUnlocked(false);
    } catch {
      setError("Erro de ligacao.");
    } finally {
      setRedeeming(false);
    }
  }

  function handleReset() {
    setPhone("");
    setResult(null);
    setRewardUnlocked(false);
    setError("");
    setRedeemed(false);
  }

  // Result screen
  if (result && !error) {
    const progress = (result.stamps / result.stampsNeeded) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          {/* Success / Reward Animation */}
          <div className="mb-6 animate-fade-in-up">
            {rewardUnlocked ? (
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-checkmark">
                <Gift className="w-10 h-10 text-white" />
              </div>
            ) : redeemed ? (
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-checkmark">
                <Check className="w-10 h-10 text-white" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-checkmark">
                <Check className="w-10 h-10 text-white" />
              </div>
            )}
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <p className="text-sm text-gray-500 mb-1">{business?.name}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {redeemed
                ? "Recompensa resgatada!"
                : rewardUnlocked
                ? "Recompensa desbloqueada!"
                : "Carimbo adicionado!"}
            </h1>
            <p className="text-sm text-gray-500">{phone}</p>
          </div>

          {/* Progress Card */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 mt-6 border border-rose-100 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            {/* Stamp dots */}
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

            {/* Progress Bar */}
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
                  disabled={redeeming}
                  className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-gray-900 px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  {redeeming ? "A resgatar..." : "Resgatar Recompensa"}
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

          {/* Next customer button */}
          <div
            className="mt-6 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Proximo cliente
            </button>
          </div>

          {/* Footer */}
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

  // Stamp input screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Stamp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {business?.name ?? "A carregar..."}
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

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white py-3 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              "A carimbar..."
            ) : (
              <>
                <Stamp className="w-5 h-5" />
                Carimbar
              </>
            )}
          </button>
        </form>

        {/* Footer */}
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
