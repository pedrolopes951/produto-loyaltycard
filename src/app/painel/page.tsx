"use client";

import { Users, Stamp, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const BUSINESS_SLUG = "cafe-central";
const BUSINESS_NAME = "Cafe Central";
const STAMPS_NEEDED = 10;

interface CustomerData {
  stamps: number;
  totalRewards: number;
}

function loadCustomers(): Record<string, CustomerData> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(`loyaltycard-${BUSINESS_SLUG}`);
  return raw ? JSON.parse(raw) : {};
}

export default function PainelPage() {
  const [customers, setCustomers] = useState<Record<string, CustomerData>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCustomers(loadCustomers());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">A carregar...</p>
      </div>
    );
  }

  const entries = Object.entries(customers);
  const totalCustomers = entries.length;
  const totalRewardsRedeemed = entries.reduce((sum, [, c]) => sum + c.totalRewards, 0);
  const totalStamps = entries.reduce((sum, [, c]) => sum + c.stamps, 0);

  const statCards = [
    { label: "Total Clientes", value: totalCustomers, icon: Users, color: "bg-rose-50 text-rose-600" },
    { label: "Carimbos Dados", value: totalStamps, icon: Stamp, color: "bg-pink-50 text-pink-600" },
    { label: "Recompensas Resgatadas", value: totalRewardsRedeemed, icon: Gift, color: "bg-green-50 text-green-600" },
  ];

  const sorted = entries.sort(([, a], [, b]) => b.stamps - a.stamps);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel</h1>
          <p className="text-sm text-gray-500 mt-1">
            {BUSINESS_NAME} — Visao geral do programa de fidelizacao
          </p>
        </div>
        <Link
          href={`/carimbo/${BUSINESS_SLUG}`}
          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2"
        >
          <Stamp className="w-4 h-4" />
          Carimbar
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Clientes</h2>
        </div>
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            Ainda sem clientes. Vai a <Link href={`/carimbo/${BUSINESS_SLUG}`} className="text-rose-500 hover:text-rose-600">pagina de carimbos</Link> para comecar.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {sorted.map(([phone, c]) => (
              <div key={phone} className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-semibold text-xs">{phone.slice(-2)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{phone}</p>
                    {c.totalRewards > 0 && (
                      <p className="text-xs text-gray-400">{c.totalRewards} recompensa{c.totalRewards > 1 ? "s" : ""} resgatada{c.totalRewards > 1 ? "s" : ""}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">
                  {c.stamps}/{STAMPS_NEEDED}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
