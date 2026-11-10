'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Orbit, 
  Compass, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  BookOpen, 
  Clock, 
  Zap, 
  Award,
  Sliders,
  CheckCircle2,
  Atom
} from 'lucide-react';
import MathEq from '@/components/Math';

export default function LeastActionPage() {
  // Navigation active section
  const [activeTab, setActiveTab] = useState<'historia' | 'fermat' | 'lagrange' | 'feynman'>('historia');

  // =========================================================================
  // SIMULATOR 1: PENDULUM & PHASE SPACE
  // =========================================================================
  const pendCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPendRunning, setIsPendRunning] = useState(true);
  const [pendLength, setPendLength] = useState(1.5); // meters
  const [pendDamping, setPendDamping] = useState(0.00); // friction
  const [pendTheta0, setPendTheta0] = useState(45); // degrees
  const [pendKinetic, setPendKinetic] = useState(0);
  const [pendPotential, setPendPotential] = useState(0);

  const pendStateRef = useRef({
    theta: (45 * Math.PI) / 180,
    omega: 0.0,
    history: [] as Array<{ theta: number; omega: number }>,
    lastTime: 0
  });

  // Reset or initialize pendulum angle when theta0 changes and paused
  useEffect(() => {
    if (!isPendRunning) {
      pendStateRef.current.theta = (pendTheta0 * Math.PI) / 180;
      pendStateRef.current.omega = 0.0;
      pendStateRef.current.history = [];
    }
  }, [pendTheta0, isPendRunning]);

  useEffect(() => {
    let animId: number;
    pendStateRef.current.lastTime = performance.now();

    const render = () => {
      const canvas = pendCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const now = performance.now();
      let dt = (now - pendStateRef.current.lastTime) / 1000;
      pendStateRef.current.lastTime = now;
      if (dt > 0.1) dt = 0.1;

      const g = 9.81;
      const m = 1.0;
      const L = pendLength;

      if (isPendRunning) {
        // Euler-Cromer integration
        const alpha = -(g / L) * Math.sin(pendStateRef.current.theta) - pendDamping * pendStateRef.current.omega;
        pendStateRef.current.omega += alpha * dt;
        pendStateRef.current.theta += pendStateRef.current.omega * dt;

        // Keep history
        pendStateRef.current.history.push({
          theta: pendStateRef.current.theta,
          omega: pendStateRef.current.omega
        });
        if (pendStateRef.current.history.length > 350) {
          pendStateRef.current.history.shift();
        }

        // Energies
        const v = L * pendStateRef.current.omega;
        const T = 0.5 * m * v * v;
        const h = L * (1 - Math.cos(pendStateRef.current.theta));
        const V = m * g * h;
        setPendKinetic(T);
        setPendPotential(V);
      }

      // Draw
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, W, H);

      // Split canvas: Left is physical pendulum, Right is Phase Space (theta vs omega)
      const midX = W * 0.45;

      // Divider
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(midX, 10);
      ctx.lineTo(midX, H - 10);
      ctx.stroke();

      // --- 1. Physical Pendulum (Left) ---
      const originX = midX / 2;
      const originY = 40;
      const scale = (H - 90) / 2.5;
      const bobX = originX + L * scale * Math.sin(pendStateRef.current.theta);
      const bobY = originY + L * scale * Math.cos(pendStateRef.current.theta);

      // Pivot
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(originX, originY, 4, 0, Math.PI * 2);
      ctx.fill();

      // String
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Bob
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(bobX, bobY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Label Left
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('Espacio de Configuración (x, y)', 15, 25);

      // --- 2. Phase Space (Right: theta on X, p_theta on Y) ---
      const psCenterX = midX + (W - midX) / 2;
      const psCenterY = H / 2;

      // Phase space axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(midX + 15, psCenterY);
      ctx.lineTo(W - 15, psCenterY);
      ctx.moveTo(psCenterX, 15);
      ctx.lineTo(psCenterX, H - 15);
      ctx.stroke();

      // Labels Right
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Espacio de Fases (θ vs p_θ)', midX + 15, 25);
      ctx.fillText('θ (ángulo)', W - 65, psCenterY - 6);
      ctx.fillText('p_θ (momento)', psCenterX + 6, 25);

      // Draw Phase Trajectory
      if (pendStateRef.current.history.length > 1) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const psScaleX = (W - midX) * 0.28;
        const psScaleY = (H * 0.35) / (g * 0.8);

        pendStateRef.current.history.forEach((pt, i) => {
          const px = psCenterX + pt.theta * psScaleX;
          const py = psCenterY - pt.omega * psScaleY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Current phase point
        const curPt = pendStateRef.current.history[pendStateRef.current.history.length - 1];
        if (curPt) {
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(psCenterX + curPt.theta * psScaleX, psCenterY - curPt.omega * psScaleY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPendRunning, pendLength, pendDamping]);

  // =========================================================================
  // SIMULATOR 2: FERMAT'S PRINCIPLE (SNELL INTERACTIVE INTERFACE)
  // =========================================================================
  const fermatCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [n1, setN1] = useState(1.0); // Air
  const [n2, setN2] = useState(1.5); // Water/Glass
  const [interfaceX, setInterfaceX] = useState(0.5); // 0.05 to 0.95
  const [currentTime, setCurrentTime] = useState(0);
  const [minTime, setMinTime] = useState(0);
  const isDraggingRef = useRef(false);

  // Compute optimal X according to Snell's Law
  const calculateOptimalX = () => {
    const ax = 0.2;
    const ay = 0.2;
    const bx = 0.8;
    const by = 0.8;

    let bestX = 0.5;
    let minT = Infinity;

    for (let x = 0.05; x <= 0.95; x += 0.001) {
      const d1 = Math.hypot(x - ax, 0.5 - ay);
      const d2 = Math.hypot(bx - x, by - 0.5);
      const t = d1 * n1 + d2 * n2;
      if (t < minT) {
        minT = t;
        bestX = x;
      }
    }
    return bestX;
  };

  useEffect(() => {
    const canvas = fermatCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    const ax = 0.2 * W;
    const ay = 0.2 * H;
    const bx = 0.8 * W;
    const by = 0.8 * H;
    const ix = interfaceX * W;
    const iy = H / 2;

    const c = 300; // arbitrary light speed
    const d1 = Math.hypot(ix - ax, iy - ay) / W;
    const d2 = Math.hypot(bx - ix, by - iy) / W;
    const curT = (d1 / (c / n1) + d2 / (c / n2)) * 100;
    setCurrentTime(curT);

    const optX = calculateOptimalX();
    const od1 = Math.hypot(optX * W - ax, iy - ay) / W;
    const od2 = Math.hypot(bx - optX * W, by - iy) / W;
    const minT = (od1 / (c / n1) + od2 / (c / n2)) * 100;
    setMinTime(minT);

    // Draw
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);

    // Medium 1 (Top)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, W, H / 2);

    // Medium 2 (Bottom)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.06)';
    ctx.fillRect(0, H / 2, W, H / 2);

    // Interface boundary line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();

    // Medium labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(`MEDIO 1 (Aire / Vacío) — n₁ = ${n1.toFixed(2)}`, 20, 28);
    ctx.fillText(`MEDIO 2 (Agua / Cristal) — n₂ = ${n2.toFixed(2)}`, 20, H / 2 + 28);

    // Snell theoretical path (dashed white)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(optX * W, H / 2);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.setLineDash([]);

    // Actual user path (amber/gold)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ix, iy);
    ctx.lineTo(bx, by);
    ctx.stroke();

    // Normal line at interface
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(ix, iy - 40);
    ctx.lineTo(ix, iy + 40);
    ctx.stroke();
    ctx.setLineDash([]);

    // Nodes
    // Source A
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(ax, ay, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText('Fuente A', ax + 10, ay + 4);

    // Target B
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(bx, by, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText('Detector B', bx + 10, by + 4);

    // Draggable node at interface
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(ix, iy, 7, 0, Math.PI * 2);
    ctx.fill();

    // Optimal marker
    ctx.strokeStyle = '#38bdf8';
    ctx.strokeRect(optX * W - 3, H / 2 - 3, 6, 6);
  }, [n1, n2, interfaceX]);

  // Handle Drag on Fermat Canvas
  const handleFermatMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = fermatCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const nodeX = interfaceX * canvas.width;
    const nodeY = canvas.height / 2;

    if (Math.hypot(mouseX - nodeX, mouseY - nodeY) < 25) {
      isDraggingRef.current = true;
    }
  };

  const handleFermatMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const canvas = fermatCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let normX = (e.clientX - rect.left) / canvas.width;
    normX = Math.max(0.05, Math.min(0.95, normX));
    setInterfaceX(normX);
  };

  const handleFermatMouseUp = () => {
    isDraggingRef.current = false;
  };

  // =========================================================================
  // SIMULATOR 3: FEYNMAN PATH INTEGRAL & PHASOR SUMMATION
  // =========================================================================
  const feynmanCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pathCount, setPathCount] = useState(25);
  const [hbarVal, setHbarVal] = useState(0.25); // smaller hbar makes classical emergence clearer
  const [coherenceStatus, setCoherenceStatus] = useState('Coherente');

  useEffect(() => {
    const canvas = feynmanCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);

    const ax = 0.12 * W;
    const ay = 0.5 * H;
    const bx = 0.88 * W;
    const by = 0.5 * H;
    const classicDist = Math.hypot(bx - ax, by - ay);

    // Draw paths
    const paths = [];
    for (let p = 0; p < pathCount; p++) {
      const points = [{ x: ax, y: ay }];
      const segments = 12;
      let accumLength = 0;
      let lastX = ax;
      let lastY = ay;

      for (let s = 1; s < segments; s++) {
        const t = s / segments;
        const cx = ax + (bx - ax) * t;
        const cy = ay + (by - ay) * t;

        const maxDev = hbarVal * H * 0.8;
        const devY = (Math.sin(p * 2.3 + s * 1.7) * 0.5 + (Math.random() - 0.5) * 0.3) * maxDev;
        const px = cx;
        const py = cy + devY;

        points.push({ x: px, y: py });
        accumLength += Math.hypot(px - lastX, py - lastY);
        lastX = px;
        lastY = py;
      }
      points.push({ x: bx, y: by });
      accumLength += Math.hypot(bx - lastX, by - lastY);

      const action = accumLength / classicDist; // 1.0 for straight line
      paths.push({ points, action });
    }

    // Render quantum paths (faint purple lines)
    ctx.lineWidth = 1;
    paths.forEach((path) => {
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      ctx.stroke();
    });

    // Classical stationary path (dashed cyan line)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.setLineDash([]);

    // Nodes
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(ax, ay, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(bx, by, 5, 0, Math.PI * 2);
    ctx.fill();

    // --- Complex Phasor Diagram (Bottom Right or Left Overlay) ---
    const dialR = 45;
    const dialX = W - 70;
    const dialY = H - 65;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(dialX, dialY, dialR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Phasor sum
    let curX = dialX;
    let curY = dialY;
    const stepScale = (dialR * 0.75) / Math.sqrt(pathCount);

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.lineWidth = 1.2;

    paths.forEach((path) => {
      const phase = path.action / hbarVal;
      const dx = Math.cos(phase) * stepScale;
      const dy = Math.sin(phase) * stepScale;
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(curX + dx, curY + dy);
      ctx.stroke();
      curX += dx;
      curY += dy;
    });

    // Resultant amplitude vector (cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(dialX, dialY);
    ctx.lineTo(curX, curY);
    ctx.stroke();

    const netAmp = Math.hypot(curX - dialX, curY - dialY) / (pathCount * stepScale || 1);
    if (netAmp > 0.6) setCoherenceStatus('Interferencia Constructiva (Límite Clásico)');
    else if (netAmp > 0.3) setCoherenceStatus('Transición Cuántica Parcial');
    else setCoherenceStatus('Cancelación Destructiva (Fases Aleatorias)');

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillText('Σ e^(iS/ħ)', dialX - 25, dialY + dialR + 14);
  }, [pathCount, hbarVal]);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      
      {/* HEADER BANNER */}
      <div className="border-b border-border bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-mono mb-4">
            <Orbit className="w-3.5 h-3.5" />
            <span>MÓDULO INTERACTIVO 02 · HISTORIA & FORMALISMO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-text-primary tracking-tight">
            El Principio de Mínima Acción
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed">
            Desde la intuición de Fermat y Maupertuis hasta las ecuaciones de Euler-Lagrange, las simetrías de Noether y la integral de caminos de Feynman. Descubre cómo la naturaleza rige todo el cosmos mediante un principio supremo de economía variacional.
          </p>

          {/* TAB NAVIGATION */}
          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setActiveTab('historia')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'historia'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-surface border border-border text-text-muted hover:text-text-primary'
              }`}
            >
              1. Historia & Maupertuis
            </button>
            <button
              onClick={() => setActiveTab('fermat')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'fermat'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-surface border border-border text-text-muted hover:text-text-primary'
              }`}
            >
              2. Lab: Principio de Fermat
            </button>
            <button
              onClick={() => setActiveTab('lagrange')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'lagrange'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-surface border border-border text-text-muted hover:text-text-primary'
              }`}
            >
              3. Lab: Euler-Lagrange & Péndulo
            </button>
            <button
              onClick={() => setActiveTab('feynman')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'feynman'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-surface border border-border text-text-muted hover:text-text-primary'
              }`}
            >
              4. Lab: Feynman & Suma Cuántica
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT AREA ACCORDING TO ACTIVE TAB */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">

        {/* TAB 1: HISTORICAL NARRATIVE */}
        {activeTab === 'historia' && (
          <section className="space-y-8 animate-fadeIn">
            <div className="p-6 rounded-xl border border-border bg-surface">
              <h2 className="text-xl font-serif font-bold text-amber-400 mb-3">
                ¿Por qué la naturaleza optimiza?
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Newton nos acostumbró a pensar de forma <strong>diferencial</strong>: en cada microsegundo, una partícula experimenta una fuerza <MathEq math="\mathbf{F} = m \mathbf{a}" inline /> y cambia su velocidad. Pero la física analítica concibió una perspectiva mucho más imponente y <strong>global</strong>: la naturaleza parece evaluar todas las rutas posibles entre el pasado y el futuro, escogiendo aquella que vuelve estacionaria una sola cantidad escalar llamada <strong>Acción (<MathEq math="S" inline />)</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg border border-border bg-surface/60">
                <div className="text-xs font-mono text-quantum font-semibold mb-1">
                  Pierre Louis Maupertuis (1744)
                </div>
                <h3 className="font-serif font-semibold text-base mb-2">
                  "El menor empleo de acción"
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Maupertuis enunció que cuando ocurre un cambio en la naturaleza, la cantidad de acción requerida para este cambio es siempre la más pequeña posible. Definió la acción como \( \int v \, ds \). Aunque al principio fue objeto de controversias teológicas y sátiras por parte de Voltaire, sentó la semilla de la mayor unificación de la física moderna.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-border bg-surface/60">
                <div className="text-xs font-mono text-amber-400 font-semibold mb-1">
                  Leonhard Euler & Joseph-Louis Lagrange (1788)
                </div>
                <h3 className="font-serif font-semibold text-base mb-2">
                  La Fundación del Cálculo de Variaciones
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Lagrange desterró para siempre los diagramas de fuerzas y vectores. Demostró que toda la mecánica se reduce a derivar una función escalar: el <strong>Lagrangiano</strong> \( L = T - V \). La condición \( \delta S = \delta \int L \, dt = 0 \) produce de inmediato las ecuaciones diferenciales del movimiento.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-border bg-surface/60">
                <div className="text-xs font-mono text-purple-400 font-semibold mb-1">
                  William Rowan Hamilton (1834)
                </div>
                <h3 className="font-serif font-semibold text-base mb-2">
                  El Espacio de Fases & Los Corchetes de Poisson
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Hamilton tradujo las ecuaciones de segundo orden de Lagrange en dos ecuaciones canónicas simétricas de primer orden en el espacio de fases \( (q, p) \). Introdujo el <strong>Hamiltoniano</strong> \( H(q, p) \), que sería la piedra angular sobre la que Heisenberg y Dirac construirían la mecánica cuántica.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-border bg-surface/60">
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">
                  Emmy Noether (1918)
                </div>
                <h3 className="font-serif font-semibold text-base mb-2">
                  Simetrías ⇔ Leyes de Conservación
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Noether probó que la conservación de la energía no es un hecho arbitrario: proviene de la invariancia temporal de la acción. La conservación del momento proviene de la homogeneidad del espacio, y el momento angular de la isotropía espacial.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-quantum/30 bg-quantum/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-sm text-text-primary">
                  ¿Listo para ver la acción en funcionamiento?
                </h4>
                <p className="text-xs text-text-muted mt-1">
                  Prueba el simulador de Fermat para arrastrar el camino de la luz y verificar la minimización de tiempo.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('fermat')}
                className="px-4 py-2 rounded-lg bg-quantum text-slate-950 text-xs font-semibold hover:bg-quantum-bright transition-colors flex items-center gap-1.5"
              >
                <span>Ir al Laboratorio de Fermat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* TAB 2: FERMAT SIMULATOR */}
        {activeTab === 'fermat' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="border border-border rounded-xl p-6 bg-surface">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-amber-400">
                    Laboratorio: Principio de Fermat & Refracción de Snell
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Arrastra con el ratón el <strong>nodo dorado</strong> sobre la línea divisoria para alterar la trayectoria de la luz.
                  </p>
                </div>
                <button
                  onClick={() => setInterfaceX(calculateOptimalX())}
                  className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-quantum hover:border-quantum/50 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Alinear al Óptimo de Snell</span>
                </button>
              </div>

              {/* Canvas Interactive */}
              <div className="relative border border-border rounded-lg overflow-hidden bg-bg">
                <canvas
                  ref={fermatCanvasRef}
                  width={800}
                  height={320}
                  onMouseDown={handleFermatMouseDown}
                  onMouseMove={handleFermatMouseMove}
                  onMouseUp={handleFermatMouseUp}
                  className="w-full h-[280px] sm:h-[320px] cursor-ew-resize block"
                />
              </div>

              {/* Controls & Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
                <div>
                  <label className="text-xs font-mono text-text-muted flex justify-between">
                    <span>Índice Aire (\(n_1\)):</span>
                    <span className="text-quantum">{n1.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="2.0"
                    step="0.05"
                    value={n1}
                    onChange={(e) => setN1(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-muted flex justify-between">
                    <span>Índice Agua (\(n_2\)):</span>
                    <span className="text-quantum">{n2.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="2.5"
                    step="0.05"
                    value={n2}
                    onChange={(e) => setN2(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-amber-400"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-raised border border-border">
                  <div>
                    <div className="text-[10px] font-mono text-text-muted uppercase">Tiempo Actual</div>
                    <div className="text-sm font-mono font-bold text-amber-400">{currentTime.toFixed(2)} ns</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-text-muted uppercase">Tiempo Mínimo (Snell)</div>
                    <div className="text-sm font-mono font-bold text-quantum">{minTime.toFixed(2)} ns</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-surface-raised border border-border text-xs text-text-secondary leading-relaxed">
                <strong>Lección Variacional:</strong> Observa que en el punto óptimo (marcado en cuadrado azul), una pequeña variación infinitesimal del punto de entrada <MathEq math="\delta x" inline /> produce una variación de tiempo nula en primer orden: <MathEq math="\frac{dt}{dx} = 0" inline />. Esta es exactamente la condición de estacionariedad <MathEq math="\delta S = 0" inline />.
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: EULER-LAGRANGE & PENDULUM SIMULATOR */}
        {activeTab === 'lagrange' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="border border-border rounded-xl p-6 bg-surface">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-amber-400">
                    Laboratorio: Espacio de Fases & Conservación de Energía
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Visualiza en simultáneo la oscilación espacial y la curva cerrada generada en el espacio de fases \( (\theta, p_\theta) \).
                  </p>
                </div>
                <button
                  onClick={() => setIsPendRunning(!isPendRunning)}
                  className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-quantum hover:border-quantum/50 transition-colors flex items-center gap-1.5"
                >
                  {isPendRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPendRunning ? 'Pausar Simulación' : 'Reanudar'}</span>
                </button>
              </div>

              {/* Canvas Interactive */}
              <div className="relative border border-border rounded-lg overflow-hidden bg-bg">
                <canvas
                  ref={pendCanvasRef}
                  width={800}
                  height={320}
                  className="w-full h-[280px] sm:h-[320px] block"
                />
              </div>

              {/* Sliders & Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
                <div>
                  <label className="text-xs font-mono text-text-muted flex justify-between">
                    <span>Longitud \(L\):</span>
                    <span className="text-quantum">{pendLength.toFixed(1)} m</span>
                  </label>
                  <input
                    type="range"
                    min="0.6"
                    max="2.4"
                    step="0.1"
                    value={pendLength}
                    onChange={(e) => setPendLength(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-muted flex justify-between">
                    <span>Amortiguamiento:</span>
                    <span className="text-quantum">{pendDamping.toFixed(3)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.08"
                    step="0.005"
                    value={pendDamping}
                    onChange={(e) => setPendDamping(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-muted flex justify-between">
                    <span>Ángulo Inicial:</span>
                    <span className="text-quantum">{pendTheta0}°</span>
                  </label>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    step="5"
                    value={pendTheta0}
                    onChange={(e) => setPendTheta0(parseInt(e.target.value))}
                    className="w-full mt-2 accent-amber-400"
                  />
                </div>
              </div>

              {/* Energy meters */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-2.5 rounded-lg bg-surface-raised border border-border text-center">
                  <div className="text-[10px] font-mono text-text-muted">Cinética \(T\)</div>
                  <div className="text-xs font-mono font-bold text-quantum">{pendKinetic.toFixed(2)} J</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-raised border border-border text-center">
                  <div className="text-[10px] font-mono text-text-muted">Potencial \(V\)</div>
                  <div className="text-xs font-mono font-bold text-amber-400">{pendPotential.toFixed(2)} J</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-raised border border-border text-center">
                  <div className="text-[10px] font-mono text-text-muted">Total \(E = T + V\)</div>
                  <div className="text-xs font-mono font-bold text-emerald-400">{(pendKinetic + pendPotential).toFixed(2)} J</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: FEYNMAN PATH INTEGRAL */}
        {activeTab === 'feynman' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="border border-border rounded-xl p-6 bg-surface">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-amber-400">
                    Laboratorio: Integrales de Camino de Feynman & Límite Clásico
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    El mundo cuántico explora simultáneamente todas las historias. Mira cómo la trayectoria de mínima acción clásica emerge como la fase constructiva cuando \( \hbar \to 0 \).
                  </p>
                </div>
                <div className="text-xs font-mono px-3 py-1.5 rounded-full border border-purple-400/40 bg-purple-400/10 text-purple-300">
                  {coherenceStatus}
                </div>
              </div>

              {/* Canvas Interactive */}
              <div className="relative border border-border rounded-lg overflow-hidden bg-bg">
                <canvas
                  ref={feynmanCanvasRef}
                  width={800}
                  height={320}
                  className="w-full h-[280px] sm:h-[320px] block"
                />
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
                <div>
                  <label className="text-xs font-mono text-text-muted flex justify-between">
                    <span>Número de Caminos Cuánticos (\(N\)):</span>
                    <span className="text-quantum">{pathCount}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={pathCount}
                    onChange={(e) => setPathCount(parseInt(e.target.value))}
                    className="w-full mt-2 accent-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-muted flex justify-between">
                    <span>Constante Cuántica (\(\hbar\) efectiva):</span>
                    <span className="text-purple-400">{hbarVal.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={hbarVal}
                    onChange={(e) => setHbarVal(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-purple-400"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-surface-raised border border-border text-xs text-text-secondary leading-relaxed">
                <strong>El Gran Secreto de Feynman (1948):</strong> Cada camino tiene una amplitud compleja <MathEq math="\psi \propto e^{i S / \hbar}" inline />. Lejos de la trayectoria clásica, variaciones pequeñas del camino cambian la fase <MathEq math="S/\hbar" inline /> desordenadamente, haciendo que los fasores apunten en todas direcciones y se destruyan mutuamente. Pero cerca de la trayectoria donde <MathEq math="\delta S = 0" inline />, todos los caminos vecinos están exactamente en fase y se suman constructivamente. ¡El principio clásico de mínima acción es un fenómeno de interferencia ondulatoria cuántica!
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM NAVIGATION LINKS */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/quantum-origins/"
            className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-quantum transition-colors"
          >
            <span>← Módulo Anterior: 01. Orígenes Cuánticos</span>
          </Link>

          <Link
            href="/quantum-fields/"
            className="flex items-center gap-2 text-xs font-medium text-quantum hover:text-quantum-bright transition-colors"
          >
            <span>Siguiente Módulo: 03. Teoría Cuántica de Campos (QFT) →</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
