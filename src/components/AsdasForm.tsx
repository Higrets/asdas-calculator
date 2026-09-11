// src/components/AsdasForm.tsx
import { useState } from 'react';
import { calculateASDAS_CRP } from '../utils/calculateAsdas';
import { AsdasGauge } from './AsdasGauge';
import { RatingScale } from './RatingScale';

const HINTS = {
  backPain: [
    'Боль полностью отсутствует',
    'Еле заметный дискомфорт, почти не мешает',
    'Лёгкая боль, не ограничивает движения',
    'Умеренная боль, замечаю в течение дня',
    'Боль заметна, мешает концентрации',
    'Сильная боль, ограничивает движения',
    'Боль мешает выполнять обычные дела',
    'Очень сильная боль, трудно двигаться',
    'Тяжёлая боль, почти не могу двигаться',
    'Невыносимая боль, не могу заниматься ничем',
    'Максимальная боль, которую можно представить',
  ],
  morningStiffness: [
    'Скованность полностью отсутствует',
    'Лёгкая скованность, проходит за 5 минут',
    'Небольшая скованность, проходит за 15 минут',
    'Умеренная скованность, проходит за 30 минут',
    'Заметная скованность, проходит за 1 час',
    'Сильная скованность, проходит за 2 часа',
    'Тяжёлая скованность, проходит за 3-4 часа',
    'Очень тяжёлая скованность, проходит за 5-6 часов',
    'Крайне тяжёлая скованность, проходит за 7-8 часов',
    'Скованность длится почти весь день (9-11 часов)',
    'Скованность длится весь день или более 12 часов',
  ],
  patientGlobal: [
    'Заболевание полностью неактивно, чувствую себя отлично',
    'Почти не чувствую симптомов',
    'Минимальные симптомы, не мешают жизни',
    'Лёгкая активность, иногда замечаю симптомы',
    'Умеренная активность, симптомы заметны',
    'Заметная активность, влияет на повседневную жизнь',
    'Высокая активность, сильно ограничивает меня',
    'Очень высокая активность, трудно выполнять дела',
    'Тяжёлая активность, почти не могу заниматься ничем',
    'Крайне тяжёлая активность, постоянные симптомы',
    'Максимальная активность, полное ограничение',
  ],
  peripheralPain: [
    'Нет боли или отёка в периферических суставах',
    'Минимальный дискомфорт, почти незаметен',
    'Лёгкая боль, не мешает движениям',
    'Умеренная боль в 1-2 суставах',
    'Заметная боль, ограничивает некоторые движения',
    'Сильная боль в нескольких суставах',
    'Очень сильная боль, трудно двигать суставами',
    'Тяжёлая боль с заметным отёком',
    'Крайне тяжёлая боль, почти не могу двигать суставами',
    'Невыносимая боль, множественные суставы поражены',
    'Максимальная боль, полная потеря функции суставов',
  ],
};

export function AsdasForm() {
  const [inputs, setInputs] = useState({
    backPain: 0,
    morningStiffness: 0,
    patientGlobal: 0,
    peripheralPain: 0,
    crp: 0,
  });

  const [crpDisplay, setCrpDisplay] = useState('0');
  const [crpError, setCrpError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScaleChange = (field: string, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
  };

  const handleCrpChange = (value: string) => {
    setCrpDisplay(value);
    
    // Валидация: проверка на отрицательные значения
    if (value === '') {
      setCrpError(null);
      const newInputs = { ...inputs, crp: 0 };
      setInputs(newInputs);
      return;
    }

    const numValue = Number(value);
    
    if (numValue < 0) {
      setCrpError('Значение не может быть отрицательным');
      return;
    }

    setCrpError(null);
    const newInputs = { ...inputs, crp: numValue };
    setInputs(newInputs);
  };

  const handleShowResult = () => {
    // Проверка валидности данных перед расчётом
    if (crpError) {
      return;
    }

    const calculatedResult = calculateASDAS_CRP(inputs);
    setResult(calculatedResult);
    setShowResult(true);
    
    setTimeout(() => {
      const resultElement = document.getElementById('asdas-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleRecalculate = () => {
    setShowResult(false);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    const resetInputs = { backPain: 0, morningStiffness: 0, patientGlobal: 0, peripheralPain: 0, crp: 0 };
    setInputs(resetInputs);
    setCrpDisplay('0');
    setCrpError(null);
    setResult(null);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ 
      maxWidth: '750px', 
      margin: '2rem auto', 
      padding: '2.5rem', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e9ecef',
    }}>
      {/* Шапка с описанием */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2.5rem', 
        borderBottom: '1px solid #dee2e6', 
        paddingBottom: '1.5rem' 
      }}>
        <h1 style={{ 
          margin: '0 0 0.75rem 0', 
          color: '#2c3e50', 
          fontSize: '1.6rem', 
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }}>
          Калькулятор индекса ASDAS-CRP
        </h1>
        <p style={{ 
          margin: '0 0 1rem 0', 
          color: '#7f8c8d', 
          fontSize: '0.9rem',
          fontStyle: 'italic'
        }}>
          Ankylosing Spondylitis Disease Activity Score
        </p>
        
        {/* Описание калькулятора */}
        <div style={{
          margin: '1.5rem auto 0',
          maxWidth: '600px',
          padding: '1rem 1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          borderLeft: '3px solid #2c3e50',
          textAlign: 'left',
        }}>
          <p style={{ 
            margin: 0, 
            color: '#2c3e50', 
            fontSize: '0.85rem', 
            lineHeight: '1.6' 
          }}>
            <strong>Назначение:</strong> Инструмент для оценки активности аксиального спондилоартрита 
            на основе субъективных данных пациента и объективного маркера воспаления (С-реактивный белок). 
            Используется для мониторинга эффективности терапии и принятия клинических решений.
          </p>
        </div>
      </div>
      
      {/* Секция: Субъективные данные пациента */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          borderLeft: '3px solid #2c3e50',
        }}>
          <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '0.95rem', fontWeight: '600' }}>
            Субъективные данные пациента (шкала 0-10)
          </h3>
        </div>
        
        <RatingScale
          label="Боль в спине"
          value={inputs.backPain}
          onChange={(v) => handleScaleChange('backPain', v)}
          leftLabel="Нет боли"
          rightLabel="Невыносимая боль"
          hints={HINTS.backPain}
          disabled={showResult}
        />

        <RatingScale
          label="Продолжительность утренней скованности"
          value={inputs.morningStiffness}
          onChange={(v) => handleScaleChange('morningStiffness', v)}
          leftLabel="Отсутствует"
          rightLabel="Весь день"
          hints={HINTS.morningStiffness}
          disabled={showResult}
        />

        <RatingScale
          label="Общая оценка активности заболевания пациентом"
          value={inputs.patientGlobal}
          onChange={(v) => handleScaleChange('patientGlobal', v)}
          leftLabel="Неактивно"
          rightLabel="Очень активно"
          hints={HINTS.patientGlobal}
          disabled={showResult}
        />

        <RatingScale
          label="Боль и/или отёчность периферических суставов"
          value={inputs.peripheralPain}
          onChange={(v) => handleScaleChange('peripheralPain', v)}
          leftLabel="Нет"
          rightLabel="Очень сильно"
          hints={HINTS.peripheralPain}
          disabled={showResult}
        />
      </div>

      {/* Секция: Объективные лабораторные данные */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          marginBottom: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          borderLeft: '3px solid #2c3e50',
        }}>
          <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '0.95rem', fontWeight: '600' }}>
            Объективные лабораторные данные
          </h3>
        </div>
        
        <label style={{ display: 'block' }}>
          <span style={{ fontWeight: '500', color: '#2c3e50', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'block' }}>
            С-реактивный белок (СРБ), мг/л
          </span>
          <input 
            type="number" 
            min="0" 
            step="0.1"
            placeholder="0"
            value={crpDisplay} 
            onChange={(e) => handleCrpChange(e.target.value)}
            disabled={showResult}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: `1px solid ${crpError ? '#e74c3c' : '#dee2e6'}`,
              fontSize: '1rem',
              transition: 'all 0.2s',
              backgroundColor: showResult ? '#f8f9fa' : '#fff',
              color: '#2c3e50',
              cursor: showResult ? 'not-allowed' : 'text',
            }}
            onFocus={(e) => {
              if (!showResult && !crpError) {
                e.currentTarget.style.borderColor = '#2c3e50';
              }
            }}
            onBlur={(e) => {
              if (!crpError) {
                e.currentTarget.style.borderColor = '#dee2e6';
              }
            }}
          />
          
          {/* Сообщение об ошибке */}
          {crpError && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#fee',
              border: '1px solid #e74c3c',
              borderRadius: '4px',
              color: '#c0392b',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ fontWeight: '600' }}>⚠</span>
              <span>{crpError}</span>
            </div>
          )}
          
          {!crpError && (
            <span style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: '0.25rem', display: 'block' }}>
              Норма: менее 5 мг/л
            </span>
          )}
        </label>
      </div>

      {/* Кнопка "Показать результат" */}
      {!showResult && (
        <button 
          onClick={handleShowResult}
          disabled={!!crpError}
          style={{ 
            width: '100%', 
            padding: '1rem', 
            backgroundColor: crpError ? '#bdc3c7' : '#2c3e50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: crpError ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s',
            opacity: crpError ? 0.6 : 1,
          }}
          onMouseOver={(e) => {
            if (!crpError) {
              e.currentTarget.style.backgroundColor = '#34495e';
            }
          }}
          onMouseOut={(e) => {
            if (!crpError) {
              e.currentTarget.style.backgroundColor = '#2c3e50';
            }
          }}
        >
          Показать результат
        </button>
      )}

      {/* Результат */}
      {showResult && result && (
        <div id="asdas-result" style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          borderRadius: '6px', 
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          animation: 'fadeIn 0.5s ease',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ 
              fontSize: '2.5rem', 
              color: '#2c3e50',
              fontWeight: '300',
            }}>
              {result.level === 'remission' ? '✓' : 
               result.level === 'moderate' ? '≈' : 
               result.level === 'high' ? '↑' : '⚠'}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#2c3e50', fontWeight: '600' }}>
                {result.text}
              </h3>
              <p style={{ margin: '0.25rem 0 0 0', color: '#7f8c8d', fontSize: '0.85rem' }}>
                Итоговый балл ASDAS
              </p>
            </div>
          </div>

          <AsdasGauge score={result.score} />

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '4px', fontSize: '0.85rem', color: '#2c3e50', border: '1px solid #dee2e6' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Клиническая интерпретация:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Изменение на ≥ 1.1 — клинически значимое улучшение</li>
              <li>Изменение на ≥ 2.0 — значительное улучшение</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button 
              onClick={handleRecalculate}
              style={{ 
                flex: 1,
                padding: '0.85rem', 
                backgroundColor: '#2c3e50', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#34495e';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#2c3e50';
              }}
            >
              Рассчитать заново
            </button>
            <button 
              onClick={handleReset}
              style={{ 
                flex: 1,
                padding: '0.85rem', 
                backgroundColor: 'white', 
                color: '#2c3e50', 
                border: '1px solid #2c3e50', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              Сбросить все данные
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        button:focus-visible {
          outline: 2px solid #2c3e50;
          outline-offset: 2px;
        }
        input:disabled {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}