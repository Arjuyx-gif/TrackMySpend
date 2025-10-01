import React, { useState } from "react";
import { useAuth } from "@/providers/Auth";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const { login, signup, demoLogin } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) await signup(name, email, password);
    else await login(email, password);
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-md p-6 space-y-4">
      <h1 className="text-xl font-bold">{isSignup ? "Sign up" : "Login"}</h1>
      <form onSubmit={submit} className="space-y-3">
        {isSignup && (
          <input className="w-full border bg-background rounded px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input className="w-full border bg-background rounded px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border bg-background rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex gap-2">
          <Button type="submit">{isSignup ? "Create account" : "Login"}</Button>
          <Button type="button" variant="secondary" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Have an account? Login" : "Create account"}
          </Button>
          <Button type="button" variant="outline" onClick={demoLogin}>Demo</Button>
        </div>
      </form>
    </div>
  );
}
