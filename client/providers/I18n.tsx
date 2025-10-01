import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";

export type Locale = "en" | "pt";

type Dict = Record<string, string>;

type Messages = Record<Locale, Dict>;

const messages: Messages = {
  en: {
    appName: "TrackMyFin",
    dashboard: "Dashboard",
    accounts: "Accounts",
    transactions: "Transactions",
    budgets: "Budgets",
    categories: "Categories",
    entities: "Entities",
    investments: "Investments",
    stats: "Stats",
    profile: "Profile",
    login: "Login",
    signup: "Sign up",
    logout: "Logout",
    demo: "Demo",
    light: "Light",
    dark: "Dark",
    language: "Language",
    totalBalance: "Total Balance",
    monthlySpending: "Monthly Spending",
    monthlyIncome: "Monthly Income",
    netWorth: "Net Worth",
    addAccount: "Add Account",
    accountName: "Account Name",
    balance: "Balance",
    type: "Type",
    institution: "Institution",
    save: "Save",
    cancel: "Cancel",
    noAccounts: "No accounts yet",
    recentTransactions: "Recent Transactions",
    viewAll: "View all",
    csvImport: "CSV Import",
    uploadCSV: "Upload CSV",
    importRules: "Import Rules",
    autoCategorization: "Auto-categorization",
    welcome: "Welcome",
    startHere: "Guided onboarding helps you start fast.",
  },
  pt: {
    appName: "TrackMyFin",
    dashboard: "Painel",
    accounts: "Contas",
    transactions: "Transações",
    budgets: "Orçamentos",
    categories: "Categorias",
    entities: "Entidades",
    investments: "Investimentos",
    stats: "Estatísticas",
    profile: "Perfil",
    login: "Entrar",
    signup: "Cadastrar",
    logout: "Sair",
    demo: "Demo",
    light: "Claro",
    dark: "Escuro",
    language: "Idioma",
    totalBalance: "Saldo Total",
    monthlySpending: "Gasto Mensal",
    monthlyIncome: "Renda Mensal",
    netWorth: "Patrimônio",
    addAccount: "Adicionar Conta",
    accountName: "Nome da Conta",
    balance: "Saldo",
    type: "Tipo",
    institution: "Instituição",
    save: "Salvar",
    cancel: "Cancelar",
    noAccounts: "Nenhuma conta ainda",
    recentTransactions: "Transações Recentes",
    viewAll: "Ver todas",
    csvImport: "Importar CSV",
    uploadCSV: "Enviar CSV",
    importRules: "Regras de Importação",
    autoCategorization: "Auto-categorização",
    welcome: "Bem-vindo",
    startHere: "A orientação ajuda você a começar rápido.",
  },
};

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem("locale");
    return (stored as Locale) || "en";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const value = useMemo(() => {
    const t = (key: string) => messages[locale][key] ?? key;
    return { locale, t, setLocale };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
