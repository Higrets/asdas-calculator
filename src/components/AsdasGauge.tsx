// src/components/AsdasGauge.tsx
import { ASDAS_THRESHOLDS } from '../config/asdasConstants';

interface AsdasGaugeProps {
  score: number;
  maxScore?: number;
}

export function AsdasGauge({ score, maxScore = 10 }: AsdasGaugeProps) {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  const threshold1 = (ASDAS_THRESHOLDS.REMISSION / maxScore) * 100;
  const threshold2 = (ASDAS_THRESHOLDS.MODERATE / maxScore) * 100;
  const threshold3 = (ASDAS_THRESHOLDS.HIGH / maxScore) * 100;

  return (
    <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #dee2e6' }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
        Шкала активности заболевания
      </h4>
      
      <div style={{ position: 'relative', height: '32px', borderRadius: '4px', overflow: 'hidden', display: 'flex', border: '1px solid #dee2e6' }}>
        <div style={{ flex: threshold1, background: '#ecf0f1' }} />
        <div style={{ flex: threshold2 - threshold1, background: '#bdc3c7' }} />
        <div style={{ flex: threshold3 - threshold2, background: '#95a5a6' }} />
        <div style={{ flex: 100 - threshold3, background: '#7f8c8d' }} />
        
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '10px solid #2c3e50',
            transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        <div style={{ position: 'absolute', top: '50%', left: `${threshold1}%`, transform: 'translate(-50%, -50%)', color: '#2c3e50', fontSize: '0.7rem', fontWeight: '600' }}>
          1.3
        </div>
        <div style={{ position: 'absolute', top: '50%', left: `${threshold2}%`, transform: 'translate(-50%, -50%)', color: '#2c3e50', fontSize: '0.7rem', fontWeight: '600' }}>
          2.1
        </div>
        <div style={{ position: 'absolute', top: '50%', left: `${threshold3}%`, transform: 'translate(-50%, -50%)', color: 'white', fontSize: '0.7rem', fontWeight: '600' }}>
          3.5
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: '#7f8c8d' }}>
        <span>Ремиссия</span>
        <span>Умеренная</span>
        <span>Высокая</span>
        <span>Очень высокая</span>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '2rem', fontWeight: '600', color: '#2c3e50' }}>
        {score.toFixed(2)}
      </div>
    </div>
  );
}