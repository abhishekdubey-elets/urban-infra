"use client";

import { motion } from "framer-motion";

// Stylised smart-city skyline: glowing buildings connected by data paths,
// animated light trails and a subtle grid horizon. Pure SVG -> crisp + light.
export function SkylineScene() {
  const buildings = [
    { x: 40, w: 46, h: 150 },
    { x: 96, w: 60, h: 240 },
    { x: 166, w: 40, h: 120 },
    { x: 216, w: 70, h: 300 },
    { x: 296, w: 50, h: 200 },
    { x: 356, w: 80, h: 360 },
    { x: 446, w: 54, h: 210 },
    { x: 510, w: 64, h: 280 },
    { x: 584, w: 44, h: 160 },
    { x: 638, w: 74, h: 330 },
    { x: 722, w: 50, h: 190 },
    { x: 782, w: 60, h: 250 },
    { x: 852, w: 46, h: 150 },
    { x: 908, w: 70, h: 300 },
    { x: 988, w: 52, h: 220 },
    { x: 1050, w: 78, h: 350 },
    { x: 1138, w: 48, h: 170 },
  ];
  const base = 460;

  // node coordinates (rooftops) for connection lines
  const nodes = buildings.map((b) => ({
    x: b.x + b.w / 2,
    y: base - b.h,
  }));

  return (
    <svg
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYEnd slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1FC2C9" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#3E7AC4" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#6A57A6" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FD14F" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1FC2C9" stopOpacity="0.2" />
        </linearGradient>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="ground" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#1FC2C9" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#070b14" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground glow */}
      <rect x="0" y="200" width="1200" height="280" fill="url(#ground)" />

      {/* connection network between rooftops */}
      <g stroke="#1FC2C9" strokeWidth="1" opacity="0.35">
        {nodes.map((n, i) => {
          const next = nodes[i + 1];
          if (!next) return null;
          return (
            <motion.line
              key={i}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.4, delay: 0.5 + i * 0.06 }}
            />
          );
        })}
      </g>

      {/* buildings */}
      <g filter="url(#soft)">
        {buildings.map((b, i) => (
          <g key={i}>
            <motion.rect
              x={b.x}
              y={base - b.h}
              width={b.w}
              height={b.h}
              rx={3}
              fill="url(#bld)"
              stroke="rgba(255,255,255,0.12)"
              initial={{ y: base, height: 0, opacity: 0 }}
              animate={{ y: base - b.h, height: b.h, opacity: 1 }}
              transition={{
                duration: 1,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* rooftop edge highlight */}
            <rect
              x={b.x}
              y={base - b.h}
              width={b.w}
              height={3}
              fill="url(#edge)"
            />
            {/* windows */}
            {Array.from({ length: Math.floor(b.h / 26) }).map((_, r) =>
              Array.from({ length: Math.max(1, Math.floor(b.w / 16)) }).map(
                (_, c) => {
                  const lit = (i + r + c) % 4 === 0;
                  return (
                    <motion.rect
                      key={`${r}-${c}`}
                      x={b.x + 7 + c * 16}
                      y={base - b.h + 14 + r * 26}
                      width={6}
                      height={10}
                      rx={1}
                      fill={lit ? "#8FD14F" : "#27B6D9"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: lit ? [0.2, 0.95, 0.2] : 0.22 }}
                      transition={{
                        duration: lit ? 3 + ((i * r) % 4) : 0,
                        repeat: lit ? Infinity : 0,
                        delay: (i + r + c) * 0.12,
                      }}
                    />
                  );
                }
              )
            )}
          </g>
        ))}
      </g>

      {/* nodes pulsing */}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={3}
          fill="#8FD14F"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* light trail along a horizontal transit line */}
      <g>
        <line x1="0" y1="438" x2="1200" y2="438" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <motion.circle
          cy="438"
          r="4"
          fill="#8FD14F"
          filter="url(#soft)"
          initial={{ cx: -20 }}
          animate={{ cx: 1220 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cy="438"
          r="3"
          fill="#1FC2C9"
          filter="url(#soft)"
          initial={{ cx: -300 }}
          animate={{ cx: 1220 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2.2 }}
        />
      </g>
    </svg>
  );
}
