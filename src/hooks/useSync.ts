import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import type { QuestionRecord } from '../types/algorithm';

const SYNC_INTERVAL_MS = 60_000;

export function useSync() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const { isDirty, deviceId, questions } = useStore.getState();
      if (!isDirty) return;
      try {
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId, data: JSON.stringify(questions) }),
        });
        if (res.ok) {
          const json = (await res.json()) as { ok: boolean; syncedAt: string };
          useStore.getState().markClean(json.syncedAt);
        }
      } catch {
        // Non-blocking; isDirty remains true; will retry on next interval
      }
    }, SYNC_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  async function manualSave(): Promise<void> {
    const { deviceId, questions } = useStore.getState();
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, data: JSON.stringify(questions) }),
    });
    if (!res.ok) throw new Error('sync_failed');
    const json = (await res.json()) as { ok: boolean; syncedAt: string };
    useStore.getState().markClean(json.syncedAt);
  }

  async function restoreBackup(): Promise<void> {
    const { deviceId, questions } = useStore.getState();
    const res = await fetch(
      `/api/sync?deviceId=${encodeURIComponent(deviceId)}`
    );
    if (!res.ok) throw new Error('fetch_failed');
    const json = (await res.json()) as {
      data: string | null;
      syncedAt: string | null;
    };
    if (json.data === null) {
      throw new Error('no_backup_found');
    }
    const restoredQuestions = JSON.parse(json.data) as Record<
      string,
      QuestionRecord
    >;
    // Merge: restored questions overwrite local for matching IDs
    const merged = { ...questions, ...restoredQuestions };
    const { updateQuestion, markClean } = useStore.getState();
    for (const [id, record] of Object.entries(merged)) {
      updateQuestion(id, record);
    }
    if (json.syncedAt) {
      markClean(json.syncedAt);
    }
  }

  return { manualSave, restoreBackup };
}
