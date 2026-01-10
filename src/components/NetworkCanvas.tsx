"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  isRed: boolean;
}

interface Connection {
  from: Node;
  to: Node;
  opacity: number;
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodeCount = 80;
    const connectionDistance = 200;
    const primaryGreen = "#5BF731";
    const accentRed = "#F7314C";

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createNodes();
    };

    const createNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        const isRed = Math.random() < 0.4;
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
          isRed: isRed,
        });
      }
    };

    const updateNodes = () => {
      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulsePhase += 0.02;
      });
    };

    const findConnections = () => {
      connectionsRef.current = [];
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            connectionsRef.current.push({
              from: nodes[i],
              to: nodes[j],
              opacity: 1 - distance / connectionDistance,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      connectionsRef.current.forEach((conn) => {
        let r, g, b;
        if (conn.from.isRed && conn.to.isRed) {
          r = 247;
          g = 49;
          b = 76; // Red
        } else if (!conn.from.isRed && !conn.to.isRed) {
          r = 91;
          g = 247;
          b = 49; // Green
        } else {
          r = 169;
          g = 148;
          b = 62; // Blended
        }

        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${conn.opacity * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;

        const r = node.isRed ? 247 : 91;
        const g = node.isRed ? 49 : 247;
        const b = node.isRed ? 76 : 49;

        // Glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 * pulse})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.6 * pulse})`;
        ctx.fill();
      });
    };

    const animate = () => {
      updateNodes();
      findConnections();
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-60"
      style={{ pointerEvents: "none" }}
    />
  );
}
