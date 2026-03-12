"use client";

import { QrCode, Info } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";

const BUSINESS_SLUG = "cafe-central";

export default function QRBalcaoPage() {
  const [businessName, setBusinessName] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch(`/api/business/${BUSINESS_SLUG}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.business) setBusinessName(data.business.name);
      })
      .catch(() => {});
  }, []);

  const customerUrl = `${origin}/c/${BUSINESS_SLUG}`;
  const stampUrl = `${origin}/carimbo/${BUSINESS_SLUG}`;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">QR Codes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Imprima e coloque no balcao
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customer QR */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Para o Cliente
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            O cliente digitaliza para ver os seus carimbos
          </p>

          <div className="inline-block bg-white border-2 border-gray-200 rounded-2xl p-6 mb-4">
            {origin ? (
              <QRCodeSVG
                value={customerUrl}
                size={200}
                fgColor="#111827"
                bgColor="#ffffff"
                level="M"
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-50 rounded-xl flex items-center justify-center">
                <QrCode className="w-10 h-10 text-gray-300" />
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-4 break-all">
            {customerUrl}
          </p>

          <button
            onClick={() => window.print()}
            className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Imprimir QR Cliente
          </button>
        </div>

        {/* Stamp QR */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Pagina de Carimbo
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Abra no tablet do balcao para carimbar clientes
          </p>

          <div className="inline-block bg-white border-2 border-gray-200 rounded-2xl p-6 mb-4">
            {origin ? (
              <QRCodeSVG
                value={stampUrl}
                size={200}
                fgColor="#111827"
                bgColor="#ffffff"
                level="M"
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-50 rounded-xl flex items-center justify-center">
                <QrCode className="w-10 h-10 text-gray-300" />
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-4 break-all">
            {stampUrl}
          </p>

          <a
            href={stampUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Abrir Pagina de Carimbo
          </a>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-rose-50 rounded-2xl p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-rose-500" />
          Como usar
        </h3>
        <ol className="space-y-3">
          {[
            "Imprima o QR 'Para o Cliente' e coloque visivel no balcao",
            "Abra a 'Pagina de Carimbo' no seu telefone ou tablet",
            "Quando o cliente pagar, peca o numero de telefone e carimbee",
            "O cliente pode digitalizar o QR a qualquer momento para ver os seus carimbos",
            "Quando completar o cartao, resgate a recompensa pela pagina de carimbo",
          ].map((text, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
