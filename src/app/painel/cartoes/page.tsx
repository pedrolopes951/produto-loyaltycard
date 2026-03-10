"use client";

import { Plus, Check, MoreVertical, Palette } from "lucide-react";
import { useState } from "react";

interface LoyaltyCard {
  id: string;
  name: string;
  description: string;
  stampsRequired: number;
  reward: string;
  color: string;
  isActive: boolean;
  customersActive: number;
  totalStamps: number;
}

const mockCards: LoyaltyCard[] = [
  {
    id: "1",
    name: "Cafe Expresso",
    description: "10 cafes, 1 gratis",
    stampsRequired: 10,
    reward: "Cafe Expresso Gratis",
    color: "#f43f5e",
    isActive: true,
    customersActive: 156,
    totalStamps: 1243,
  },
  {
    id: "2",
    name: "Pastel de Nata",
    description: "5 pasteis, 1 gratis",
    stampsRequired: 5,
    reward: "Pastel de Nata Gratis",
    color: "#ec4899",
    isActive: true,
    customersActive: 89,
    totalStamps: 534,
  },
  {
    id: "3",
    name: "Desconto 20%",
    description: "8 compras, desconto especial",
    stampsRequired: 8,
    reward: "20% de Desconto",
    color: "#f472b6",
    isActive: false,
    customersActive: 23,
    totalStamps: 178,
  },
];

const stampOptions = [5, 8, 10, 12];
const colorOptions = ["#f43f5e", "#ec4899", "#f472b6", "#e11d48", "#be123c", "#db2777"];

function StampCardPreview({
  name,
  stampsRequired,
  reward,
  color,
  filledStamps,
}: {
  name: string;
  stampsRequired: number;
  reward: string;
  color: string;
  filledStamps: number;
}) {
  const cols = stampsRequired <= 5 ? 5 : stampsRequired <= 8 ? 4 : 5;
  return (
    <div className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: color + "40" }}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: color }}
        >
          {name.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{name}</p>
          <p className="text-xs text-gray-500">
            {stampsRequired} carimbos — {reward}
          </p>
        </div>
      </div>
      <div
        className="grid gap-2.5 mb-3"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: stampsRequired }).map((_, i) => {
          const filled = i < filledStamps;
          return (
            <div
              key={i}
              className="aspect-square rounded-full border-2 flex items-center justify-center transition-all"
              style={{
                backgroundColor: filled ? color : color + "10",
                borderColor: filled ? color : color + "30",
              }}
            >
              {filled && <Check className="w-4 h-4 text-white" />}
            </div>
          );
        })}
      </div>
      <div
        className="rounded-lg p-2 text-center"
        style={{ backgroundColor: color + "10" }}
      >
        <p className="text-xs font-medium" style={{ color }}>
          {filledStamps}/{stampsRequired} carimbos
        </p>
      </div>
    </div>
  );
}

export default function CartoesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [newCard, setNewCard] = useState({
    name: "",
    stampsRequired: 10,
    reward: "",
    color: "#f43f5e",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cartoes de Fidelidade</h1>
          <p className="text-sm text-gray-500 mt-1">Crie e gira os seus cartoes</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Cartao
        </button>
      </div>

      {/* Create Card Form */}
      {showCreate && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Cartao</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Cartao
                </label>
                <input
                  type="text"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  placeholder="Ex: Cafe Expresso"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numero de Carimbos
                </label>
                <div className="flex gap-2">
                  {stampOptions.map((n) => (
                    <button
                      key={n}
                      onClick={() => setNewCard({ ...newCard, stampsRequired: n })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        newCard.stampsRequired === n
                          ? "bg-rose-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recompensa
                </label>
                <input
                  type="text"
                  value={newCard.reward}
                  onChange={(e) => setNewCard({ ...newCard, reward: e.target.value })}
                  placeholder="Ex: Cafe Gratis"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  Cor do Cartao
                </label>
                <div className="flex gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => setNewCard({ ...newCard, color: c })}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        newCard.color === c ? "scale-110 border-gray-400" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                Criar Cartao
              </button>
            </div>

            {/* Preview */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Pre-visualizacao</p>
              <StampCardPreview
                name={newCard.name || "Nome do Cartao"}
                stampsRequired={newCard.stampsRequired}
                reward={newCard.reward || "Recompensa"}
                color={newCard.color}
                filledStamps={Math.floor(newCard.stampsRequired * 0.6)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Cards List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: card.color }}
                >
                  {card.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{card.name}</p>
                  <p className="text-xs text-gray-500">{card.description}</p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <StampCardPreview
              name={card.name}
              stampsRequired={card.stampsRequired}
              reward={card.reward}
              color={card.color}
              filledStamps={7}
            />

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>{card.customersActive} clientes ativos</span>
              <span>{card.totalStamps} carimbos total</span>
            </div>
            <div className="mt-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  card.isActive
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {card.isActive ? "Ativo" : "Inativo"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
