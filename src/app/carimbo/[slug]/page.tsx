"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CarimboPage() {
  const params = useParams();
  const slug = params.slug as string;

  const businessName = "Cafe Central";
  const currentStamps = 7;
  const totalStamps = 10;
  const cardColor = "#f43f5e";
  const progress = (currentStamps / totalStamps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        {/* Success Animation */}
        <div className="mb-6 animate-fade-in-up">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-checkmark"
            style={{ backgroundColor: cardColor }}
          >
            <Check className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Business Name */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <p className="text-sm text-gray-500 mb-1">{businessName}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Carimbo adicionado!</h1>
        </div>

        {/* Progress Card */}
        <div
          className="bg-white rounded-2xl shadow-lg p-6 mt-6 border border-rose-100 animate-fade-in-up"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          {/* Stamp Progress Visual */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: totalStamps }).map((_, i) => {
              const filled = i < currentStamps;
              const isNew = i === currentStamps - 1;
              return (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    isNew ? "animate-stamp-pop" : ""
                  }`}
                  style={{
                    backgroundColor: filled ? cardColor : cardColor + "15",
                    borderColor: filled ? cardColor : cardColor + "30",
                    animationDelay: isNew ? "0.6s" : "0s",
                    animationFillMode: "both",
                  }}
                >
                  {filled && <Check className="w-4 h-4 text-white" />}
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: cardColor,
                transitionDelay: "0.8s",
              }}
            />
          </div>

          <p className="text-lg font-bold text-gray-900">
            {currentStamps}/{totalStamps} carimbos
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Faltam{" "}
            <span className="font-semibold" style={{ color: cardColor }}>
              {totalStamps - currentStamps}
            </span>{" "}
            para o seu cafe gratis!
          </p>
        </div>

        {/* View Full Card */}
        <div
          className="mt-6 animate-fade-in-up"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <Link
            href={`/c/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: cardColor }}
          >
            Ver cartao completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <p className="text-xs text-gray-400">
            Powered by <span className="font-medium text-rose-400">LoyaltyCard</span>
          </p>
        </div>
      </div>
    </div>
  );
}
