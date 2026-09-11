// src/utils/calculateAsdas.ts
import { ASDAS_WEIGHTS, ASDAS_THRESHOLDS } from '../config/asdasConstants';

export interface AsdasInputs {
  backPain: number;             // 0-10 (ВАШ)
  morningStiffness: number;     // 0-10 (ВАШ)
  patientGlobal: number;        // 0-10 (ВАШ)
  peripheralPain: number;       // 0-10 (ВАШ)
  crp: number;                  // мг/л или мг/дл (должно быть >= 0)
}

export interface AsdasResult {
  score: number;
  level: 'remission' | 'moderate' | 'high' | 'very_high';
  text: string;
  color: string;
}

export const calculateASDAS_CRP = (inputs: AsdasInputs): AsdasResult => {
  // Формула: 0.12*боль в спине + 0.06*утренняя скованность + 0.11*общая оценка + 0.07*периферическая боль + 0.58*ln(СРБ + 1)
  const rawScore = 
    ASDAS_WEIGHTS.BACK_PAIN * inputs.backPain +
    ASDAS_WEIGHTS.MORNING_STIFFNESS * inputs.morningStiffness +
    ASDAS_WEIGHTS.PATIENT_GLOBAL * inputs.patientGlobal +
    ASDAS_WEIGHTS.PERIPHERAL_PAIN_SWELLING * inputs.peripheralPain +
    ASDAS_WEIGHTS.CRP_LOG_MULTIPLIER * Math.log(inputs.crp + 1);

  const score = Number(rawScore.toFixed(2)); // Округляем до 2 знаков, как в клинической практике

  // Интерпретация по порогам ASAS
  if (score < ASDAS_THRESHOLDS.REMISSION) {
    return { score, level: 'remission', text: 'Неактивное заболевание', color: '#4caf50' }; // Зеленый
  }
  if (score < ASDAS_THRESHOLDS.MODERATE) {
    return { score, level: 'moderate', text: 'Умеренная активность', color: '#ffeb3b' }; // Желтый
  }
  if (score <= ASDAS_THRESHOLDS.HIGH) {
    return { score, level: 'high', text: 'Высокая активность', color: '#ff9800' }; // Оранжевый
  }
  
  return { score, level: 'very_high', text: 'Очень высокая активность', color: '#f44336' }; // Красный
};