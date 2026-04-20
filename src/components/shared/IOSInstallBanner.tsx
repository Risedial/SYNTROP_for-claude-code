import React from 'react';
import { useStore } from '../../store/useStore';

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isStandalone(): boolean {
  return (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export function IOSInstallBanner() {
  const iosInstallDismissed = useStore((s) => s.iosInstallDismissed);
  const dismissIOSBanner = useStore((s) => s.dismissIOSBanner);

  // Only show on iOS Safari when not already installed and not dismissed
  if (!isIOS() || isStandalone() || iosInstallDismissed) {
    return null;
  }

  const bannerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 'calc(64px + env(safe-area-inset-bottom, 0px))',
    left: '12px',
    right: '12px',
    background: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border)',
    borderRadius: '14px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    zIndex: 150,
    boxShadow: 'var(--shadow-float)',
  };

  const textBlockStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    lineHeight: 1.4,
  };

  const dismissBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '1.25rem',
    lineHeight: 1,
    cursor: 'pointer',
    padding: '4px',
    minWidth: '28px',
    minHeight: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const shareIconStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    flexShrink: 0,
  };

  return (
    <div style={bannerStyle} role="banner">
      <span style={shareIconStyle}>⬆️</span>
      <div style={textBlockStyle}>
        <div style={titleStyle}>Install this app</div>
        <div style={bodyStyle}>Tap Share → Add to Home Screen</div>
      </div>
      <button
        style={dismissBtnStyle}
        onClick={dismissIOSBanner}
        aria-label="Dismiss install prompt"
      >
        ✕
      </button>
    </div>
  );
}
