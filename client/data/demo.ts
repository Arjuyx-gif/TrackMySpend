export type AccountType = "checking" | "savings" | "credit" | "brokerage";

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  institution?: string;
}

export interface Transaction {
  id: string;
  date: string; // ISO date
  accountId: string;
  payee: string;
  amount: number; // negative = expense, positive = income
  category: string;
  notes?: string;
}

export interface CategoryRule {
  match: RegExp;
  category: string;
}

export const categories = [
  "Rent",
  "Groceries",
  "Transport",
  "Dining",
  "Utilities",
  "Entertainment",
  "Salary",
  "Investments",
  "Other",
];

export const categoryRules: CategoryRule[] = [
  { match: /uber|lyft|ride/i, category: "Transport" },
  { match: /whole foods|market|grocery|super/i, category: "Groceries" },
  { match: /netflix|spotify|prime/i, category: "Entertainment" },
  { match: /salary|payroll|paycheck/i, category: "Salary" },
  { match: /rent|landlord/i, category: "Rent" },
];

export const demoAccounts: Account[] = [
  { id: "a1", name: "Everyday Checking", balance: 2450.35, type: "checking", institution: "BankOne" },
  { id: "a2", name: "High-Yield Savings", balance: 10450.0, type: "savings", institution: "BankOne" },
  { id: "a3", name: "Rewards Credit", balance: -320.25, type: "credit", institution: "Cardo" },
  { id: "a4", name: "Brokerage", balance: 7850.8, type: "brokerage", institution: "InvestCo" },
];

export const demoTransactions: Transaction[] = [
  { id: "t1", date: new Date().toISOString(), accountId: "a1", payee: "Whole Foods", amount: -82.45, category: "Groceries" },
  { id: "t2", date: new Date().toISOString(), accountId: "a1", payee: "Uber", amount: -15.2, category: "Transport" },
  { id: "t3", date: new Date().toISOString(), accountId: "a1", payee: "Rent", amount: -1200, category: "Rent" },
  { id: "t4", date: new Date().toISOString(), accountId: "a1", payee: "Payroll", amount: 3800, category: "Salary" },
  { id: "t5", date: new Date().toISOString(), accountId: "a3", payee: "Netflix", amount: -15.99, category: "Entertainment" },
];
