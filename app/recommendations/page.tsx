"use client";

import { useMemo, useState } from "react";

type HealthMetrics = {
  sleepDurationHours: number;
  sleepQuality: string;
  deepSleepMinutes: number;
  rhr: number;
  baselineRhr: number;
  steps: number;
  workoutType: string;
  workoutMinutes: number;
  caloriesBurned: number;
  caloriesConsumed: number;
  proteinIntake: number;
  moodRating: number;
  moodNote: string;
  goal: string;
  dietPreference: string;
  injuries: string;
};

type Insights = {
  recoveryStatus: string;
  currentRisk: string;
  exerciseRecommendation: string;
  exerciseRationale: string;
  nutritionRecommendation: string;
  nutritionRationale: string;
  stressRecommendation: string;
  stressRationale: string;
  scores: {
    recoveryScore: number;
    effortScore: number;
    nutritionScore: number;
    stressLoad: number;
  };
};

const numberFields: Array<keyof HealthMetrics> = [
  "sleepDurationHours",
  "deepSleepMinutes",
  "rhr",
  "baselineRhr",
  "steps",
  "workoutMinutes",
  "caloriesBurned",
  "caloriesConsumed",
  "proteinIntake",
  "moodRating",
];

const initialMetrics: HealthMetrics = {
  sleepDurationHours: 6.25,
  sleepQuality: "ضعيف",
  deepSleepMinutes: 40,
  rhr: 65,
  baselineRhr: 60,
  steps: 12000,
  workoutType: "تدريب مقاومة HIIT لمدة 45 دقيقة",
  workoutMinutes: 45,
  caloriesBurned: 650,
  caloriesConsumed: 1800,
  proteinIntake: 50,
  moodRating: 3,
  moodNote: "أشعر بالتعب والقلق قليلاً بشأن العمل.",
  goal: "بناء العضلات وفقدان الدهون",
  dietPreference: "نباتي",
  injuries: "لا يوجد",
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const analyzeMetrics = (metrics: HealthMetrics): Insights => {
  const rhrDelta = metrics.rhr - metrics.baselineRhr;
  const recoveryIsPoor =
    metrics.deepSleepMinutes < 60 ||
    rhrDelta >= 5 ||
    metrics.sleepQuality.toLowerCase() !== "جيد" && metrics.sleepQuality.toLowerCase() !== "good";
  const proteinGap = Math.max(0, 110 - metrics.proteinIntake);
  const stressHigh =
    metrics.moodRating <= 3 ||
    metrics.moodNote.toLowerCase().includes("anxious") ||
    metrics.moodNote.toLowerCase().includes("stress") ||
    metrics.moodNote.includes("قلق") ||
    metrics.moodNote.includes("توتر");

  const recoveryScore = clamp(
    Math.round(
      (metrics.deepSleepMinutes / 90) * 60 +
        Math.max(0, 1 - Math.max(0, rhrDelta) / 10) * 40
    )
  );
  const effortScore = clamp(
    Math.round(
      (metrics.steps / 12000) * 35 +
        (metrics.workoutMinutes / 45) * 45 +
        (metrics.caloriesBurned / 600) * 20
    )
  );
  const nutritionScore = clamp(
    Math.round(
      (metrics.proteinIntake / 110) * 65 +
        Math.min(metrics.caloriesConsumed / 2200, 1) * 35
    )
  );
  const stressLoad = clamp(
    Math.round(((5 - metrics.moodRating) / 4) * 100 + (stressHigh ? 15 : 0))
  );

  const recoveryStatus = recoveryIsPoor
    ? "النوم العميق أقل من ساعة ومعدل ضربات القلب المرتفع يشير إلى تعافي غير مكتمل."
    : "جودة النوم ومعدل ضربات القلب يبدوان جيدين—أنت مستعد للتدريب المنتج.";

  const currentRisk = recoveryIsPoor
    ? "خطر عالٍ للإفراط في التدريب قد يعيق مكاسب القوة وإعادة تشكيل الجسم."
    : "حمل التدريب متوافق مع قدرة التعافي الحالية لديك.";

  const exerciseRecommendation = recoveryIsPoor
    ? `استبدل التدريب المكثف اليوم بـ 20 دقيقة من اليوغا التصالحية بالإضافة إلى مشي لطيف لمدة 15 دقيقة في المنطقة 2 للحفاظ على تدفق الدم دون إضافة حمل.`
    : `استمر مع ${metrics.workoutType}، حدد RPE عند 7/10، وأضف تبريداً ممتداً للبقاء متوافقاً مع هدفك المتمثل في ${metrics.goal}.`;

  const exerciseRationale = recoveryIsPoor
    ? "التعافي النشط يحمي جهازك العصبي حتى تتمكن العضلات من إعادة البناء قبل الكتلة الثقيلة التالية."
    : "التحفيز المقيس يحافظ على زخم تضخم العضلات مع احترام الاستعداد الحالي.";

  const nutritionRecommendation =
    proteinGap > 0
      ? `أغلق فجوة البروتين البالغة ${proteinGap} جراماً بطبق نباتي: كوب واحد من زبادي الصويا (18 جراماً)، نصف كوب من الإيدامامي المحمص (11 جراماً)، وملعقتان كبيرتان من بذور القنب (6 جرامات).`
      : "استهلاك البروتين يلبي الهدف اليومي—أضف الكربوهيدرات المعقدة (الكينوا، الحمص) لإعادة ملء الجليكوجين قبل التمرين التالي.";

  const nutritionRationale =
    proteinGap > 0
      ? "هذه الكميات تضيف حوالي 35 جراماً من البروتين الكامل بالإضافة إلى المغذيات الدقيقة التي تسرع إصلاح العضلات بعد HIIT."
      : "الماكرو المتوازن يحافظ على طاقة التدريب ويبقي تخليق بروتين العضلات مرتفعاً.";

  const stressRecommendation = stressHigh
    ? `قم بسلم التنفس 4-7-8 لمدة 5 دقائق: استنشق 4 ثوانٍ، احبس 7 ثوانٍ، ازفر 8 ثوانٍ لست دورات، ثم اكتب مهمة واحدة يمكنك التحكم بها غداً.`
    : `حافظ على زخم الهدوء مع تأمل فحص الجسم لمدة 10 دقائق الليلة لتعزيز ضغط النوم الجيد.`;

  const stressRationale = stressHigh
    ? "الزفير الطويل ينشط العصب المبهم، مما يقلل القلق حتى تتعمق دورة النوم التالية."
    : "اليقظة الذهنية تبقي الكورتيزول تحت السيطرة، مما يحمي جودة التعافي.";

  return {
    recoveryStatus,
    currentRisk,
    exerciseRecommendation,
    exerciseRationale,
    nutritionRecommendation,
    nutritionRationale,
    stressRecommendation,
    stressRationale,
    scores: {
      recoveryScore,
      effortScore,
      nutritionScore,
      stressLoad,
    },
  };
};

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-sm font-medium text-slate-600 text-right">
      <span>{value}%</span>
      <span>{label}</span>
    </div>
    <div className="mt-1 h-2 rounded-full bg-slate-200">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default function PersonalizedRecommendationsPage() {
  const [metrics, setMetrics] = useState<HealthMetrics>(initialMetrics);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<Date | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("ar-SA", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    []
  );

  const handleChange = (
    field: keyof HealthMetrics,
    value: string | number
  ) => {
    setMetrics((prev) => ({
      ...prev,
      [field]: numberFields.includes(field) ? Number(value) || 0 : value,
    }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    const nextInsights = analyzeMetrics(metrics);
    setInsights(nextInsights);
    setLastGeneratedAt(new Date());
    setTimeout(() => setIsAnalyzing(false), 250);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-900">
      <p className="text-3xl font-semibold text-right">📄 تقرير التوصيات الصحية اليومية</p>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <p className="text-xl font-semibold text-right">إدخال البيانات الصحية اليومية</p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-500 text-right">النوم والتعافي</p>
              <label className="block text-sm font-medium text-slate-600 text-right">
                مدة النوم (ساعات)
                <input
                  type="number"
                  step="0.25"
                  value={metrics.sleepDurationHours}
                  onChange={(e) => handleChange("sleepDurationHours", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                جودة النوم
                <input
                  type="text"
                  value={metrics.sleepQuality}
                  onChange={(e) => handleChange("sleepQuality", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                النوم العميق (دقائق)
                <input
                  type="number"
                  value={metrics.deepSleepMinutes}
                  onChange={(e) => handleChange("deepSleepMinutes", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                معدل ضربات القلب الصباحي (نبضة/دقيقة)
                <input
                  type="number"
                  value={metrics.rhr}
                  onChange={(e) => handleChange("rhr", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                معدل ضربات القلب الأساسي (نبضة/دقيقة)
                <input
                  type="number"
                  value={metrics.baselineRhr}
                  onChange={(e) => handleChange("baselineRhr", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-500 text-right">النشاط والوقود</p>
              <label className="block text-sm font-medium text-slate-600 text-right">
                إجمالي الخطوات
                <input
                  type="number"
                  value={metrics.steps}
                  onChange={(e) => handleChange("steps", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                نوع التمرين
                <input
                  type="text"
                  value={metrics.workoutType}
                  onChange={(e) => handleChange("workoutType", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                مدة التمرين (دقائق)
                <input
                  type="number"
                  value={metrics.workoutMinutes}
                  onChange={(e) => handleChange("workoutMinutes", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                السعرات الحرارية المحروقة
                <input
                  type="number"
                  value={metrics.caloriesBurned}
                  onChange={(e) => handleChange("caloriesBurned", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                السعرات الحرارية المستهلكة
                <input
                  type="number"
                  value={metrics.caloriesConsumed}
                  onChange={(e) => handleChange("caloriesConsumed", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600 text-right">
                استهلاك البروتين (جرام)
                <input
                  type="number"
                  value={metrics.proteinIntake}
                  onChange={(e) => handleChange("proteinIntake", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-600 text-right">
              تقييم المزاج (1-5)
              <input
                type="number"
                min={1}
                max={5}
                value={metrics.moodRating}
                onChange={(e) => handleChange("moodRating", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
              />
            </label>
            <label className="block text-sm font-medium text-slate-600 text-right">
              الهدف الرئيسي
              <input
                type="text"
                value={metrics.goal}
                onChange={(e) => handleChange("goal", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
              />
            </label>
            <label className="block text-sm font-medium text-slate-600 text-right">
              التفضيل الغذائي
              <input
                type="text"
                value={metrics.dietPreference}
                onChange={(e) => handleChange("dietPreference", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
              />
            </label>
            <label className="block text-sm font-medium text-slate-600 text-right">
              الإصابات المسجلة
              <input
                type="text"
                value={metrics.injuries}
                onChange={(e) => handleChange("injuries", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-600 text-right">
            ملاحظات المزاج
            <textarea
              value={metrics.moodNote}
              onChange={(e) => handleChange("moodNote", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
              rows={3}
            />
          </label>

          <button
            type="button"
            onClick={handleAnalyze}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#24AE7C] px-4 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90"
          >
            {isAnalyzing ? "جاري التحليل..." : "إنشاء التوصيات"}
          </button>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-right">لقطة توازن الصحة</p>
            {lastGeneratedAt && (
              <span className="text-xs font-medium text-slate-500 text-right">
                آخر إنشاء •{" "}
                {lastGeneratedAt.toLocaleTimeString("ar-SA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
          {insights ? (
            <>
              <StatBar
                label="جاهزية التعافي"
                value={insights.scores.recoveryScore}
              />
              <StatBar
                label="حمل التدريب"
                value={insights.scores.effortScore}
              />
              <StatBar
                label="الدعم الغذائي"
                value={insights.scores.nutritionScore}
              />
              <StatBar label="حمل التوتر" value={insights.scores.stressLoad} />
              <p className="text-sm text-slate-500 text-right">
                يتم حساب النقاط تلقائياً من المدخلات اليومية لإظهار الفجوة
                بين الجهد والتعافي والوقود والتوتر.
              </p>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
              أدخل بياناتك واضغط "إنشاء التوصيات" لرؤية مخطط وجاهزية التقرير اليوم.
            </div>
          )}
        </div>
      </section>

      {insights ? (
        <>
          <section className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <p className="text-2xl font-semibold text-right">🔎 ملخص التحليل</p>
            <ul className="space-y-2 text-base leading-relaxed text-right">
              <li>
                <strong>حالة التعافي:</strong> {insights.recoveryStatus}
              </li>
              <li>
                <strong>المخاطر الحالية:</strong> {insights.currentRisk}
              </li>
            </ul>
          </section>

          <section className="mt-10 space-y-6 rounded-3xl border border-transparent bg-gradient-to-br from-sky-50 via-white to-violet-50 p-1 shadow-lg shadow-slate-200/60">
            <div className="rounded-3xl bg-white/90 p-6 md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="text-2xl font-semibold text-right">
                  ✨ توصيات مخصصة لـ {today}
                </p>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1 text-sm font-medium text-slate-600">
                  رؤى مولدة
                </span>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <article className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-sky-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-lg">🏋️</span>
                    <span className="text-lg font-semibold text-sky-600">
                      التمرين
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-slate-800 text-right">
                    {insights.exerciseRecommendation}
                  </p>
                  <p className="mt-4 rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-600 text-right">
                    <strong>المنطق:</strong> {insights.exerciseRationale}
                  </p>
                </article>

                <article className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-lime-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-lg">🍎</span>
                    <span className="text-lg font-semibold text-emerald-600">
                      التغذية
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-slate-800 text-right">
                    {insights.nutritionRecommendation}
                  </p>
                  <p className="mt-4 rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-600 text-right">
                    <strong>المنطق:</strong> {insights.nutritionRationale}
                  </p>
                </article>

                <article className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-violet-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-lg">🧘</span>
                    <span className="text-lg font-semibold text-violet-600">
                      التوتر
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-slate-800 text-right">
                    {insights.stressRecommendation}
                  </p>
                  <p className="mt-4 rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-600 text-right">
                    <strong>المنطق:</strong> {insights.stressRationale}
                  </p>
                </article>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center text-base text-slate-500">
          سيظهر تقريرك المخصص هنا بعد إنشائه.
        </section>
      )}
    </main>
  );
}

