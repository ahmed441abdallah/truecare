"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Simple count-up component
function CountUp({ 
  end, 
  decimals = 0, 
  duration = 1.6, 
  enableScrollSpy = false, 
  scrollSpyOnce = false 
}: { 
  end: number; 
  decimals?: number; 
  duration?: number; 
  enableScrollSpy?: boolean; 
  scrollSpyOnce?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enableScrollSpy || hasAnimated) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        setCount(progress * end);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
          if (scrollSpyOnce) setHasAnimated(true);
        }
      };
      requestAnimationFrame(animate);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            setCount(progress * end);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
              if (scrollSpyOnce) {
                setHasAnimated(true);
                observer.disconnect();
              }
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, enableScrollSpy, scrollSpyOnce, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
const caseStudies = [
    {
      id: 1,
      quote:
        "لقد غير نظام حجز المواعيد عبر الإنترنت طريقة إدارة رعاية المرضى لدينا. يمكننا الآن خدمة 40% من المرضى بشكل أكثر كفاءة مع الحفاظ على أعلى جودة للخدمة.",
      name: "د. سارة جونسون",
      role: "الرئيس الطبي",
      image:"https://images.pexels.com/photos/5407249/pexels-photo-5407249.jpeg",
      metrics: [
        { value: "40%", label: "مرضى أكثر تم خدمتهم", sub: "زيادة القدرة الاستيعابية" },
        { value: "95%", label: "رضا المرضى", sub: "بناءً على استطلاعات المرضى" },
      ],
    },
    {
      id: 2,
      quote:
        "لقد سهلت منصتنا الصحية عملياتنا بشكل كبير. قلل النظام الرقمي وقت جدولة المواعيد وحسن تنسيق رعاية المرضى عبر جميع الأقسام.",
      name: "د. مايكل تشين",
      role: "رئيس قسم أمراض القلب",
      image:"https://images.pexels.com/photos/7108317/pexels-photo-7108317.jpeg",
      metrics: [
        { value: "3.5x", label: "جدولة أسرع", sub: "سرعة حجز المواعيد" },
        { value: "70%", label: "تقليل أوقات الانتظار", sub: "للمرضى" },
      ],
    },
    {
      id: 3,
      quote:
        "لقد أحدثت الميزات التعاونية للمنصة ثورة في نهج رعاية المرضى لدينا. أصبحت السجلات الطبية الآن سهلة الوصول، ويمكن لفريقنا تقديم رعاية سلسة ومنسقة.",
      name: "د. إيميلي رودريجيز",
      role: "أخصائية طب الأطفال",
      image:"https://images.pexels.com/photos/7653132/pexels-photo-7653132.jpeg",
      metrics: [
        { value: "2x", label: "استشارات أسرع", sub: "مع السجلات الرقمية" },
        { value: "88%", label: "كفاءة الفريق", sub: "تحسين التنسيق" },
      ],
    },
  ];
/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
  if (!m) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = (normalized.split(".")[1]?.length ?? 0);
  return {
    prefix: prefix ?? "",
    end: isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  };
}

/** Small component: one animated metric */
function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);
  
  return (
    <div className="flex flex-col gap-2 text-right p-6">
      <p
        className="text-2xl font-medium text-gray-900 dark:text-white sm:text-4xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion ? (
          <span>
            {end.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
          </span>
        ) : (
          <CountUp
            end={end}
            decimals={decimals}
            duration={duration}
            enableScrollSpy
            scrollSpyOnce
          />
        )}
        {suffix}
      </p>
      <p className="font-medium text-gray-900 dark:text-white text-right">
        {label}
      </p>
      {sub ? (
        <p className="text-gray-600 dark:text-gray-400 text-right">{sub}</p>
      ) : null}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="w-full p-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
           
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-right font-regular">
                تحويل الوصول إلى الرعاية الصحية للجميع
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-right">
                نؤمن أن الرعاية الصحية عالية الجودة يجب أن تكون في متناول الجميع وبأسعار معقولة ومريحة. 
                تربط منصتنا المرضى بالمتخصصين الصحيين ذوي الخبرة، مما يجعل حجز المواعيد والوصول إلى السجلات الطبية 
                والحصول على رعاية مخصصة أسهل من أي وقت مضى.
              </p>
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="relative rounded-md aspect-square overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/4226123/pexels-photo-4226123.jpeg"
                alt="متخصص صحي"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative rounded-md row-span-2 overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/7089296/pexels-photo-7089296.jpeg"
                alt="استشارة طبية"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative rounded-md aspect-square overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/7579833/pexels-photo-7579833.jpeg"
                alt="فريق الرعاية الصحية"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
      <section
      className="py-32 bg-background"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <h2
            id="case-studies-heading"
            className="text-4xl font-semibold md:text-5xl text-foreground"
          >
            نتائج حقيقية من منصة الرعاية الصحية لدينا
          </h2>
          <p className="text-muted-foreground">
            شاهد كيف تحول منصتنا تقديم الرعاية الصحية مع تحسين الكفاءة
            ورضا المرضى وتنسيق الرعاية.
          </p>
        </div>

        {/* Cases */}
        <div className="mt-20 flex flex-col gap-20">
          {caseStudies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={study.id}
                className="grid gap-12 lg:grid-cols-3 xl:gap-24 items-center border-b border-gray-200 dark:border-gray-800 pb-12"
              >
                {/* Left: Image + Quote */}
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-10 lg:col-span-2 lg:border-l lg:pl-12 xl:pl-16 text-right",
                    reversed
                      ? "lg:order-2 lg:border-l-0 lg:border-r border-gray-200 dark:border-gray-800 lg:pr-12 xl:pr-16 lg:pl-0"
                      : "border-gray-200 dark:border-gray-800",
                  ].join(" ")}
                >
                  <Image
                    src={study.image}
                    alt={`صورة ${study.name}`}
                    width={300}
                    height={400}
                    className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl object-cover ring-1 ring-border hover:scale-105 transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <figure className="flex flex-col justify-between gap-8 text-right">
                    <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed text-right">
                      <h3 className="text-lg sm:text-xl lg:text-xl font-normal text-gray-900 dark:text-white leading-relaxed text-right">
                        تجربة رعاية صحية استثنائية{" "}
                        <span className="block text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg mt-2">
                          {study.quote}
                        </span>
                      </h3>
                    </blockquote>
                    <figcaption className="flex items-center gap-6 mt-4 text-right">
                      <div className="flex flex-col gap-1">
                        <span className="text-md font-medium text-foreground">
                          {study.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {study.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </div>

                {/* Right: Metrics */}
                <div
                  className={[
                    "grid grid-cols-1 gap-10 self-center text-right",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {study.metrics.map((metric, i) => (
                    <MetricStat
                      key={`${study.id}-${i}`}
                      value={metric.value}
                      label={metric.label}
                      sub={metric.sub}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
}

export default AboutPage;
