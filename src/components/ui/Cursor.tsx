"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top  = my + "px";
      }
    }
    window.addEventListener("mousemove", onMove);

    function animate() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top  = ry + "px";
      }
      rafId = requestAnimationFrame(animate);
    }
    animate();

    // Expand ring on interactive elements
    function onEnter() {
      ringRef.current?.style.setProperty("width",  "52px");
      ringRef.current?.style.setProperty("height", "52px");
      ringRef.current?.style.setProperty("border-color", "rgba(245,158,11,1)");
    }
    function onLeave() {
      ringRef.current?.style.setProperty("width",  "36px");
      ringRef.current?.style.setProperty("height", "36px");
      ringRef.current?.style.setProperty("border-color", "rgba(245,158,11,0.6)");
    }
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none"
        style={{
          width: 8, height: 8,
          borderRadius: "50%",
          background: "#f59e0b",
          transform: "translate(-50%,-50%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none"
        style={{
          width: 36, height: 36,
          border: "1px solid rgba(245,158,11,0.6)",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
}