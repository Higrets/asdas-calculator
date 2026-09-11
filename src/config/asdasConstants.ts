// src/config/asdasConstants.ts

// Пороговые значения активности заболевания по консенсусу ASAS
export const ASDAS_THRESHOLDS = {
  REMISSION: 1.3,       // < 1.3: Неактивное заболевание
  MODERATE: 2.1,        // 1.3 - 2.1: Умеренная активность
  HIGH: 3.5,            // 2.1 - 3.5: Высокая активность
  // > 3.5: Очень высокая активность
};

// Коэффициенты для формулы ASDAS-CRP 
export const ASDAS_WEIGHTS = {
  BACK_PAIN: 0.12,
  MORNING_STIFFNESS: 0.06,
  PATIENT_GLOBAL: 0.11,
  PERIPHERAL_PAIN_SWELLING: 0.07,
  CRP_LOG_MULTIPLIER: 0.58,
};