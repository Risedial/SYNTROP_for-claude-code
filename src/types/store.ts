import type { QuestionRecord } from './algorithm';
import type { SessionRecord } from './session';

export interface AppStore {
  // ─── Device Identity ───
  deviceId: string;

  // ─── Navigation ───
  activeTab: 0 | 1 | 2 | 3;   // 0=Study, 1=Skills, 2=Progress, 3=Settings

  // ─── Algorithm State (persisted) ───
  questions: Record<string, QuestionRecord>;
  sessionCount: number;              // total completed sessions, increments on session end

  // ─── Active Session (persisted mid-session, cleared on complete) ───
  currentSession: SessionRecord | null;

  // ─── Sync State (persisted) ───
  lastSyncAt: string | null;
  isDirty: boolean;

  // ─── UI Preferences (persisted) ───
  iosInstallDismissed: boolean;
  skillsExpandedId: string | null;   // currently expanded skill in Skills tab
}

// Zustand persist config (not part of store shape)
// name: 'fap_store'
// version: 1
// migrate: (persistedState, version) => { ...migrations }
