"use client";

import { Building2, Mail, Globe, Palette } from "lucide-react";
import { useState } from "react";

export default function DefinicoesPage() {
  const [businessName, setBusinessName] = useState("Cafe Central");
  const [email, setEmail] = useState("geral@cafecentral.pt");
  const [slug, setSlug] = useState("cafe-central");
  const [tipo, setTipo] = useState("cafe");

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Negocio</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Negocio</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              >
                <option value="cafe">Cafe</option>
                <option value="padaria">Padaria</option>
                <option value="salao">Salao</option>
                <option value="barbearia">Barbearia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Slug (URL)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">loyaltycard.pt/c/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>
          <button className="mt-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
            Guardar Alteracoes
          </button>
        </div>
      </div>
    </div>
  );
}
