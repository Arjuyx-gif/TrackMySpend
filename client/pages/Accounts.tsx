import React, { useMemo, useState } from "react";
import { demoAccounts, Account, categories, categoryRules, demoTransactions } from "@/data/demo";
import { useI18n } from "@/providers/I18n";
import { Button } from "@/components/ui/button";
import { categorize } from "@/utils/csv";

export default function AccountsPage() {
  const { t } = useI18n();
  const [accounts, setAccounts] = useState<Account[]>(demoAccounts);
  const [form, setForm] = useState({ name: "", balance: "", type: "checking", institution: "" });

  const total = useMemo(() => accounts.reduce((sum, a) => sum + a.balance, 0), [accounts]);

  const add = () => {
    const acc: Account = {
      id: Math.random().toString(36).slice(2),
      name: form.name,
      balance: Number(form.balance || 0),
      type: form.type as Account["type"],
      institution: form.institution || undefined,
    };
    setAccounts((a) => [acc, ...a]);
    setForm({ name: "", balance: "", type: "checking", institution: "" });
  };

  const autoCatExample = useMemo(() => categorize("Whole Foods", categoryRules), []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("accounts")}</h1>
          <p className="text-muted-foreground text-sm">{t("totalBalance")}: {total.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
        </div>
        <div className="bg-card border p-4 rounded-md w-full md:w-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input className="border bg-background rounded px-3 py-2" placeholder={t("accountName")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="border bg-background rounded px-3 py-2" placeholder={t("balance")} value={form.balance} onChange={(e) => setForm({ ...form, balance: e.target.value })} />
            <select className="border bg-background rounded px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit</option>
              <option value="brokerage">Brokerage</option>
            </select>
            <input className="border bg-background rounded px-3 py-2" placeholder={t("institution")} value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
          </div>
          <div className="flex justify-end mt-3">
            <Button onClick={add}>{t("addAccount")}</Button>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {accounts.length === 0 && (
          <div className="text-sm text-muted-foreground">{t("noAccounts")}</div>
        )}
        {accounts.map((a) => (
          <div key={a.id} className="bg-card border rounded-md p-4">
            <div className="font-semibold">{a.name}</div>
            <div className={`text-sm mt-1 ${a.balance < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
              {a.balance.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{a.type}{a.institution ? ` • ${a.institution}` : ""}</div>
          </div>
        ))}
      </section>

      <section className="bg-card border rounded-md p-4">
        <div className="font-medium mb-2">{t("recentTransactions")}</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground">
              <tr className="text-left">
                <th className="py-2 pr-2">Date</th>
                <th className="py-2 pr-2">Payee</th>
                <th className="py-2 pr-2">Category</th>
                <th className="py-2 pr-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {demoTransactions.slice(0,6).map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="py-2 pr-2">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="py-2 pr-2">{t.payee}</td>
                  <td className="py-2 pr-2">{t.category}</td>
                  <td className={`py-2 pl-2 text-right ${t.amount < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {t.amount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-muted-foreground mt-3">Auto-categorization example: Whole Foods → {autoCatExample}</div>
      </section>
    </div>
  );
}
