import { useStore } from '../../store/useStore';
import { useSession } from '../../hooks/useSession';

interface StatRow {
  label: string;
  count: number;
  color: string;
}

export function SessionSummary() {
  const questions = useStore(s => s.questions);
  const sessionCount = useStore(s => s.sessionCount);
  const currentSession = useStore(s => s.currentSession);
  const { startSession } = useSession();

  const records = Object.values(questions);
  const total = records.length;

  const counts = {
    new: records.filter(r => r.state === 'new').length,
    active: records.filter(r => r.state === 'active').length,
    near_mastery: records.filter(r => r.state === 'near_mastery').length,
    mastered: records.filter(r => r.state === 'mastered').length,
    maintenance: records.filter(r => r.state === 'maintenance').length,
  };

  const answered = currentSession?.queue.length ?? 0;

  const statRows: StatRow[] = [
    { label: 'New', count: counts.new, color: 'var(--color-text-muted)' },
    { label: 'Active', count: counts.active, color: 'var(--color-accent-blue)' },
    { label: 'Near Mastery', count: counts.near_mastery, color: '#F5A623' },
    { label: 'Mastered', count: counts.mastered, color: 'var(--color-state-correct)' },
    { label: 'Maintenance', count: counts.maintenance, color: 'var(--color-accent-purple)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Session complete header */}
      <div style={{ textAlign: 'center', paddingTop: '8px' }}>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '6px',
        }}>
          Session {sessionCount} Complete
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          {answered} questions answered this session
        </p>
      </div>

      {/* State distribution */}
      <div style={{
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '16px 20px',
      }}>
        <p style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '14px',
        }}>
          Question Mastery — {total} total
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {statRows.map(({ label, count, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>{label}</span>
              <span style={{ fontWeight: 600, color }}>
                {count}
                <span style={{ color: 'var(--color-text-faint)', fontWeight: 400, fontSize: '0.8125rem' }}>
                  {' '}/ {total}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Start New Session */}
      <button
        onClick={startSession}
        style={{
          padding: '14px 24px',
          borderRadius: '10px',
          background: 'var(--gradient-mode-1)',
          border: 'none',
          color: '#fff',
          fontFamily: 'inherit',
          fontSize: '0.9375rem',
          fontWeight: 600,
          cursor: 'pointer',
          minHeight: '44px',
        }}
      >
        Start New Session
      </button>
    </div>
  );
}
