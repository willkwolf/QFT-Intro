'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Atom, 
  Orbit, 
  Layers, 
  Binary, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Compass, 
  ExternalLink,
  Cpu,
  GraduationCap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const studyModules = [
    {
      id: 'quantum-origins',
      title: '01. Orígenes Cuánticos & La Catástrofe UV',
      subtitle: 'El colapso de la física clásica y la hipótesis de Planck',
      description: 'Scrollytelling interactivo con 13 secciones, simuladores de cavidad de cuerpo negro en tiempo real, leyes de Wien y Rayleigh-Jeans, rampa discreta de energía, simulador del efecto fotoeléctrico, MathToggle y Landau Companion.',
      href: '/quantum-origins/',
      icon: Atom,
      color: 'text-quantum border-quantum/30 bg-quantum/10',
      badge: 'Módulo Activo · Scrollytelling',
      status: 'ready'
    },
    {
      id: 'least-action',
      title: '02. El Principio de Mínima Acción & Geometría',
      subtitle: 'De Fermat y Euler a Lagrange, Hamilton y Feynman',
      description: 'Explora la historia y la matemática profunda del principio variacional. Incluye simulador de Fermat (refracción y optimización de tiempo), péndulo no lineal en el espacio de fases y la suma de caminos cuánticos con fasores en interferencia.',
      href: '/least-action/',
      icon: Orbit,
      color: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      badge: 'Módulo Activo · Simuladores Canvas',
      status: 'ready'
    },
    {
      id: 'quantum-fields',
      title: '03. Teoría Cuántica de Campos (QFT)',
      subtitle: 'Integrales de camino, segunda cuantización y el vacío dinámico',
      description: 'El puente hacia la física de partículas: ¿por qué los campos son más fundamentales que las partículas? Operadores de creación/aniquilación, lagrangianos relativistas y el problema de la gravedad cuántica.',
      href: '/quantum-fields/',
      icon: Layers,
      color: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
      badge: 'En Desarrollo · Roadmap Activo',
      status: 'upcoming'
    },
    {
      id: 'quantum-computing',
      title: '04. Fundamentos de Computación Cuántica',
      subtitle: 'De los operadores cuánticos a los algoritmos y la esfera de Bloch',
      description: 'Aprende cómo la superposición y el entrelazamiento cuántico se transforman en poder computacional: qubits, compuertas unitarias (Hadamard, Pauli, CNOT), algoritmos de Deutsch y Grover.',
      href: '/quantum-computing/',
      icon: Binary,
      color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      badge: 'En Desarrollo · Roadmap Activo',
      status: 'upcoming'
    }
  ];

  const roadmaps = [
    {
      step: '01',
      title: 'Geometría y Mecánica Analítica',
      detail: 'Coordenadas generalizadas, Principio de Fermat, Lagrangiano L = T - V, Ecuaciones de Euler-Lagrange y Teorema de Noether.',
      icon: Compass
    },
    {
      step: '02',
      title: 'Ruptura Cuántica & Cuantización',
      detail: 'Catástrofe ultravioleta, osciladores de Planck E = ħω, fotones de Einstein y mecánica matricial / ondulatoria de Schrödinger.',
      icon: Atom
    },
    {
      step: '03',
      title: 'Teoría Cuántica de Campos (QFT)',
      detail: 'Integral de camino funcional, propagadores, simetrías gauge y partículas como fluctuaciones cuantizadas en el vacío.',
      icon: Layers
    },
    {
      step: '04',
      title: 'Computación e Información Cuántica',
      detail: 'Espacio de Hilbert finito, estados de Bell, circuitos cuánticos y algoritmos de aceleración computacional.',
      icon: Cpu
    }
  ];

  return (
    <main className="min-h-screen bg-bg text-text-primary px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="text-center py-12 border-b border-border">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-quantum/30 bg-quantum/10 text-quantum text-xs font-mono tracking-wider mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REPOSITORIO INTEGRADO · GITHUB PAGES · OPENWIKI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-text-primary max-w-4xl mx-auto leading-tight">
          De la Geometría a la <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum via-cyan-300 to-indigo-400">
            Física Cuántica & Campos
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
          Un repositorio unificado con artefactos interactivos de estudio, simuladores en Canvas/SVG y hojas de scrollytelling pedagógicas. Diseñado para acompañar la transición desde la física clásica hasta la computación cuántica con el rigor de <strong>Landau & Lifshitz</strong>.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/quantum-origins/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-quantum text-slate-950 font-medium text-sm hover:bg-quantum-bright hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all"
          >
            <Atom className="w-4 h-4" />
            <span>Iniciar: Orígenes Cuánticos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/least-action/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-raised border border-border text-text-primary font-medium text-sm hover:border-amber-400/50 hover:text-amber-300 transition-all"
          >
            <Orbit className="w-4 h-4 text-amber-400" />
            <span>Módulo: Mínima Acción</span>
          </Link>

          <Link
            href="/openwiki/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-raised border border-border text-text-muted hover:text-text-primary text-sm transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explorar OpenWiki</span>
          </Link>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section className="py-14 border-b border-border">
        <div className="text-center mb-10">
          <h2 className="text-xs font-mono text-quantum uppercase tracking-widest">
            Ruta Pedagógica Progresiva
          </h2>
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold mt-1">
            La Cadena Conceptual de la Física Teórica
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmaps.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div 
                key={r.step} 
                className="p-5 rounded-xl border border-border bg-surface/50 hover:bg-surface-raised transition-all relative overflow-hidden group"
              >
                <div className="text-3xl font-serif font-bold text-border group-hover:text-quantum/30 transition-colors">
                  {r.step}
                </div>
                <div className="flex items-center gap-2 mt-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-surface border border-border text-quantum">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-text-primary">
                    {r.title}
                  </h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {r.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* STUDY ARTIFACTS / MODULES GRID */}
      <section className="py-14 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-mono text-quantum uppercase tracking-widest">
              Artefactos de Estudio Interactivos
            </h2>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold mt-1">
              Hojas de Estudio & Simuladores
            </h3>
          </div>
          <p className="text-xs text-text-muted max-w-md">
            Cada módulo está diseñado como una hoja interactiva autocontenida que puedes consultar, simular y expandir a medida que surgen nuevas dudas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studyModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="flex flex-col justify-between p-6 rounded-xl border border-border bg-surface hover:border-quantum/40 transition-all shadow-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.1)] group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`p-2 rounded-lg border ${mod.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-border bg-surface-raised text-text-muted">
                      {mod.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-serif font-semibold text-text-primary group-hover:text-quantum transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-xs font-mono text-quantum/90 mt-1 mb-3">
                    {mod.subtitle}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <Link
                    href={mod.href}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-quantum hover:text-quantum-bright"
                  >
                    <span>{mod.status === 'ready' ? 'Abrir Artefacto Interactivo' : 'Explorar Hoja & Temas'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-mono text-text-muted">
                    {mod.status === 'ready' ? '● Interactivo' : '○ En Roadmap'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* OPENWIKI & ARCHITECTURE SECTION */}
      <section className="py-14">
        <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-raised relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-landau/10 border border-landau/30 text-landau text-[11px] font-mono mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ARQUITECTURA OPENWIKI (OKF)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
              Separación Limpia de Animaciones, Conocimiento y Bibliografía
            </h3>

            <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
              Para garantizar que el repositorio crezca ordenadamente sin mezclar la lógica de visualización con los teoremas formales, el proyecto utiliza la estructura <strong>OpenWiki</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-3.5 rounded-lg border border-border bg-bg/60">
                <div className="text-xs font-mono font-semibold text-quantum mb-1">
                  1. Arquitectura
                </div>
                <p className="text-[11px] text-text-muted">
                  Motores de simulación SVG/Canvas, observadores de scrolltelling y renderizado KaTeX/MathJax.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border bg-bg/60">
                <div className="text-xs font-mono font-semibold text-amber-400 mb-1">
                  2. Dominios Formales
                </div>
                <p className="text-[11px] text-text-muted">
                  Mecánica de Lagrange/Hamilton, Catástrofe UV, Integrales de Feynman y Circuitos Cuánticos.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border bg-bg/60">
                <div className="text-xs font-mono font-semibold text-purple-400 mb-1">
                  3. Recursos & Libros
                </div>
                <p className="text-[11px] text-text-muted">
                  Catálogo de los 10 volúmenes de Landau & Lifshitz (Física Teórica) y papers seminales.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <Link
                href="/openwiki/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-quantum/40 text-quantum text-xs font-medium hover:bg-quantum/10 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Navegar Documentación en OpenWiki</span>
              </Link>

              <Link
                href="/legacy/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-landau"
              >
                <span>Acceder al Scrolltelling Clásico Standalone (HTML)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
        <div>
          <span>QuantumAtlas & QFT-Intro · Desarrollado para el estudio riguroso de la física</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/quantum-origins/" className="hover:text-text-primary">Orígenes Cuánticos</Link>
          <Link href="/least-action/" className="hover:text-text-primary">Mínima Acción</Link>
          <Link href="/openwiki/" className="hover:text-text-primary">OpenWiki</Link>
          <a href="https://github.com/willkwolf/QFT-Intro" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">GitHub</a>
        </div>
      </footer>

    </main>
  );
}
