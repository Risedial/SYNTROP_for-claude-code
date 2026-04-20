import React from 'react';
import { SyncControls } from './SyncControls';

export function SettingsTab() {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px 20px',
    maxWidth: 'var(--max-content-width)',
    margin: '0 auto',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: 'var(--color-text-primary)',
    margin: '0 0 4px',
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
  };

  const aboutCardStyle: React.CSSProperties = {
    background: 'var(--color-bg-surface)',
    borderRadius: '12px',
    padding: 'var(--padding-card)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const aboutRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const aboutLabelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted)',
  };

  const aboutValueStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--color-text-primary)',
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Settings</h2>

      <div>
        <div style={sectionLabelStyle}>Cloud Backup</div>
        <SyncControls />
      </div>

      <div>
        <div style={sectionLabelStyle}>About</div>
        <div style={aboutCardStyle}>
          <div style={aboutRowStyle}>
            <span style={aboutLabelStyle}>Certification</span>
            <span style={aboutValueStyle}>Alberta Standard First Aid Level C</span>
          </div>
          <div style={aboutRowStyle}>
            <span style={aboutLabelStyle}>Provider</span>
            <span style={aboutValueStyle}>St. John Ambulance Alberta</span>
          </div>
          <div style={aboutRowStyle}>
            <span style={aboutLabelStyle}>Questions</span>
            <span style={aboutValueStyle}>146</span>
          </div>
          <div style={aboutRowStyle}>
            <span style={aboutLabelStyle}>Skills</span>
            <span style={aboutValueStyle}>12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
