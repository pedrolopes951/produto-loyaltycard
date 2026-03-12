"use client";

import { Users, Stamp, Gift } from "lucide-react";
import { useEffect, useState } from "react";

const BUSINESS_SLUG = "cafe-central";

interface Stats {
  totalCustomers: number;
  stampsToday: number;
  totalRewardsRedeemed: number;
  business: {
    name: string;
    stampsNeeded: number;
    rewardText: string;
  };
}

interface CustomerRow {
  id: string;
  phone: string;
  stamps: number;
  totalRewards: number;
  lastStampAt: string | null;
  createdAt: string;
}

export default function PainelPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, custRes] = await Promise.all([
          fetch(`/api/stats?businessSlug=${BUSINESS_SLUG}`),
          fetch(`/api/customers?businessSlug=${BUSINESS_SLUG}`),
        ]);
        const statsData = await statsRes.json();
        const custData = await custRes.json();
        setStats(statsData);
        setCustomers(custData.customers ?? []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">A carregar...</p>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Clientes",
      value: stats?.totalCustomers ?? 0,
      icon: Users,
      color: "bg-rose-50 text-rose-600",
    },
    {
      label: "Carimbos Hoje",
      value: stats?.stampsToday ?? 0,
      icon: Stamp,
      color: "bg-pink-50 text-pink-600",
    },
    {
      label: "Recompensas Resgatadas",
      value: stats?.totalRewardsRedeemed ?? 0,
      icon: Gift,
      color: "bg-green-50 text-green-600",
    },
  ];

  // Recent customers (sorted by last stamp)
  const recent = [...customers]
    .filter((c) => c.lastStampAt)
    .sort(
      (a, b) =>
        new Date(b.lastStampAt!).getTime() -
        new Date(a.lastStampAt!).getTime()
    )
    .slice(0, 10);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Painel</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visao geral do seu programa de fidelizacao
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Atividade Recente
          </h2>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            Ainda sem atividade. Carimbos aparecerao aqui.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map((c) => (
              <div
                key={c.id}
                className="px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-semibold text-xs">
                      {c.phone.slice(-2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {c.phone}
                    </p>
                    <p className="text-xs text-gray-400">
                      Ultimo carimbo:{" "}
                      {c.lastStampAt
                        ? new Date(c.lastStampAt).toLocaleDateString("pt-PT")
                        : "-"}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">
                  {c.stamps}/{stats?.business.stampsNeeded ?? 10}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
