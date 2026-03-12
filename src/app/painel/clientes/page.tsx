"use client";

import { Search } from "lucide-react";
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

export default function ClientesPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [stampsNeeded, setStampsNeeded] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/customers?businessSlug=${BUSINESS_SLUG}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers ?? []);
        setStampsNeeded(data.stampsNeeded ?? 10);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter((c) =>
    c.phone.includes(search)
  );

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
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-sm text-gray-500 mt-1">
          {customers.length} clientes registados
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por telefone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            {customers.length === 0
              ? "Ainda sem clientes. Os clientes aparecerao aqui apos o primeiro carimbo."
              : "Nenhum cliente encontrado."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">
                    Telefone
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 px-5 py-3">
                    Carimbos
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 px-5 py-3 hidden sm:table-cell">
                    Recompensas
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">
                    Ultima Visita
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3 hidden lg:table-cell">
                    Cliente Desde
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-rose-600 font-semibold text-xs">
                            {customer.phone.slice(-2)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {customer.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-sm font-semibold text-rose-600">
                        {customer.stamps}/{stampsNeeded}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center hidden sm:table-cell">
                      <span className="text-sm text-gray-700">
                        {customer.totalRewards}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right hidden md:table-cell">
                      <span className="text-xs text-gray-500">
                        {customer.lastStampAt
                          ? new Date(customer.lastStampAt).toLocaleDateString(
                              "pt-PT"
                            )
                          : "-"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right hidden lg:table-cell">
                      <span className="text-xs text-gray-400">
                        {new Date(customer.createdAt).toLocaleDateString(
                          "pt-PT"
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
