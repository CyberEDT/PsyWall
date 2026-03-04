import React from 'react';

/**
 * Extension Popup UI
 * (Standalone UI component for the Chrome Extension)
 */
const PopupUI = () => {
    return (
        <div style={{ padding: '16px', minWidth: '300px', backgroundColor: '#0a0a0b', color: '#e2e8f0' }}>
            <h1 style={{ fontSize: '18px', fontWeight: '900', color: '#3b82f6' }}>PSYWALL</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Real-time scan active</p>
            <button style={{ width: '100%', marginTop: '12px', padding: '8px', borderRadius: '4px', border: 'none', background: '#3b82f6', color: 'white' }}>
                SCAN PAGE
            </button>
        </div>
    );
};

export default PopupUI;
