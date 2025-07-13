'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './drawingCanvas.module.css';

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000');

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctxRef.current = ctx;
  }, [color]);

  const startDraw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDraw = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={styles.container}>
      <h2>🎨 Drawing Canvas</h2>
      <div className={styles.toolbar}>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button onClick={clearCanvas}>🧽 Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        className={styles.canvas}
      />
    </div>
  );
}
