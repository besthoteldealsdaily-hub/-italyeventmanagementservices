"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  className = "",
  pendingText = "Saving…",
}: {
  children: React.ReactNode;
  className?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60 ${className}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
