import { QrCode, Printer, Smartphone, Info } from "lucide-react";

export default function QRBalcaoPage() {
  const scansToday = 18;
  const businessSlug = "cafe-central";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">QR Code do Balcao</h1>
        <p className="text-sm text-gray-500 mt-1">
          Imprima ou mostre no tablet para os clientes digitalizarem
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Cafe Central</h2>
            <p className="text-sm text-gray-500">Digitalize para receber o seu carimbo</p>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 inline-block mx-auto mb-6">
            <div className="w-56 h-56 bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-3 relative">
              {/* Simulated QR pattern */}
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => {
                  const isCorner =
                    (i < 3 || (i >= 5 && i < 8)) && (Math.floor(i / 8) < 3) ||
                    (i % 8 < 3 && Math.floor(i / 8) < 3) ||
                    (i % 8 >= 5 && Math.floor(i / 8) < 3) ||
                    (i % 8 < 3 && Math.floor(i / 8) >= 5);
                  const filled = isCorner || Math.random() > 0.45;
                  return (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-sm ${filled ? "bg-gray-800" : "bg-white"}`}
                    />
                  );
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <div className="w-8 h-8 bg-rose-500 rounded flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            loyaltycard.pt/carimbo/{businessSlug}
          </p>

          <div className="flex gap-3 justify-center">
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Imprimir QR
            </button>
            <button className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Modo Tablet
            </button>
          </div>
        </div>

        {/* Info and Stats */}
        <div className="space-y-6">
          {/* Scan Counter */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Digitalizacoes Hoje</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-rose-600">{scansToday}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">carimbos adicionados hoje</p>
                <p className="text-xs text-green-600 mt-0.5">+5 em relacao a ontem</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-rose-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-rose-500" />
              Instrucoes para a Equipa
            </h3>
            <ol className="space-y-3">
              {[
                "Imprima o QR Code e coloque-o visivel no balcao",
                "Quando o cliente pagar, peca para digitalizar o QR",
                "O carimbo e adicionado automaticamente ao cartao do cliente",
                "Quando o cartao estiver completo, o cliente mostra o ecra de recompensa",
                "Valide e ofereca a recompensa ao cliente",
              ].map((instruction, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Dicas</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>&bull; Coloque o QR ao lado da caixa registadora</li>
              <li>&bull; Num tablet, use o &quot;Modo Tablet&quot; para ecra cheio</li>
              <li>&bull; Lembre os clientes que nao precisam de instalar app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
