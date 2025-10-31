"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("planner@demo.test");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Credenciales inválidas");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-6 rounded-2xl bg-white/90 p-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <p className="text-sm text-zinc-600">Usa tu acceso de planner o asistente.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-1 text-sm">
          Email
          <input
            className="rounded border border-black/10 px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          Contraseña
          <input
            className="rounded border border-black/10 px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
      <p className="text-xs text-zinc-500">Usuario demo: planner@demo.test / demo1234</p>
    </div>
  );
}

