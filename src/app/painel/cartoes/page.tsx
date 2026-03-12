"use client";

import { Check, Save } from "lucide-react";
import { useState, useEffect } from "react";

const BUSINESS_SLUG = "cafe-central";

const stampOptions = [5, 8, 10, 12, 15];

export default function CartoesPage() {
  const [stampsNeeded, setStampsNeeded] = useState(10);
  const [rewardText, setRewardText] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/business/${BUSINESS_SLUG}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.business) {
          setStampsNeeded(data.business.stampsNeeded);
          setRewardText(data.business.rewardText);
          setBusinessName(data.business.name);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/business/${BUSINESS_SLUG}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stampsNeeded, rewardText }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">A carregar...</p>
      </div>
    );
  }

  const cols = stampsNeeded <= 5 ? 5 : stampsNeeded <= 8 ? 4 : 5;
  const previewFilled = Math.floor(stampsNeeded * 0.6);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Configurar Cartao
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Defina quantos carimbos sao necessarios e a recompensa
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numero de Carimbos
            </label>
            <div className="flex gap-2 flex-wrap">
              {stampOptions.map((n) => (
                <button
                  key={n}
                  onClick={() => setStampsNeeded(n)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    stampsNeeded === n
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
              value={rewardText}
              onChange={(e) => setRewardText(e.target.value)}
              placeholder="Ex: 1 cafe gratis!"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            {saving ? (
              "A guardar..."
            ) : saved ? (
              <>
                <Check className="w-4 h-4" />
                Guardado!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Alteracoes
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Pre-visualizacao
          </p>
          <div className="bg-white rounded-2xl border-2 border-rose-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {businessName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {businessName}
                </p>
                <p className="text-xs text-gray-500">
                  {stampsNeeded} carimbos &mdash;{" "}
                  {rewardText || "Recompensa"}
                </p>
              </div>
            </div>
            <div
              className="grid gap-2.5 mb-3"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {Array.from({ length: stampsNeeded }).map((_, i) => {
                const filled = i < previewFilled;
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-full border-2 flex items-center justify-center"
                    style={{
                      backgroundColor: filled ? "#f43f5e" : "#f43f5e10",
                      borderColor: filled ? "#f43f5e" : "#f43f5e30",
                    }}
                  >
                    {filled && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="bg-rose-50 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-rose-600">
                {previewFilled}/{stampsNeeded} carimbos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
