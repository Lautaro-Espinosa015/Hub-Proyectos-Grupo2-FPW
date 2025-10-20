import React from 'react';

export default function HUB({ puntaje, mensaje }) {
  const containerStyle = { marginBottom: 12, textAlign: 'left' };
  const scoreStyle = { margin: 0, fontSize: 16 };
  const msgStyle = { margin: '8px 0 0', color: '#ffd700' };

  return (
    <div style={containerStyle}>
      <p style={scoreStyle}>Puntaje: <strong>{puntaje}</strong></p>
      {mensaje && <h2 style={msgStyle}>{mensaje}</h2>}
    </div>
  );
}