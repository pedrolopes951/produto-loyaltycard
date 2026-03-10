"use client";

import {
  Stamp,
  QrCode,
  Gift,
  BarChart3,
  Check,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function StampCardVisual() {
  const stamps = [true, true, true, true, true, true, true, false, false, false];
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xs mx-auto border border-rose-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">CC</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">Cafe Central</p>
          <p className="text-xs text-gray-500">10 cafes, 1 gratis</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 mb-4">
        {stamps.map((filled, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
              filled
                ? "bg-rose-500 border-rose-500 scale-100"
                : "border-rose-200 bg-rose-50"
            }`}
          >
            {filled && <Check className="w-5 h-5 text-white" />}
          </div>
        ))}
      </div>
      <div className="bg-rose-50 rounded-lg p-2 text-center">
        <p className="text-xs text-rose-600 font-medium">
          3 carimbos para o seu cafe gratis!
        </p>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Stamp,
    title: "Sem App Necessaria",
    description:
      "Funciona como PWA direto no navegador. Os seus clientes nao precisam instalar nada.",
  },
  {
    icon: QrCode,
    title: "QR Code no Balcao",
    description:
      "Imprima o QR e coloque no balcao. O cliente digitaliza e recebe o carimbo automaticamente.",
  },
  {
    icon: Gift,
    title: "Recompensas Personalizaveis",
    description:
      "Cafe gratis, desconto, pastel de nata - defina a recompensa que faz sentido para o seu negocio.",
  },
  {
    icon: BarChart3,
    title: "Analytics de Fidelizacao",
    description:
      "Veja quantos clientes voltam, quais recompensas funcionam e otimize o seu programa.",
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
              <Stamp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">LoyaltyCard</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#funcionalidades" className="text-gray-600 hover:text-rose-600 text-sm font-medium">
              Funcionalidades
            </a>
            <a href="#precos" className="text-gray-600 hover:text-rose-600 text-sm font-medium">
              Precos
            </a>
            <Link href="/entrar" className="text-gray-600 hover:text-rose-600 text-sm font-medium">
              Entrar
            </Link>
            <Link
              href="/registar"
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Comecar Gratis
            </Link>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-rose-100 px-4 py-4 space-y-3">
            <a href="#funcionalidades" className="block text-gray-600 text-sm font-medium">
              Funcionalidades
            </a>
            <a href="#precos" className="block text-gray-600 text-sm font-medium">
              Precos
            </a>
            <Link href="/entrar" className="block text-gray-600 text-sm font-medium">
              Entrar
            </Link>
            <Link
              href="/registar"
              className="block bg-rose-500 text-white text-center px-4 py-2 rounded-lg text-sm font-medium"
            >
              Comecar Gratis
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Adeus cartao de carimbos.{" "}
              <span className="text-rose-500">Ola fidelizacao digital.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Os seus clientes acumulam pontos pelo telemovel. Sem app. Sem papel.
              So resultados.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/registar"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                Comecar Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#funcionalidades"
                className="border-2 border-rose-200 hover:border-rose-300 text-rose-600 px-8 py-3 rounded-xl text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Ver Como Funciona
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-rose-100 rounded-3xl blur-2xl opacity-50" />
              <div className="relative">
                <StampCardVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-rose-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Crie o seu cartao", desc: "Personalize o numero de carimbos, a recompensa e as cores." },
              { step: "2", title: "Cliente digitaliza o QR", desc: "Coloque o QR no balcao. O cliente digitaliza com o telemovel." },
              { step: "3", title: "Recebe a recompensa", desc: "Ao completar o cartao, o cliente resgata a recompensa." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Tudo o que precisa para fidelizar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-rose-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-20 bg-rose-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Precos Simples
          </h2>
          <p className="text-gray-600 mb-12">
            Comece gratis. Escale quando quiser.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-rose-100 text-left">
              <p className="text-sm font-semibold text-rose-500 mb-1">Gratuito</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                &euro;0<span className="text-base font-normal text-gray-500">/mes</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">Para experimentar</p>
              <ul className="space-y-3 mb-8">
                {["1 cartao de fidelidade", "Ate 50 clientes", "QR code no balcao", "Recompensas basicas"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/registar"
                className="block text-center border-2 border-rose-200 text-rose-600 px-6 py-2.5 rounded-xl font-medium hover:bg-rose-50 transition-colors"
              >
                Comecar Gratis
              </Link>
            </div>
            {/* Pro */}
            <div className="bg-white rounded-2xl p-8 border-2 border-rose-500 text-left relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Mais Popular
              </div>
              <p className="text-sm font-semibold text-rose-500 mb-1">Pro</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                &euro;10<span className="text-base font-normal text-gray-500">/mes</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">Para negocios a serio</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Cartoes ilimitados",
                  "Clientes ilimitados",
                  "Notificacoes por SMS",
                  "Analytics de fidelizacao",
                  "Suporte prioritario",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/registar"
                className="block text-center bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                Comecar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-rose-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-rose-500 rounded flex items-center justify-center">
              <Stamp className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">LoyaltyCard</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2026 LoyaltyCard. Feito em Portugal.
          </p>
        </div>
      </footer>
    </div>
  );
}
