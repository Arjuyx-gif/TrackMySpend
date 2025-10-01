import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/providers/Auth";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/providers/I18n";

export default function SignupPage() {
  const { t } = useI18n();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name.trim()) return "Please enter your name";
    if (!/@/.test(email)) return "Please enter a valid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirm) return "Passwords do not match";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    try {
      await signup(name.trim(), email.trim(), password);
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-md p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-2">{t("signup")}</h1>
      <p className="text-sm text-muted-foreground mb-4">Create your account to start managing your finances.</p>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="text-sm text-muted-foreground">Name</span>
          <input className="w-full border bg-background rounded px-3 py-2 mt-1" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm text-muted-foreground">Email</span>
          <input className="w-full border bg-background rounded px-3 py-2 mt-1" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm text-muted-foreground">Password</span>
          <input className="w-full border bg-background rounded px-3 py-2 mt-1" placeholder="Create a password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm text-muted-foreground">Confirm Password</span>
          <input className="w-full border bg-background rounded px-3 py-2 mt-1" placeholder="Repeat password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </label>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex items-center justify-between">
          <Button type="submit" disabled={loading}>{loading ? <Spinner /> : "Create account"}</Button>
          <div className="text-sm text-muted-foreground">Already have an account? <Link to="/auth/login" className="underline">Sign in</Link></div>
        </div>
      </form>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
