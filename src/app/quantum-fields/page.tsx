'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  BookOpen, 
  Sliders, 
  RotateCcw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import MathEq from '@/components/Math';

export default function QuantumFieldsPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [oscillatorMode, setOscillatorMode] = useState<'ground' | 'excited' | 'wavepacket'>('ground');
  const [couplingK, setCouplingK] = useState(1.2);
  const [quantumFluct, setQuantumFluct] = useState(0.4);

  // Simulation of 1D coupled quantum field lattice
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const N = 40; // Number of field points
    const nodes = Array.from({ length: N }, (_, i) => ({
      y: 0,
      vy: 0,
      baseX: 0
    }));

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;
      const centerY = H / 2;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, W, H);

      // Grid guidelines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(W, centerY);
      ctx.stroke();

      t += 0.035;

      // Update positions based on chosen mode + vacuum fluctuations
      ctx.beginPath();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;

      const step = W / (N - 1);

      for (let i = 0; i < N; i++) {
        const x = i * step;
        nodes[i].baseX = x;

        // Base field profile
        let baseY = 0;
        if (oscillatorMode === 'ground') {
          baseY = 0; // Pure vacuum state average
        } else if (oscillatorMode === 'excited') {
          // 1-particle excitation (standing or traveling mode)
          baseY = Math.sin((i / N) * Math.PI * 2 - t) * 45;
        } else if (oscillatorMode === 'wavepacket') {
          // Localized particle packet
          const center = N / 2 + Math.sin(t * 0.5) * 8;
          const envelope = Math.exp(-Math.pow(i - center, 2) / 18);
          baseY = envelope * Math.cos(i * 0.8 - t * 2) * 55;
        }

        // Quantum zero-point fluctuations (sum of uncoupled harmonic oscillators zero-point modes)
        const fluct = (Math.sin(i * 3.7 + t * 4.2) * 0.5 + Math.cos(i * 7.1 - t * 2.8) * 0.5) * (quantumFluct * 28);
        const y = centerY + baseY + fluct;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        // Draw oscillator nodes
        ctx.fillStyle = oscillatorMode === 'ground' ? '#a855f7' : '#38bdf8';
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
      ctx.stroke();

      // Glow overlay for particle excitation
      if (oscillatorMode !== 'ground') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();
      }

      // Metadata text inside canvas
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(
        oscillatorMode === 'ground' 
          ? 'ESTADO DE VACÍO |0⟩ · FLUCTUACIONES DE PUNTO CERO' 
          : 'ESTADO EXCITADO |1_p⟩ · EXCITACIÓN COLECTIVA CUÁNTICA', 
        20, 
        25
      );

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [oscillatorMode, couplingK, quantumFluct]);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* HEADER */}
      <div className="border-b border-border bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-300 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>MÓDULO 03 · TEORÍA CUÁNTICA DE CAMPOS (QFT)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-text-primary tracking-tight">
            Campos Cuánticos & Segunda Cuantización
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed">
            ¿Por qué el universo no está hecho de partículas puntuales? Cuando unimos la relatividad especial (\( E = mc^2 \)) con la mecánica cuántica, el número de partículas ya no puede ser constante: nacen y mueren. La única entidad física que sobrevive es el <strong>Campo Cuántico</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">

        {/* INTERACTIVE SIMULATOR */}
        <section className="border border-border rounded-xl p-6 bg-surface">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-purple-300">
                Visualizador del Campo Escalar Cuántico <MathEq math="\hat{\phi}(x, t)" inline />
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Un campo es una red continua de infinitos osciladores armónicos acoplados. Las partículas no son bolas de billar: son <em>paquetes de ondas cuantizados</em> propagándose por el campo.
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setOscillatorMode('ground')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  oscillatorMode === 'ground'
                    ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'bg-surface-raised border border-border text-text-muted'
                }`}
              >
                Vacío Cuántico <MathEq math="|0\rangle" inline />
              </button>
              <button
                onClick={() => setOscillatorMode('excited')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  oscillatorMode === 'excited'
                    ? 'bg-quantum text-slate-950 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                    : 'bg-surface-raised border border-border text-text-muted'
                }`}
              >
                1 Cuanto / Modo
              </button>
              <button
                onClick={() => setOscillatorMode('wavepacket')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  oscillatorMode === 'wavepacket'
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                    : 'bg-surface-raised border border-border text-text-muted'
                }`}
              >
                Paquete de Ondas (Partícula)
              </button>
            </div>
          </div>

          <div className="relative border border-border rounded-lg overflow-hidden bg-bg">
            <canvas
              ref={canvasRef}
              width={800}
              height={260}
              className="w-full h-[220px] sm:h-[260px] block"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
            <div>
              <label className="text-xs font-mono text-text-muted flex justify-between">
                <span>Amplitud de Fluctuaciones del Vacío:</span>
                <span className="text-purple-300">{(quantumFluct * 100).toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={quantumFluct}
                onChange={(e) => setQuantumFluct(parseFloat(e.target.value))}
                className="w-full mt-2 accent-purple-400"
              />
            </div>
            <div className="flex items-center text-xs text-text-muted p-3 rounded-lg bg-surface-raised border border-border">
              <span>
                <strong>Principio de Incertidumbre:</strong> Aún a temperatura de cero absoluto (<MathEq math="T = 0" inline />), el campo nunca está quieto. Cada modo conserva una energía residual <MathEq math="\frac{1}{2}\hbar\omega" inline />.
              </span>
            </div>
          </div>
        </section>

        {/* CONCEPTUAL BLOCKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-border bg-surface">
            <div className="text-xs font-mono text-purple-400 font-semibold mb-2">
              01. Operadores Escalera
            </div>
            <h4 className="font-serif font-semibold text-base mb-2">
              Creación & Aniquilación
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              El operador <MathEq math="\hat{a}^\dagger_{\mathbf{p}}" inline /> añade un cuanto con momento <MathEq math="\mathbf{p}" inline /> al estado del universo, mientras que <MathEq math="\hat{a}_{\mathbf{p}}" inline /> lo destruye. La conmutación <MathEq math="[\hat{a}_{\mathbf{p}}, \hat{a}^\dagger_{\mathbf{k}}] = (2\pi)^3 \delta(\mathbf{p} - \mathbf{k})" inline /> rige la estadística bosónica.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border bg-surface">
            <div className="text-xs font-mono text-quantum font-semibold mb-2">
              02. El Lagrangiano de Klein-Gordon
            </div>
            <h4 className="font-serif font-semibold text-base mb-2">
              Densidad Lagrangiana Relativista
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              El principio de mínima acción se extiende a 4 dimensiones espaciotemporales:
              <MathEq math="\mathcal{L} = \frac{1}{2} (\partial_\mu \phi)(\partial^\mu \phi) - \frac{1}{2}m^2\phi^2" inline />. Las ecuaciones de Euler-Lagrange generan la ecuación de onda relativista <MathEq math="(\Box + m^2)\phi = 0" inline />.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border bg-surface">
            <div className="text-xs font-mono text-amber-400 font-semibold mb-2">
              03. La Integral Funcional
            </div>
            <h4 className="font-serif font-semibold text-base mb-2">
              Suma sobre Todas las Configuraciones
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              En QFT, la integral de caminos suma sobre infinitas configuraciones posibles de campos continuos en el espacio-tiempo: <MathEq math="\mathcal{Z} = \int \mathcal{D}\phi \, e^{i S[\phi]/\hbar}" inline />. Es la herramienta matemática por excelencia del Modelo Estándar.
            </p>
          </div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/least-action/"
            className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-amber-400 transition-colors"
          >
            <span>← Módulo Anterior: 02. Mínima Acción</span>
          </Link>

          <Link
            href="/quantum-computing/"
            className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Siguiente Módulo: 04. Computación Cuántica →</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
