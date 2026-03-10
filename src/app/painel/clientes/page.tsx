"use client";

import { Search, ArrowUpDown, Crown } from "lucide-react";
import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalStamps: number;
  cardsCompleted: number;
  lastVisit: string;
  memberSince: string;
}

const mockCustomers: Customer[] = [
  { id: "1", name: "Maria Santos", phone: "+351 912 345 678", email: "maria@email.pt", totalStamps: 47, cardsCompleted: 4, lastVisit: "Hoje", memberSince: "Jan 2026" },
  { id: "2", name: "Joao Pereira", phone: "+351 923 456 789", email: "joao@email.pt", totalStamps: 38, cardsCompleted: 3, lastVisit: "Hoje", memberSince: "Fev 2026" },
  { id: "3", name: "Ana Rodrigues", phone: "+351 934 567 890", email: "ana@email.pt", totalStamps: 32, cardsCompleted: 3, lastVisit: "Ontem", memberSince: "Jan 2026" },
  { id: "4", name: "Miguel Ferreira", phone: "+351 945 678 901", email: "miguel@email.pt", totalStamps: 25, cardsCompleted: 2, lastVisit: "Hoje", memberSince: "Mar 2026" },
  { id: "5", name: "Sofia Lima", phone: "+351 956 789 012", email: "sofia@email.pt", totalStamps: 21, cardsCompleted: 2, lastVisit: "Ha 2 dias", memberSince: "Fev 2026" },
  { id: "6", name: "Ricardo Martins", phone: "+351 967 890 123", email: "ricardo@email.pt", totalStamps: 18, cardsCompleted: 1, lastVisit: "Ha 3 dias", memberSince: "Mar 2026" },
  { id: "7", name: "Beatriz Costa", phone: "+351 978 901 234", email: "beatriz@email.pt", totalStamps: 15, cardsCompleted: 1, lastVisit: "Ontem", memberSince: "Jan 2026" },
  { id: "8", name: "Tiago Oliveira", phone: "+351 989 012 345", email: "tiago@email.pt", totalStamps: 12, cardsCompleted: 1, lastVisit: "Ha 1 semana", memberSince: "Fev 2026" },
  { id: "9", name: "Cliente Anonimo", phone: "-", email: "-", totalStamps: 8, cardsCompleted: 0, lastVisit: "Ha 4 dias", memberSince: "Mar 2026" },
  { id: "10", name: "Ines Almeida", phone: "+351 910 123 456", email: "ines@email.pt", totalStamps: 5, cardsCompleted: 0, lastVisit: "Ha 5 dias", memberSince: "Mar 2026" },
];

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"stamps" | "completed" | "recent">("stamps");

  const filtered = mockCustomers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "stamps") return b.totalStamps - a.totalStamps;
      if (sortBy === "completed") return b.cardsCompleted - a.cardsCompleted;
      return 0;
    });

  const topCustomers = mockCustomers.slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-sm text-gray-500 mt-1">
          {mockCustomers.length} clientes registados
        </p>
      </div>

      {/* Top Customers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {topCustomers.map((c, i) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-rose-600 font-semibold text-sm">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              {i === 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
              <p className="text-xs text-gray-500">
                {c.totalStamps} carimbos &middot; {c.cardsCompleted} cartoes completos
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Sort */}
      <div className="bg-white rounded-2xl border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar clientes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="flex gap-2">
            {([
              ["stamps", "Carimbos"],
              ["completed", "Completos"],
              ["recent", "Recentes"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 ${
                  sortBy === key
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ArrowUpDown className="w-3 h-3" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Customer List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden sm:table-cell">Contacto</th>
                <th className="text-center text-xs font-medium text-gray-500 px-5 py-3">Carimbos</th>
                <th className="text-center text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">Cartoes</th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-3 hidden lg:table-cell">Ultima Visita</th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-3 hidden lg:table-cell">Membro Desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-rose-600 font-semibold text-xs">
                          {customer.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <p className="text-xs text-gray-500">{customer.phone}</p>
                    <p className="text-xs text-gray-400">{customer.email}</p>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-sm font-semibold text-rose-600">{customer.totalStamps}</span>
                  </td>
                  <td className="px-5 py-3 text-center hidden md:table-cell">
                    <span className="text-sm text-gray-700">{customer.cardsCompleted}</span>
                  </td>
                  <td className="px-5 py-3 text-right hidden lg:table-cell">
                    <span className="text-xs text-gray-500">{customer.lastVisit}</span>
                  </td>
                  <td className="px-5 py-3 text-right hidden lg:table-cell">
                    <span className="text-xs text-gray-400">{customer.memberSince}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
