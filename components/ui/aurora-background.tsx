"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col overflow-hidden bg-zinc-950 text-white",
        className
      )}
    >
      <div
        aria-hidden
        className="animate-aurora pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(99, 102, 241, 0.35) 0%, transparent 45%), linear-gradient(300deg, rgba(16, 185, 129, 0.25) 0%, transparent 40%), linear-gradient(60deg, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
