import React from 'react';
import { useStore } from '../../store/useStore';
import { StudyTab } from '../study/StudyTab';
import { SkillsTab } from '../skills/SkillsTab';
import { ProgressTab } from '../progress/ProgressTab';
import { SettingsTab } from '../settings/SettingsTab';
import { BottomNav } from './BottomNav';

// AppShell: all 4 tabs are always mounted; visibility toggled via CSS display:none
// This preserves component state (scroll position, expanded accordion, session) across tab switches.

const BOTTOM_NAV_HEIGHT = 64;

export function AppShell() {
  const activeTab = useStore((s) => s.activeTab);

  const shellStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    background: 'var(--color-bg-base)',
    overflow: 'hidden',
  };

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom, 0px))`,
    WebkitOverflowScrolling: 'touch',
  };

  function tabStyle(tabIndex: number): React.CSSProperties {
    return {
      display: activeTab === tabIndex ? 'block' : 'none',
      minHeight: '100%',
    };
  }

  return (
    <div style={shellStyle}>
      <div style={contentAreaStyle}>
        <div style={tabStyle(0)}><StudyTab /></div>
        <div style={tabStyle(1)}><SkillsTab /></div>
        <div style={tabStyle(2)}><ProgressTab /></div>
        <div style={tabStyle(3)}><SettingsTab /></div>
      </div>
      <BottomNav />
    </div>
  );
}
