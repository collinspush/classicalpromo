"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, fieldClass } from "@/components/ui";
import { safeNext } from "@/lib/format";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setError("");
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
        });
        const data = await response.json();
        setBusy(false);
        if (!response.ok) {
          setError(data.error ?? "Could not log in.");
          return;
        }
        router.push(next ? safeNext(next, data.destination) : data.destination);
        router.refresh();
      }}
    >
      <input className={fieldClass} name="email" type="email" placeholder="Email" required />
      <input className={fieldClass} name="password" type="password" placeholder="Password" required />
      {error ? <p className="text-sm text-gold">{error}</p> : null}
      <Button type="submit" disabled={busy}>{busy ? "Checking" : "Log in"}</Button>
      <p className="text-sm text-mist">
        <Link href="/forgot-password" className="text-gold">Forgot password</Link>
        <span> · </span>
        <Link href="/register">Create artist account</Link>
      </p>
    </form>
  );
}

export function RegisterForm({ next }: { next?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setError("");
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.get("name"),
            email: form.get("email"),
            password: form.get("password"),
            role: form.get("role"),
            company: form.get("company") || "",
          }),
        });
        const data = await response.json();
        setBusy(false);
        if (!response.ok) {
          setError(data.error ?? "Could not create the account.");
          return;
        }
        if (data.verifyPath) sessionStorage.setItem("cp_verify", data.verifyPath);
        router.push(next ? safeNext(next) : "/dashboard");
        router.refresh();
      }}
    >
      <input className={fieldClass} name="name" placeholder="Name" required />
      <input className={fieldClass} name="email" type="email" placeholder="Email" required />
      <input className={fieldClass} name="password" type="password" placeholder="Password" required minLength={10} />
      <select className={fieldClass} name="role" defaultValue="ARTIST">
        <option value="ARTIST">Artist</option>
        <option value="MANAGER">Manager</option>
        <option value="LABEL">Label</option>
      </select>
      <input className={fieldClass} name="company" placeholder="Company, if you are a manager or label" />
      <p className="text-xs leading-relaxed text-dim">Password: at least 10 characters, with a letter and a number. Partners apply separately and wait for approval.</p>
      {error ? <p className="text-sm text-gold">{error}</p> : null}
      <Button type="submit" disabled={busy}>{busy ? "Creating" : "Create artist account"}</Button>
    </form>
  );
}

export function ForgotForm() {
  const [message, setMessage] = useState("");
  const [resetPath, setResetPath] = useState<string | null>(null);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/auth/forgot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.get("email") }),
        });
        const data = await response.json();
        setMessage(data.message ?? data.error);
        setResetPath(data.resetPath ?? null);
      }}
    >
      <input className={fieldClass} name="email" type="email" placeholder="Email" required />
      <Button type="submit">Send reset link</Button>
      {message ? <p className="text-sm text-mist">{message}</p> : null}
      {resetPath ? (
        <p className="text-sm text-gold">
          Email delivery is not configured, so the demo reset link is shown here: <Link href={resetPath}>Reset password</Link>
        </p>
      ) : null}
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const password = String(new FormData(event.currentTarget).get("password") ?? "");
        const response = await fetch("/api/auth/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.error ?? "Could not reset the password.");
          return;
        }
        router.push("/login");
      }}
    >
      <input className={fieldClass} name="password" type="password" placeholder="New password" required minLength={10} />
      {error ? <p className="text-sm text-gold">{error}</p> : null}
      <Button type="submit">Update password</Button>
    </form>
  );
}
