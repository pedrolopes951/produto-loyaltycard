"use client";

import { Building2, Globe, Check, Save } from "lucide-react";
import { useState, useEffect } from "react";

const BUSINESS_SLUG = "cafe-central";

export default function DefinicoesPage() {
  const [businessName, setBusinessName] = useState("");
  const [slug, setSlug] = useState("");
  const [stampsNeeded, setStampsNeeded] = useState(10);
  const [rewardText, setRewardText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/business/${BUSINESS_SLUG}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.business) {
          setBusinessName(data.business.name);
          setSlug(data.business.slug);
          setStampsNeeded(data.business.stampsNeeded);
          setRewardText(data.business.rewardText);
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
        body: JSON.stringify({ name: businessName, stampsNeeded, rewardText }),
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Definicoes</h1>
        <p className="text-sm text-gray-500 mt-1">Configure o seu negocio</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-400" />
            Informacoes do Negocio
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Negocio
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Slug (URL)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">/c/</span>
                <input
                  type="text"
                  value={slug}
                  disabled
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                O slug nao pode ser alterado.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carimbos Necessarios
              </label>
              <input
                type="number"
                value={stampsNeeded}
                onChange={(e) =>
                  setStampsNeeded(parseInt(e.target.value) || 10)
                }
                min={1}
                max={20}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texto da Recompensa
              </label>
              <input
                type="text"
                value={rewardText}
                onChange={(e) => setRewardText(e.target.value)}
                placeholder="Ex: 1 cafe gratis!"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
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
      </div>
    </div>
  );
}
