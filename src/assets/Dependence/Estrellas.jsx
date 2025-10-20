import React from 'react';

export default function Star({ posicion, onClick }) {
  const style = {
    position: 'absolute',
    top: `${posicion.y}%`,
    left: `${posicion.x}%`,
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    fontSize: '2.2rem',
    userSelect: 'none',
    transition: 'transform 0.12s ease',
  };

  return (
    <div
      className="estrella"
      style={style}
      onClick={onClick}
      role="button"
      aria-label="estrella"
    >
      ★
    </div>
  );
}