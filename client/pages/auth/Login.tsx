import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/Auth";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/providers/I18n";

export default function LoginPage() {
  const { t } = useI18n();
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setLoading(true);
    try {
      demoLogin();
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-md p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-2">{t("login")}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Sign in to access your dashboard.
      </p>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="text-sm text-muted-foreground">Email</span>
          <input
            className="w-full border bg-background rounded px-3 py-2 mt-1"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted-foreground">Password</span>
          <input
            className="w-full border bg-background rounded px-3 py-2 mt-1"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex items-center justify-between">
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Sign In"}
          </Button>
          <div className="flex gap-3 items-center">
            <Link
              to="/auth/forgot"
              className="text-sm text-muted-foreground hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/auth/signup"
              className="text-sm text-muted-foreground hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="pt-2 border-t mt-2">
          <div className="text-sm text-muted-foreground mb-2">
            Or try the demo account
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEmail("demo");
                setPassword("demo");
              }}
              disabled={loading}
            >
              Fill demo
            </Button>
            <Button variant="secondary" onClick={handleDemo} disabled={loading}>
              {loading ? <Spinner /> : "Demo"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
