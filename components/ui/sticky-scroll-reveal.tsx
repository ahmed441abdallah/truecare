"use client";

import type { ReactNode } from "react";

export type StickyScrollItem = {
  title: string;
  description: string;
  content: ReactNode;
};

export function StickyScroll({ content }: { content: StickyScrollItem[] }) {
  return (
    <div className="relative">
      {content.map((item, i) => (
        <div
          key={i}
          className="flex min-h-[70vh] flex-col gap-8 py-12 md:flex-row md:items-start"
        >
          <div className="md:sticky md:top-24 md:w-1/2 md:self-start">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {item.title}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
          <div className="min-h-[240px] flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 md:w-1/2">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
