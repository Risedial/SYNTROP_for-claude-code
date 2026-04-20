import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppStore } from '../types/store';
import type { QuestionRecord } from '../types/algorithm';
import type { SessionRecord } from '../types/session';

interface StoreWithActions extends AppStore {
  // Device
  setDeviceId: (id: string) => void;

  // Navigation
  setActiveTab: (tab: 0 | 1 | 2 | 3) => void;

  // Session
  setCurrentSession: (session: SessionRecord | null) => void;
  incrementSessionCount: () => void;

  // Questions
  updateQuestion: (id: string, record: QuestionRecord) => void;
  initializeQuestions: (questionIds: string[]) => void;

  // Sync
  markDirty: () => void;
  markClean: (syncedAt: string) => void;

  // UI
  dismissIOSBanner: () => void;
  setSkillsExpanded: (id: string | null) => void;
}

export const useStore = create<StoreWithActions>()(
  persist(
    (set) => ({
      // Initial state
      deviceId: '',
      activeTab: 0,
      questions: {},
      sessionCount: 0,
      currentSession: null,
      lastSyncAt: null,
      isDirty: false,
      iosInstallDismissed: false,
      skillsExpandedId: null,

      // Actions
      setDeviceId: (id) => set({ deviceId: id }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setCurrentSession: (session) => set({ currentSession: session }),
      incrementSessionCount: () => set((s) => ({ sessionCount: s.sessionCount + 1 })),
      updateQuestion: (id, record) =>
        set((s) => ({ questions: { ...s.questions, [id]: record }, isDirty: true })),
      initializeQuestions: (questionIds) =>
        set((s) => {
          const questions = { ...s.questions };
          for (const id of questionIds) {
            if (!questions[id]) {
              questions[id] = {
                id,
                state: 'new',
                consecutiveCorrect: 0,
                correctSessionIds: [],
                recentExposures: [],
                masteredAt: null,
                lastMaintenanceSession: null,
                totalAttempts: 0,
                totalCorrect: 0,
                firstSeenSession: null,
              };
            }
          }
          return { questions };
        }),
      markDirty: () => set({ isDirty: true }),
      markClean: (syncedAt) => set({ isDirty: false, lastSyncAt: syncedAt }),
      dismissIOSBanner: () => set({ iosInstallDismissed: true }),
      setSkillsExpanded: (id) => set({ skillsExpandedId: id }),
    }),
    {
      name: 'fap_store',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, _version: number) => {
        // v0 → v1: initial schema (no migration needed)
        return persistedState as AppStore;
      },
    }
  )
);
