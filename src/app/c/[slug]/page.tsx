"use client";

import { Check, Gift, Star, Clock } from "lucide-react";
import { useParams } from "next/navigation";

const mockData = {
  businessName: "Cafe Central",
  businessType: "Cafe",
  currentCard: {
    name: "Cafe Expresso",
    stampsRequired: 10,
    currentStamps: 7,
    reward: "Cafe Expresso Gratis",
    color: "#f43f5e",
  },
  pastCards: [
    { name: "Cafe Expresso", completedAt: "15 Fev 2026", reward: "Cafe Gratis" },
    { name: "Cafe Expresso", completedAt: "28 Jan 2026", reward: "Cafe Gratis" },
  ],
};

function StampCircle({
  filled,
  index,
  total,
  color,
}: {
  filled: boolean;
  index: number;
  total: number;
  color: string;
}) {
  const size = total <= 5 ? "w-14 h-14" : total <= 8 ? "w-12 h-12" : "w-11 h-11";
  const checkSize = total <= 5 ? "w-7 h-7" : "w-5 h-5";

  return (
    <div
      className={`${size} rounded-full border-2 flex items-center justify-center transition-all ${
        filled ? "animate-stamp-pop" : ""
      }`}
      style={{
        backgroundColor: filled ? color : color + "15",
        borderColor: filled ? color : color + "30",
        animationDelay: filled ? `${index * 0.08}s` : "0s",
        animationFillMode: "both",
      }}
    >
      {filled ? (
        <Check className={`${checkSize} text-white`} />
      ) : (
        <span className="text-xs font-medium" style={{ color: color + "60" }}>
          {index + 1}
        </span>
      )}
    </div>
  );
}

export default function CustomerCardPage() {
  const params = useParams();
  const { businessName, currentCard, pastCards } = mockData;
  const remaining = currentCard.stampsRequired - currentCard.currentStamps;
  const progress = (currentCard.currentStamps / currentCard.stampsRequired) * 100;
  const isComplete = currentCard.currentStamps >= currentCard.stampsRequired;

  const cols =
    currentCard.stampsRequired <= 5
      ? 5
      : currentCard.stampsRequired <= 8
      ? 4
      : 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Business Header */}
        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3"
            style={{ backgroundColor: currentCard.color }}
          >
            {businessName.substring(0, 2).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-gray-900">{businessName}</h1>
          <p className="text-sm text-gray-500">{currentCard.name}</p>
        </div>

        {/* Stamp Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-rose-100">
          <div
            className="grid gap-3 mb-5 justify-items-center"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {Array.from({ length: currentCard.stampsRequired }).map((_, i) => (
              <StampCircle
                key={i}
                filled={i < currentCard.currentStamps}
                index={i}
                total={currentCard.stampsRequired}
                color={currentCard.color}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: currentCard.color,
                }}
              />
            </div>
          </div>

          {/* Status Message */}
          {isComplete ? (
            <div className="text-center py-4">
              <div className="relative inline-block mb-3">
                <Gift className="w-12 h-12 text-rose-500" />
                {/* Confetti dots */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-confetti"
                    style={{
                      backgroundColor: ["#f43f5e", "#ec4899", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"][i],
                      top: "50%",
                      left: "50%",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Parabens!</h2>
              <p className="text-sm text-gray-600 mb-4">
                Resgate a sua recompensa: <strong>{currentCard.reward}</strong>
              </p>
              <button
                className="text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
                style={{ backgroundColor: currentCard.color }}
              >
                Resgatar Recompensa
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold" style={{ color: currentCard.color }}>
                  {remaining} {remaining === 1 ? "carimbo" : "carimbos"}
                </span>{" "}
                para a sua recompensa!
              </p>
              <p className="text-xs text-gray-400 mt-1">{currentCard.reward}</p>
            </div>
          )}
        </div>

        {/* Past Cards */}
        {pastCards.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              Cartoes Anteriores
            </h3>
            <div className="space-y-2">
              {pastCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{card.name}</p>
                      <p className="text-xs text-gray-400">{card.completedAt}</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    Resgatado
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Powered by <span className="font-medium text-rose-400">LoyaltyCard</span>
          </p>
        </div>
      </div>
    </div>
  );
}
