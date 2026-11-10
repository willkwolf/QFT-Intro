'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Binary, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Zap,
  Layers,
  Award
} from 'lucide-react';
import MathEq from '@/components/Math';

export default function QuantumComputingPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [theta, setTheta] = useState(Math.PI / 2); // 0 to PI
  const [phi, setPhi] = useState(0); // 0 to 2*PI

  // Qubit probabilities
  const prob0 = Math.pow(Math.cos(theta / 2), 2);
  const prob1 = Math.pow(Math.sin(theta / 2), 2);

  // Apply Common Quantum Gates
  const applyHadamard = () => {
    setTheta(Math.PI / 2);
    setPhi(0);
  };

  const applyPauliX = () => {
    setTheta((prev) => Math.PI - prev);
  };

  const applyPauliZ = () => {
    setPhi((prev) => (prev + Math.PI) % (2 * Math.PI));
  };

  const resetQubit = () => {
    setTheta(0);
    setPhi(0);
  };

  // Render 3D Bloch Sphere projection on 2D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const centerX = W / 2;
    const centerY = H / 2;
    const radius = Math.min(W, H) * 0.38;

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);

    // Outer circle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Equator ellipse
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Axes
    // Z axis (vertical)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 15);
    ctx.lineTo(centerX, centerY + radius + 15);
    ctx.stroke();

    // X axis (perspective diagonal)
    ctx.beginPath();
    ctx.moveTo(centerX - radius * 0.7, centerY + radius * 0.25);
    ctx.lineTo(centerX + radius * 0.7, centerY - radius * 0.25);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels for |0> and |1>
    ctx.fillStyle = '#38bdf8';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillText('|0⟩', centerX - 8, centerY - radius - 20);

    ctx.fillStyle = '#f43f5e';
    ctx.fillText('|1⟩', centerX - 8, centerY + radius + 28);

    // Compute 3D state vector coordinates on sphere
    // x = r * sin(theta) * cos(phi)
    // y = r * sin(theta) * sin(phi)
    // z = r * cos(theta)
    const x3d = Math.sin(theta) * Math.cos(phi);
    const y3d = Math.sin(theta) * Math.sin(phi);
    const z3d = Math.cos(theta);

    // Project to 2D
    const projX = centerX + radius * (x3d * 0.85 - y3d * 0.35);
    const projY = centerY - radius * (z3d * 0.95 + y3d * 0.15);

    // Draw state vector (emerald arrow)
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(projX, projY);
    ctx.stroke();

    // State tip point
    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.arc(projX, projY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Glow at tip
    ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
    ctx.beginPath();
    ctx.arc(projX, projY, 14, 0, Math.PI * 2);
    ctx.fill();

  }, [theta, phi]);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* HEADER */}
      <div className="border-b border-border bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 text-xs font-mono mb-4">
            <Binary className="w-3.5 h-3.5" />
            <span>MÓDULO 04 · COMPUTACIÓN CUÁNTICA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-text-primary tracking-tight">
            Fundamentos de Información Cuántica & Qubits
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed">
            Un bit clásico solo puede ser \( 0 \) o \( 1 \). Un <strong>qubit</strong> vive en la superficie de una esfera continua en el espacio de Hilbert tridimensional. A través de la superposición y el entrelazamiento, los algoritmos cuánticos exploran gigantescos espacios de soluciones en paralelo.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">

        {/* BLOCH SPHERE SIMULATOR */}
        <section className="border border-border rounded-xl p-6 bg-surface">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-emerald-400">
                Laboratorio Interactivo: La Esfera de Bloch
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Representación geométrica del estado puro <MathEq math="|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle" inline />.
              </p>
            </div>

            {/* Quantum Gate Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={resetQubit}
                className="px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-text-muted hover:text-text-primary flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset <MathEq math="|0\rangle" inline /></span>
              </button>
              <button
                onClick={applyHadamard}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-500/30 transition-all"
              >
                Hadamard (H)
              </button>
              <button
                onClick={applyPauliX}
                className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs font-mono text-quantum hover:border-quantum/40 transition-all"
              >
                Pauli-X (NOT)
              </button>
              <button
                onClick={applyPauliZ}
                className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs font-mono text-amber-300 hover:border-amber-300/40 transition-all"
              >
                Pauli-Z (Fase)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Canvas */}
            <div className="relative border border-border rounded-lg overflow-hidden bg-bg">
              <canvas
                ref={canvasRef}
                width={400}
                height={320}
                className="w-full h-[280px] sm:h-[320px] block"
              />
            </div>

            {/* Sliders & Probabilities */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-mono text-text-muted flex justify-between">
                  <span>Ángulo Polar \(\theta\) (Inclinación):</span>
                  <span className="text-emerald-400">{(theta * (180 / Math.PI)).toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.PI}
                  step="0.05"
                  value={theta}
                  onChange={(e) => setTheta(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-emerald-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-text-muted flex justify-between">
                  <span>Ángulo Azimutal \(\phi\) (Fase Cuántica):</span>
                  <span className="text-emerald-400">{(phi * (180 / Math.PI)).toFixed(1)}°</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.PI * 2}
                  step="0.05"
                  value={phi}
                  onChange={(e) => setPhi(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-emerald-400"
                />
              </div>

              {/* Probabilities Bars */}
              <div className="p-4 rounded-lg bg-surface-raised border border-border space-y-3">
                <div className="text-xs font-mono text-text-muted uppercase">
                  Probabilidades de Colapso de Medición:
                </div>
                
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-quantum"><MathEq math="P(|0\rangle) = |\cos(\theta/2)|^2" inline /></span>
                    <span className="font-bold text-quantum">{(prob0 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg overflow-hidden">
                    <div 
                      className="h-full bg-quantum transition-all duration-150" 
                      style={{ width: `${prob0 * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-rose-400"><MathEq math="P(|1\rangle) = |\sin(\theta/2)|^2" inline /></span>
                    <span className="font-bold text-rose-400">{(prob1 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg overflow-hidden">
                    <div 
                      className="h-full bg-rose-400 transition-all duration-150" 
                      style={{ width: `${prob1 * 100}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONCEPTUAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-border bg-surface">
            <div className="text-xs font-mono text-emerald-400 font-semibold mb-2">
              01. Superposición Coherente
            </div>
            <h4 className="font-serif font-semibold text-base mb-2">
              Más allá del Cero y el Uno
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Mientras un bit solo ocupa uno de los polos de la esfera, una compuerta Hadamard rota el estado al ecuador <MathEq math="\frac{|0\rangle + |1\rangle}{\sqrt{2}}" inline />, evaluando simultáneamente ambas realidades hasta que se realiza una medición.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border bg-surface">
            <div className="text-xs font-mono text-quantum font-semibold mb-2">
              02. Entrelazamiento Cuántico
            </div>
            <h4 className="font-serif font-semibold text-base mb-2">
              Los Estados de Bell
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Al acoplar dos qubits mediante una compuerta CNOT, se crea un estado no separable <MathEq math="|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}" inline />. El estado de un qubit no puede describirse sin el otro, sin importar la distancia física que los separe.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border bg-surface">
            <div className="text-xs font-mono text-amber-400 font-semibold mb-2">
              03. Paralelismo & Interferencia
            </div>
            <h4 className="font-serif font-semibold text-base mb-2">
              Aceleración Algorítmica
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Algoritmos como Shor y Grover usan transformadas cuánticas de Fourier para que las respuestas erróneas interfieran destructivamente mientras que la respuesta correcta experimenta interferencia constructiva masiva.
            </p>
          </div>
        </div>

        {/* NAVIGATION BOTTOM */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/quantum-fields/"
            className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-purple-400 transition-colors"
          >
            <span>← Módulo Anterior: 03. Teoría Cuántica de Campos</span>
          </Link>

          <Link
            href="/openwiki/"
            className="flex items-center gap-2 text-xs font-medium text-quantum hover:text-quantum-bright transition-colors"
          >
            <span>Explorar Base de Conocimiento OpenWiki →</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
