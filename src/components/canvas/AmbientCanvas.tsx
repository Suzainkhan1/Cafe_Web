"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number; alphaMax: number; alphaDir: number; alphaSpeed: number;
  hue: number;
}

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let mouseX = 0, mouseY = 0;
    let rafId = 0;
    const particles: Particle[] = [];

    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      mouseX = W / 2;
      mouseY = H / 2;
    }
    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.2 + 0.05),
        r: Math.random() * 1.5 + 0.3,
        alpha:      Math.random() * 0.4 + 0.05,
        alphaMax:   Math.random() * 0.45 + 0.05,
        alphaDir:   Math.random() < 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.003 + 0.001,
        hue:        Math.random() < 0.7 ? 38 : 22,
      });
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;
    function draw() {
      t++;
      ctx!.clearRect(0, 0, W, H);

      // Mouse glow
      const grd = ctx!.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
      grd.addColorStop(0, "rgba(245,158,11,0.05)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx + Math.sin(t * 0.0005 + p.y * 0.01) * 0.1;
        p.y += p.vy;
        p.alpha += p.alphaSpeed * p.alphaDir;
        if (p.alpha > p.alphaMax || p.alpha < 0.02) p.alphaDir *= -1;
        if (p.y < -10)    { p.y = H + 10;  p.x = Math.random() * W; }
        if (p.x < -10)    p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue},90%,60%,${p.alpha})`;
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}