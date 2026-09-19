import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = adminConfigured();
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Italy</p>
      <h1 className="text-center font-serif text-2xl font-semibold">Event Management Services</h1>
      <p className="mt-1 text-center text-sm text-muted">Admin</p>
      {configured ? (
        <LoginForm />
      ) : (
        <p className="mt-8 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          Admin login is not configured. Set the runtime secrets <code>ADMIN_PASSWORD</code> and <code>SESSION_SECRET</code> (16+ random
          characters), then redeploy.
        </p>
      )}
    </div>
  );
}
