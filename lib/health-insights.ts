import { HealthMetrics, Insights } from "@/types/health";

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

export const numberFields: Array<keyof HealthMetrics> = [
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

export const initialMetrics: HealthMetrics = {
  sleepDurationHours: 6.25,
  sleepQuality: "Poor",
  deepSleepMinutes: 40,
  rhr: 65,
  baselineRhr: 60,
  steps: 12000,
  workoutType: "45-min HIIT resistance training",
  workoutMinutes: 45,
  caloriesBurned: 650,
  caloriesConsumed: 1800,
  proteinIntake: 50,
  moodRating: 3,
  moodNote: "Feeling tired and a bit anxious about work.",
  goal: "Muscle building and fat loss",
  dietPreference: "Vegetarian",
  injuries: "None",
};

export const analyzeMetrics = (metrics: HealthMetrics): Insights => {
  const rhrDelta = metrics.rhr - metrics.baselineRhr;
  const recoveryIsPoor =
    metrics.deepSleepMinutes < 60 ||
    rhrDelta >= 5 ||
    metrics.sleepQuality.toLowerCase() !== "good";
  const proteinGap = Math.max(0, 110 - metrics.proteinIntake);
  const stressHigh =
    metrics.moodRating <= 3 ||
    metrics.moodNote.toLowerCase().includes("anxious") ||
    metrics.moodNote.toLowerCase().includes("stress");

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
    ? "Very poor recovery: deep sleep is under an hour and RHR is above baseline."
    : "Recovery is adequate with balanced sleep and stable RHR.";

  const currentRisk = recoveryIsPoor
    ? "Risk of overtraining is high and may blunt progress toward body recomposition."
    : "Training load is aligned with current recovery capacity.";

  const exerciseRecommendation = recoveryIsPoor
    ? `Swap today's intense work for 20 minutes of restorative yoga plus a gentle 15-minute zone-2 walk to keep blood flow without adding load.`
    : `Proceed with ${metrics.workoutType} but cap RPE at 7/10, focusing on quality reps and extended cooldown to stay aligned with ${metrics.goal}.`;

  const exerciseRationale = recoveryIsPoor
    ? "Active recovery protects your nervous system so muscles can rebuild before the next hard block."
    : "A measured stimulus maintains hypertrophy momentum while respecting current readiness.";

  const nutritionRecommendation =
    proteinGap > 0
      ? `Close the ${proteinGap}g protein gap with a vegetarian snack plate: 1 cup soy yogurt (18g), ½ cup roasted edamame (11g), and 2 Tbsp hemp hearts over greens (6g).`
      : "Protein intake meets today's target—layer in complex carbs (quinoa, chickpeas) to refuel glycogen before the next lift.";

  const nutritionRationale =
    proteinGap > 0
      ? "These portions add ~35g of complete protein plus micronutrients, accelerating muscle repair after HIIT."
      : "Balanced macros sustain training energy and keep muscle protein synthesis elevated.";

  const stressRecommendation = stressHigh
    ? `Do a 5-minute 4-7-8 breathing ladder: inhale 4s, hold 7s, exhale 8s for six cycles, then journal one task you can control tomorrow.`
    : `Maintain calm momentum with a 10-minute body-scan meditation tonight to reinforce solid sleep pressure.`;

  const stressRationale = stressHigh
    ? "Long exhales activate the vagus nerve, lowering anxiety so the next sleep cycle deepens."
    : "Mindfulness keeps cortisol in check, safeguarding recovery quality.";

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

