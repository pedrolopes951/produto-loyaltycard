import { Users, Stamp, Gift, TrendingUp, Clock } from "lucide-react";

const stats = [
  { label: "Clientes Ativos", value: "234", icon: Users, change: "+12 esta semana", color: "bg-rose-50 text-rose-600" },
  { label: "Carimbos Hoje", value: "18", icon: Stamp, change: "+5 vs ontem", color: "bg-pink-50 text-pink-600" },
  { label: "Recompensas Resgatadas", value: "45", icon: Gift, change: "este mes", color: "bg-green-50 text-green-600" },
  { label: "Taxa de Retorno", value: "67%", icon: TrendingUp, change: "+3% vs mes anterior", color: "bg-blue-50 text-blue-600" },
];

const recentActivity = [
  { customer: "Maria S.", action: "Recebeu carimbo", card: "Cafe Expresso", time: "Ha 5 min", stamps: "8/10" },
  { customer: "Joao P.", action: "Resgatou recompensa", card: "Cafe Expresso", time: "Ha 15 min", stamps: "10/10" },
  { customer: "Ana R.", action: "Recebeu carimbo", card: "Pastel de Nata", time: "Ha 30 min", stamps: "3/5" },
  { customer: "Miguel F.", action: "Novo cliente", card: "Cafe Expresso", time: "Ha 1h", stamps: "1/10" },
  { customer: "Sofia L.", action: "Recebeu carimbo", card: "Desconto 20%", time: "Ha 2h", stamps: "6/8" },
  { customer: "Ricardo M.", action: "Resgatou recompensa", card: "Pastel de Nata", time: "Ha 3h", stamps: "5/5" },
];

export default function PainelPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Painel</h1>
        <p className="text-sm text-gray-500 mt-1">Visao geral do seu programa de fidelizacao</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            <p className="text-xs text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Atividade Recente
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivity.map((activity, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-semibold text-xs">
                    {activity.customer.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.customer}{" "}
                    <span className="font-normal text-gray-500">— {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-400">{activity.card} &middot; {activity.time}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">
                {activity.stamps}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
