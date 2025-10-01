import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Banknote, Wallet, ListChecks, Layers3, Building2, LineChart, Settings, Home, LogIn, UserPlus } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/providers/I18n";
import { useAuth } from "@/providers/Auth";

const nav = [
  { to: "/", icon: Home, key: "dashboard" },
  { to: "/accounts", icon: Wallet, key: "accounts" },
  { to: "/transactions", icon: ListChecks, key: "transactions" },
  { to: "/budgets", icon: Layers3, key: "budgets" },
  { to: "/categories", icon: Banknote, key: "categories" },
  { to: "/entities", icon: Building2, key: "entities" },
  { to: "/investments", icon: LineChart, key: "investments" },
  { to: "/stats", icon: BarChart3, key: "stats" },
  { to: "/profile", icon: Settings, key: "profile" },
];

export function Sidebar() {
  const { t } = useI18n();
  const { user, logout } = useAuth();

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="flex items-center justify-between px-2">
        <div className="font-extrabold tracking-tight text-xl">TrackMyFin</div>
        <ThemeToggle />
      </div>
      <div className="px-2">
        <LanguageSwitcher />
      </div>
      <nav className="flex-1 overflow-y-auto mt-2 space-y-1">
        {nav.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`
            }
            end={to === "/"}
          >
            <Icon className="w-4 h-4" />
            <span>{t(key)}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t pt-3 flex items-center justify-between gap-2">
        {user ? (
          <button className="text-sm text-muted-foreground hover:text-foreground" onClick={logout}>{t("logout")}</button>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/auth/login" className="inline-flex items-center gap-2 text-sm hover:underline"><LogIn className="w-4 h-4" />{t("login")}</NavLink>
            <NavLink to="/auth/signup" className="inline-flex items-center gap-2 text-sm hover:underline"><UserPlus className="w-4 h-4" />{t("signup")}</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
