"use client";

import { Gift } from "lucide-react";
import { useState, useEffect } from "react";

const BUSINESS_SLUG = "cafe-central";

interface CustomerRow {
  id: string;
  phone: string;
  stamps: number;
  totalRewards: number;
  lastStampAt: string | null;
  createdAt: string;
}

export default function RecompensasPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [rewardText, setRewardText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/customers?businessSlug=${BUSINESS_SLUG}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers ?? []);
        setRewardText(data.rewardText ?? "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Only show customers who have redeemed at least one reward
  const redeemed = customers.filter((c) => c.totalRewards > 0);
  const totalRedeemed = redeemed.reduce((sum, c) => sum + c.totalRewards, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">A carregar...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Recompensas</h1>
        <p className="text-sm text-gray-500 mt-1">
          Historico de recompensas resgatadas
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center">
            <Gift className="w-7 h-7 text-rose-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{totalRedeemed}</p>
            <p className="text-sm text-gray-500">
              recompensas resgatadas no total
            </p>
            {rewardText && (
              <p className="text-xs text-rose-500 mt-1">
                Recompensa atual: {rewardText}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Redeemed list */}
      {redeemed.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <Gift className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">
            Ainda nenhuma recompensa resgatada.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="divide-y divide-gray-50">
            {redeemed.map((c) => (
              <div
                key={c.id}
                className="px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                    <Gift className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {c.phone}
                    </p>
                    <p className="text-xs text-gray-400">
                      Cliente desde{" "}
                      {new Date(c.createdAt).toLocaleDateString("pt-PT")}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  {c.totalRewards}x resgatada
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
