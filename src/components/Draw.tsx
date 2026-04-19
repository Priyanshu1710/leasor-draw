import React, { useEffect, useRef, useState, useMemo } from "react";
import { marked } from "marked";
import { Pencil, X } from "lucide-react";

type ReadingMode = "none" | "laser";

marked.setOptions({ breaks: true, gfm: true });

export const Draw = ({ content = "", className = "" }) => {
  const [readingMode, setReadingMode] = useState<ReadingMode>("none");
  const containerRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    return marked.parse(content) as string;
  }, [content]);

  useEffect(() => {
    if (readingMode !== "laser") return;

    const canvas = document.createElement("canvas");

    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let points: { x: number; y: number; age: number }[] = [];

    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      points.push({ x: mouseX, y: mouseY, age: 0 });
      if (points.length > 40) points.shift();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points = points.filter((p) => {
        p.age += 0.06;
        return p.age < 1;
      });

      ctx.fillStyle = "rgba(255, 60, 60, 0.9)";
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(255, 60, 60, 0.9)";

      if (points.length > 2) {
        const left: any[] = [];
        const right: any[] = [];

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const prev = points[i - 1] || p;
          const next = points[i + 1] || p;

          let dx = next.x - prev.x;
          let dy = next.y - prev.y;

          if (dx === 0 && dy === 0) dx = 1;

          const dist = Math.hypot(dx, dy);
          const nx = -dy / dist;
          const ny = dx / dist;

          const width = 6 * (1 - p.age);

          left.push({ x: p.x + nx * width, y: p.y + ny * width });
          right.unshift({ x: p.x - nx * width, y: p.y - ny * width });
        }

        const shape = [...left, ...right];

        ctx.beginPath();
        ctx.moveTo(shape[0].x, shape[0].y);
        for (let i = 1; i < shape.length; i++) {
          ctx.lineTo(shape[i].x, shape[i].y);
        }
        ctx.closePath();
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(render);
    };

    document.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, [readingMode]);

  return (
    <div
      className={`laser-draw-container ${
        readingMode === "laser" ? "mode-laser" : ""
      } ${className}`}
    >
      <div className="laser-draw-toolbar">
        <button
          className={`laser-draw-toolbar-btn ${
            readingMode === "laser" ? "active" : ""
          }`}
          onClick={() =>
            setReadingMode((p) => (p === "laser" ? "none" : "laser"))
          }
        >
          {readingMode === "laser" ? <X /> : <Pencil />}
        </button>
      </div>

      <div
        ref={containerRef}
        className="laser-draw-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};