"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AnimatedTestimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export function AnimatedTestimonials({
  testimonials,
}: {
  testimonials: AnimatedTestimonial[];
}) {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  if (!t) return null;

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-sm md:h-64 md:w-64">
          <Image
            src={t.src}
            alt={t.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 224px, 256px"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <blockquote className="text-lg leading-relaxed text-slate-700">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <p className="mt-6 font-semibold text-slate-900">{t.name}</p>
          <p className="text-sm text-slate-500">{t.designation}</p>
          <div className="mt-8 flex justify-center gap-2 md:justify-start">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous testimonial"
              onClick={() =>
                setActive(
                  (i) => (i - 1 + testimonials.length) % testimonials.length
                )
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next testimonial"
              onClick={() =>
                setActive((i) => (i + 1) % testimonials.length)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
