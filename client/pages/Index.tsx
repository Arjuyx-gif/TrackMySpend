import React, { useMemo } from "react";
import { demoAccounts, demoTransactions } from "@/data/demo";
import { useI18n } from "@/providers/I18n";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Index() {
  const { t } = useI18n();

  const totalBalance = useMemo(() => demoAccounts.reduce((s, a) => s + a.balance, 0), []);
  const month = new Date().getMonth();
  const monthlySpending = useMemo(() => demoTransactions.filter((t) => new Date(t.date).getMonth() === month && t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0), []);
  const monthlyIncome = useMemo(() => demoTransactions.filter((t) => new Date(t.date).getMonth() === month && t.amount > 0).reduce((s, t) => s + t.amount, 0), []);

  const history = useMemo(() => {
    const days = [...Array(12)].map((_, i) => i).map((i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (11 - i));
      return d;
    });
    return days.map((d) => {
      const monthIdx = d.getMonth();
      const income = demoTransactions.filter((t) => new Date(t.date).getMonth() === monthIdx && t.amount > 0).reduce((s, t) => s + t.amount, 0);
      const spend = Math.abs(demoTransactions.filter((t) => new Date(t.date).getMonth() === monthIdx && t.amount < 0).reduce((s, t) => s + t.amount, 0));
      return { name: d.toLocaleDateString(undefined, { month: "short" }), income, spend };
    });
  }, []);

  return (
    <div className="space-y-6 font-normal">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("welcome")}</h1>
          <p className="text-muted-foreground">{t("startHere")}</p>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <CardStat label={t("totalBalance")} value={totalBalance} positive />
        <CardStat label={t("monthlySpending")} value={monthlySpending} />
        <CardStat label={t("monthlyIncome")} value={monthlyIncome} positive />
        <CardStat label={t("netWorth")} value={totalBalance + 25000} positive />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border rounded-md p-4 lg:col-span-2">
          <div className="font-medium mb-2">{t("stats")}</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="spend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} hide width={0} />
                <Tooltip formatter={(v: number) => v.toLocaleString("en-IN", { style: "currency", currency: "INR" })} />
                <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#inc)" />
                <Area type="monotone" dataKey="spend" stroke="#ef4444" fill="url(#spend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border rounded-md p-4">
          <div className="font-medium mb-2">{t("accounts")}</div>
          <ul className="space-y-2">
            {demoAccounts.map((a) => (
              <li key={a.id} className="flex items-center justify-between">
                <span className="truncate">{a.name}</span>
                <span className={`text-sm ${a.balance < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {a.balance.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function CardStat({ label, value, positive }: { label: string; value: number; positive?: boolean }) {
  const color = value >= 0 && positive ? "text-emerald-600 dark:text-emerald-400" : value < 0 ? "text-destructive" : "";
  return (
    <div className="bg-card border rounded-md p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`text-2xl font-semibold mt-1 ${color}`}>{value.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
    </div>
  );
}
