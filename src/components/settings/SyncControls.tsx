import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { useSync } from '../../hooks/useSync';

type SyncStatus = 'idle' | 'saving' | 'saved' | 'error' | 'restoring' | 'restored' | 'restore_error' | 'no_backup';

export function SyncControls() {
  const { manualSave, restoreBackup } = useSync();
  const lastSyncAt = useStore((s) => s.lastSyncAt);
  const [status, setStatus] = useState<SyncStatus>('idle');
  const [showConfirm, setShowConfirm] = useState(false);

  // Clear status messages after 4s
  useEffect(() => {
    if (status === 'idle' || status === 'saving' || status === 'restoring') return;
    const timer = setTimeout(() => setStatus('idle'), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleSave() {
    setStatus('saving');
    try {
      await manualSave();
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  }

  async function handleRestore() {
    setShowConfirm(false);
    setStatus('restoring');
    try {
      await restoreBackup();
      setStatus('restored');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      setStatus(msg === 'no_backup_found' ? 'no_backup' : 'restore_error');
    }
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-bg-surface)',
    borderRadius: '12px',
    padding: 'var(--padding-card)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
  };

  const subStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    marginTop: '2px',
  };

  const btnBase: React.CSSProperties = {
    border: 'none',
    borderRadius: '8px',
    padding: '10px 18px',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    minWidth: '80px',
    transition: 'opacity 0.15s',
  };

  const saveBtn: React.CSSProperties = {
    ...btnBase,
    background: 'var(--gradient-mode-1)',
    color: '#fff',
    opacity: status === 'saving' ? 0.6 : 1,
  };

  const restoreBtn: React.CSSProperties = {
    ...btnBase,
    background: 'var(--color-bg-elevated)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
    opacity: status === 'restoring' ? 0.6 : 1,
  };

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    background: 'var(--color-divider)',
  };

  const statusMsgStyle: React.CSSProperties = {
    fontSize: '0.8125rem',
    color:
      status === 'saved' || status === 'restored'
        ? 'var(--color-state-correct)'
        : status === 'error' || status === 'restore_error'
        ? 'var(--color-state-incorrect)'
        : status === 'no_backup'
        ? 'var(--color-text-muted)'
        : 'var(--color-text-muted)',
    minHeight: '18px',
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: '20px',
  };

  const modalStyle: React.CSSProperties = {
    background: 'var(--color-bg-elevated)',
    borderRadius: '16px',
    padding: '24px 20px',
    maxWidth: '320px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const modalTitleStyle: React.CSSProperties = {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '1.0625rem',
    color: 'var(--color-text-primary)',
  };

  const modalBodyStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
  };

  const modalRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
  };

  const cancelBtn: React.CSSProperties = {
    ...btnBase,
    flex: 1,
    background: 'var(--color-bg-surface)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
  };

  const confirmBtn: React.CSSProperties = {
    ...btnBase,
    flex: 1,
    background: 'var(--color-state-incorrect)',
    color: '#fff',
  };

  function formatSyncTime(iso: string | null): string {
    if (!iso) return 'Never';
    try {
      return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Unknown';
    }
  }

  function statusMessage(): string {
    switch (status) {
      case 'saving': return 'Saving…';
      case 'saved': return 'Saved successfully';
      case 'error': return 'Save failed — check your connection';
      case 'restoring': return 'Restoring…';
      case 'restored': return 'Data restored from backup';
      case 'restore_error': return 'Restore failed — check your connection';
      case 'no_backup': return 'No backup found for this device';
      default: return '';
    }
  }

  return (
    <>
      <div style={cardStyle}>
        {/* Save row */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>Save to Cloud</div>
            <div style={subStyle}>Last synced: {formatSyncTime(lastSyncAt)}</div>
          </div>
          <button
            style={saveBtn}
            onClick={handleSave}
            disabled={status === 'saving'}
          >
            {status === 'saving' ? 'Saving…' : 'Save'}
          </button>
        </div>

        <div style={dividerStyle} />

        {/* Restore row */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>Restore Backup</div>
            <div style={subStyle}>Replace local data with cloud copy</div>
          </div>
          <button
            style={restoreBtn}
            onClick={() => setShowConfirm(true)}
            disabled={status === 'restoring'}
          >
            Restore
          </button>
        </div>

        {/* Status message */}
        <div style={statusMsgStyle}>{statusMessage()}</div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div style={modalOverlayStyle} onClick={() => setShowConfirm(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalTitleStyle}>Restore from backup?</div>
            <div style={modalBodyStyle}>
              This will replace your local progress with the last cloud backup. This cannot be undone.
            </div>
            <div style={modalRowStyle}>
              <button style={cancelBtn} onClick={() => setShowConfirm(false)}>Cancel</button>
              <button style={confirmBtn} onClick={handleRestore}>Restore</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
