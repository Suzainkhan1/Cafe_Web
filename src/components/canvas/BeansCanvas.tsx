"use client";

import { useEffect, useRef } from "react";

interface Bean {
  x: number; y: number;
  size: number;
  angle: number; rotSpeed: number;
  vx: number; vy: number;
  alpha: number; alphaMax: number;
  phase: number; sway: number;
}

function createBean(W: number, H: number): Bean {
  return {
    x: Math.random() * W,
    y: H + 40,
    size:     Math.random() * 12 + 6,
    angle:    Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    vx:       (Math.random() - 0.5) * 0.4,
    vy:       -(Math.random() * 0.6 + 0.3),
    alpha:    0,
    alphaMax: Math.random() * 0.5 + 0.15,
    phase:    Math.random() * Math.PI * 2,
    sway:     Math.random() * 0.8 + 0.2,
  };
}

function drawBean(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  angle: number, alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#3d1f00";
  ctx.fill();

  // Highlight
  ctx.beginPath();
  ctx.ellipse(-w * 0.15, -h * 0.1, w * 0.3, h * 0.2, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(120,60,0,0.3)";
  ctx.fill();

  // Crease
  ctx.beginPath();
  ctx.moveTo(-w * 0.05, -h * 0.9);
  ctx.bezierCurveTo(-w * 0.3, -h * 0.3, -w * 0.3, h * 0.3, -w * 0.05, h * 0.9);
  ctx.strokeStyle = "rgba(0,0,0,0.4)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

export default function BeansCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let rafId = 0;
    const beans: Bean[] = [];

    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Pre-seed some beans already in flight
    for (let i = 0; i < 15; i++) {
      const b = createBean(W, H);
      b.y     = Math.random() * H;
      b.alpha = b.alphaMax * Math.random();
      beans.push(b);
    }

    let t = 0;
    function draw() {
      t++;
      ctx!.clearRect(0, 0, W, H);

      if (beans.length < 25 && Math.random() < 0.015) {
        beans.push(createBean(W, H));
      }

      for (let i = beans.length - 1; i >= 0; i--) {
        const b = beans[i];
        b.x += b.vx + Math.sin(t * 0.01 + b.phase) * b.sway * 0.05;
        b.y += b.vy;
        b.angle += b.rotSpeed;

        if (b.y > H - 80) b.alpha = Math.min(b.alphaMax, b.alpha + 0.01);
        if (b.y < 80)     b.alpha = Math.max(0,           b.alpha - 0.008);

        drawBean(ctx!, b.x, b.y, b.size, b.size * 0.65, b.angle, b.alpha);

        if (b.y < -40) beans.splice(i, 1);
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
    />
  );
}
