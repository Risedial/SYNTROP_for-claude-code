import React from 'react';
import { useStore } from '../../store/useStore';

const TABS: Array<{ label: string; icon: string }> = [
  { label: 'Study',    icon: '📖' },
  { label: 'Skills',   icon: '🩺' },
  { label: 'Progress', icon: '📊' },
  { label: 'Settings', icon: '⚙️' },
];

export function BottomNav() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    background: 'var(--color-bg-surface)',
    borderTop: '1px solid var(--color-divider)',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    zIndex: 100,
  };

  function itemStyle(): React.CSSProperties {
    return {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '44px',
      paddingTop: '10px',
      paddingBottom: '10px',
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      gap: '3px',
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
    };
  }

  function iconStyle(isActive: boolean): React.CSSProperties {
    return {
      fontSize: '1.25rem',
      lineHeight: 1,
      opacity: isActive ? 1 : 0.45,
      transition: 'opacity 0.15s',
    };
  }

  function labelStyle(isActive: boolean): React.CSSProperties {
    return {
      fontSize: '0.625rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase' as const,
      color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-faint)',
      transition: 'color 0.15s',
    };
  }

  const activeIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: '2px',
    borderRadius: '0 0 2px 2px',
    background: 'var(--gradient-mode-1)',
  };

  return (
    <nav style={navStyle} aria-label="Main navigation">
      {TABS.map((tab, index) => {
        const isActive = activeTab === index;
        return (
          <button
            key={tab.label}
            style={itemStyle()}
            onClick={() => setActiveTab(index as 0 | 1 | 2 | 3)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && <div style={activeIndicatorStyle} />}
            <span style={iconStyle(isActive)}>{tab.icon}</span>
            <span style={labelStyle(isActive)}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
