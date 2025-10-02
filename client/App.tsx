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
import SignupPage from "./pages/auth/Signup";
import { RequireAuth } from "@/components/auth/RequireAuth";

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
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />

                <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
                <Route path="/accounts" element={<RequireAuth><AccountsPage /></RequireAuth>} />
                <Route path="/transactions" element={<RequireAuth><Placeholder title="Transactions" /></RequireAuth>} />
                <Route path="/budgets" element={<RequireAuth><Placeholder title="Budgets" /></RequireAuth>} />
                <Route path="/categories" element={<RequireAuth><Placeholder title="Categories" /></RequireAuth>} />
                <Route path="/entities" element={<RequireAuth><Placeholder title="Entities" /></RequireAuth>} />
                <Route path="/investments" element={<RequireAuth><Placeholder title="Investments" /></RequireAuth>} />
                <Route path="/stats" element={<RequireAuth><Placeholder title="Stats" /></RequireAuth>} />
                <Route path="/profile" element={<RequireAuth><Placeholder title="Profile" /></RequireAuth>} />

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
