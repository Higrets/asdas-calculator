// src/components/RatingScale.tsx
import { useState } from 'react';

interface RatingScaleProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
  hints?: string[];
  disabled?: boolean;
}

export function RatingScale({ 
  label, 
  value, 
  onChange, 
  max = 10,
  leftLabel = 'Нет',
  rightLabel = 'Очень сильно',
  hints = [],
  disabled = false
}: RatingScaleProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const displayValue = hoveredValue !== null ? hoveredValue : value;

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {/* Заголовок с кнопкой подсказки */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          <label style={{ 
            fontWeight: '500', 
            color: '#2c3e50', 
            fontSize: '0.95rem',
          }}>
            {label}
          </label>
          
          {hints.length > 0 && (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              disabled={disabled}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '1px solid #95a5a6',
                backgroundColor: 'transparent',
                color: '#95a5a6',
                fontWeight: '500',
                fontSize: '0.75rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                opacity: disabled ? 0.5 : 1,
              }}
              onMouseOver={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = '#95a5a6';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#95a5a6';
              }}
              aria-label="Показать подсказку"
            >
              ?
            </button>
          )}
        </div>

        <div style={{
          padding: '0.35rem 0.75rem',
          backgroundColor: '#f8f9fa',
          color: '#2c3e50',
          borderRadius: '4px',
          fontWeight: '600',
          fontSize: '0.95rem',
          border: '1px solid #dee2e6',
          minWidth: '50px',
          textAlign: 'center',
        }}>
          {displayValue}
        </div>
      </div>

      {/* Шкала с кружками */}
      <div style={{ position: 'relative', padding: '0.5rem 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          position: 'relative',
        }}>
          {Array.from({ length: max + 1 }, (_, i) => {
            const isSelected = i === value;
            const isHovered = i === hoveredValue;
            
            return (
              <button
                key={i}
                type="button"
                onClick={() => !disabled && onChange(i)}
                onMouseEnter={() => !disabled && setHoveredValue(i)}
                onMouseLeave={() => setHoveredValue(null)}
                disabled={disabled}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: `1.5px solid ${isSelected ? '#2c3e50' : '#bdc3c7'}`,
                  backgroundColor: isSelected ? '#2c3e50' : (isHovered && !disabled ? '#ecf0f1' : 'white'),
                  color: isSelected ? 'white' : '#2c3e50',
                  fontWeight: isSelected ? '600' : '500',
                  fontSize: '0.85rem',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  opacity: disabled ? 0.7 : 1,
                }}
                aria-label={`Оценка ${i} из ${max}`}
              >
                {i}
              </button>
            );
          })}
        </div>

        {/* Подписи краёв шкалы */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#7f8c8d',
          fontStyle: 'italic',
        }}>
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>

      {/* Модальное окно с подсказками */}
      {showHint && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setShowHint(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              animation: 'slideUp 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #dee2e6', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.2rem', fontWeight: '600' }}>
                Подсказка: {label}
              </h3>
              <button
                onClick={() => setShowHint(false)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6',
                  backgroundColor: 'white',
                  color: '#7f8c8d',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {hints.map((hint, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '0.75rem',
                    backgroundColor: index === value ? '#f8f9fa' : 'white',
                    borderRadius: '6px',
                    border: `1px solid ${index === value ? '#2c3e50' : '#dee2e6'}`,
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: index === value ? '#2c3e50' : '#f8f9fa',
                      color: index === value ? 'white' : '#2c3e50',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: `1px solid ${index === value ? '#2c3e50' : '#dee2e6'}`,
                    }}
                  >
                    {index}
                  </div>
                  <span style={{ 
                    color: '#2c3e50', 
                    fontSize: '0.9rem', 
                    lineHeight: '1.5',
                    textAlign: 'left',
                    flex: 1,
                  }}>
                    {hint}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}   