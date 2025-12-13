export type HealthMetrics = {
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

export type Insights = {
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

