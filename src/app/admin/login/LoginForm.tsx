"use client";

import { useActionState } from "react";
import { inputCls, labelCls } from "@/components/admin/ui";
import SubmitButton from "@/components/admin/SubmitButton";
import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-8 space-y-4 rounded-xl border border-line bg-white p-6">
      {state.error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="password" className={labelCls}>
          Password
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={`${inputCls} mt-1`} />
      </div>
      <SubmitButton className="w-full" pendingText="Checking…">
        Log in
      </SubmitButton>
    </form>
  );
}
