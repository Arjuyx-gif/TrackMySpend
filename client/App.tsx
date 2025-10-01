import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AccountsPage from "./pages/Accounts";
import Placeholder from "./pages/Placeholder";
import AuthPage from "./pages/auth";
import LoginPage from "./pages/auth/Login";
import { Layout } from "@/components/layout/Layout";
import { I18nProvider } from "@/providers/I18n";
import { AuthProvider } from "@/providers/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <I18nProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/transactions" element={<Placeholder title="Transactions" />} />
                <Route path="/budgets" element={<Placeholder title="Budgets" />} />
                <Route path="/categories" element={<Placeholder title="Categories" />} />
                <Route path="/entities" element={<Placeholder title="Entities" />} />
                <Route path="/investments" element={<Placeholder title="Investments" />} />
                <Route path="/stats" element={<Placeholder title="Stats" />} />
                <Route path="/profile" element={<Placeholder title="Profile" />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<AuthPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </I18nProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
