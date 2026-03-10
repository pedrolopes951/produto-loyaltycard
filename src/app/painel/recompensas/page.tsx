"use client";

import { Gift, Plus, MoreVertical } from "lucide-react";
import { useState } from "react";

interface Reward {
  id: string;
  name: string;
  description: string;
  stampsRequired: number;
  timesRedeemed: number;
  cardName: string;
  isActive: boolean;
}

const mockRewards: Reward[] = [
  { id: "1", name: "Cafe Gratis", description: "Um cafe expresso ou americano a escolha", stampsRequired: 10, timesRedeemed: 34, cardName: "Cafe Expresso", isActive: true },
  { id: "2", name: "Desconto 20%", description: "20% de desconto na proxima compra", stampsRequired: 8, timesRedeemed: 12, cardName: "Desconto 20%", isActive: true },
  { id: "3", name: "Pastel de Nata Gratis", description: "Um pastel de nata acabado de sair do forno", stampsRequired: 5, timesRedeemed: 45, cardName: "Pastel de Nata", isActive: true },
  { id: "4", name: "Meia de Leite Gratis", description: "Uma meia de leite grande", stampsRequired: 12, timesRedeemed: 8, cardName: "Cafe Premium", isActive: false },
];

export default function RecompensasPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recompensas</h1>
          <p className="text-sm text-gray-500 mt-1">Gira as recompensas dos seus cartoes</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nova Recompensa
        </button>
      </div>

      {/* Create Reward Form */}
      {showCreate && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Criar Nova Recompensa</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                placeholder="Ex: Cafe Gratis"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carimbos Necessarios</label>
              <input
                type="number"
                placeholder="10"
                min={1}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descricao</label>
              <textarea
                placeholder="Descreva a recompensa..."
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
              />
            </div>
          </div>
          <button className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
            Criar Recompensa
          </button>
        </div>
      )}

      {/* Rewards List */}
      <div className="grid md:grid-cols-2 gap-4">
        {mockRewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                  <Gift className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{reward.name}</h3>
                  <p className="text-xs text-gray-500">{reward.cardName}</p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-gray-400">Carimbos</p>
                  <p className="text-sm font-semibold text-gray-900">{reward.stampsRequired}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Resgatadas</p>
                  <p className="text-sm font-semibold text-rose-600">{reward.timesRedeemed}</p>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  reward.isActive
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {reward.isActive ? "Ativa" : "Inativa"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
