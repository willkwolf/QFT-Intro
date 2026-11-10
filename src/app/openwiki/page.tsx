'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Layers, 
  Orbit, 
  Atom, 
  Binary, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Code,
  GraduationCap
} from 'lucide-react';
import MathEq from '@/components/Math';

type WikiArticleKey = 
  | 'index'
  | 'arch-sim'
  | 'arch-scroll'
  | 'arch-math'
  | 'dom-action'
  | 'dom-blackbody'
  | 'dom-qft'
  | 'dom-qc'
  | 'res-landau'
  | 'res-biblio';

export default function OpenWikiPage() {
  const [selectedArticle, setSelectedArticle] = useState<WikiArticleKey>('index');

  const menuSections = [
    {
      group: 'Estructura & Arquitectura',
      items: [
        { key: 'index', title: '00. Mapa & Filosofía OKF', icon: BookOpen, path: 'openwiki/INDEX.md' },
        { key: 'arch-sim', title: 'Arquitectura: Simulaciones (SVG/Canvas)', icon: Code, path: 'openwiki/architecture/interactive-simulations.md' },
        { key: 'arch-scroll', title: 'Arquitectura: Motor Scrollytelling', icon: Layers, path: 'openwiki/architecture/scrollytelling-engine.md' },
        { key: 'arch-math', title: 'Arquitectura: MathToggle & KaTeX', icon: Sparkles, path: 'openwiki/architecture/math-and-notation.md' },
      ]
    },
    {
      group: 'Dominios del Conocimiento Formal',
      items: [
        { key: 'dom-action', title: '01. Principio de Mínima Acción', icon: Orbit, path: 'openwiki/domains/01-classical-least-action.md' },
        { key: 'dom-blackbody', title: '02. Orígenes & Catástrofe UV', icon: Atom, path: 'openwiki/domains/02-quantum-origins-blackbody.md' },
        { key: 'dom-qft', title: '03. Teoría Cuántica de Campos (QFT)', icon: Layers, path: 'openwiki/domains/03-quantum-field-theory.md' },
        { key: 'dom-qc', title: '04. Computación Cuántica', icon: Binary, path: 'openwiki/domains/04-quantum-computing-foundations.md' },
      ]
    },
    {
      group: 'Recursos & Bibliografía',
      items: [
        { key: 'res-landau', title: 'Compendio Landau & Lifshitz (10 Vol.)', icon: GraduationCap, path: 'openwiki/resources/landau-lifshitz-compendium.md' },
        { key: 'res-biblio', title: 'Artículos Seminales & Libros', icon: FileText, path: 'openwiki/resources/bibliography.md' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* HEADER */}
      <div className="border-b border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum/30 bg-quantum/10 text-quantum text-xs font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OPEN KNOWLEDGE FORMAT (OKF) · DOCUMENTACIÓN DEL REPOSITORIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            OpenWiki Explorer
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-text-secondary max-w-3xl leading-relaxed">
            Explora de manera desacoplada la arquitectura de visualización, las demostraciones formales de física teórica y el catálogo bibliográfico de <strong>Landau & Lifshitz</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-4 rounded-xl border border-border bg-surface sticky top-24 space-y-6">
            {menuSections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted px-2">
                  {sec.group}
                </div>
                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedArticle === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setSelectedArticle(item.key as WikiArticleKey)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                          isSelected
                            ? 'bg-quantum/15 text-quantum border border-quantum/40 font-semibold'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-quantum' : 'text-text-muted'}`} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        {isSelected && <ChevronRight className="w-3.5 h-3.5 text-quantum shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="text-[10px] font-mono text-text-muted">
                Archivo fuente en disco:
              </div>
              <div className="text-[11px] font-mono text-quantum truncate mt-0.5">
                {menuSections.flatMap(s => s.items).find(i => i.key === selectedArticle)?.path}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN ARTICLE VIEWER */}
        <main className="lg:col-span-8">
          <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface shadow-sm space-y-6">

            {/* ARTICLE: INDEX */}
            {selectedArticle === 'index' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-quantum">openwiki/INDEX.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Mapa de Conocimiento & Filosofía OpenWiki
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  El objetivo de esta estructura es garantizar que el crecimiento de este repositorio como <strong>cuaderno interactivo permanente</strong> no colapse en un código espagueti donde las fórmulas matemáticas se mezclan con eventos del ratón o bucles de renderizado.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-surface-raised border border-border">
                    <div className="font-mono text-xs font-semibold text-quantum mb-1">
                      1. Arquitectura
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Contratos técnicos para simulación numérica (Euler-Cromer, Runge-Kutta), renderizado Canvas/SVG a 60 FPS y renderizado matemático.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-raised border border-border">
                    <div className="font-mono text-xs font-semibold text-amber-400 mb-1">
                      2. Dominios Formales
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Demostraciones matemáticas rigurosas, desde el cálculo variacional clásico hasta los operadores de creación en teoría cuántica de campos.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-raised border border-border">
                    <div className="font-mono text-xs font-semibold text-purple-400 mb-1">
                      3. Recursos Primarios
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Referencias directas a los 10 tomos del Curso de Física Teórica de Landau & Lifshitz (PDFs en `/Bibliography`) y papers históricos.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-bg border border-border font-mono text-xs space-y-2 text-text-muted">
                  <div className="text-quantum font-semibold">Pasos para anexar un nuevo artefacto de estudio:</div>
                  <div>1. Redactar el fundamento analítico en <code>openwiki/domains/XX-[tema].md</code>.</div>
                  <div>2. Crear el componente interactivo en <code>src/app/[tema]/page.tsx</code>.</div>
                  <div>3. Añadir el enlace en <code>Navigation.tsx</code> y en la tarjeta del Dashboard.</div>
                </div>
              </article>
            )}

            {/* ARTICLE: ARCHITECTURE SIMULATIONS */}
            {selectedArticle === 'arch-sim' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-quantum">openwiki/architecture/interactive-simulations.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Arquitectura de Motores de Simulación Física
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Para que las simulaciones físicas mantengan estabilidad numérica y no consuman excesivos recursos de la GPU o la batería:
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-text-primary">
                    1. Integración Simpléctica de Euler-Cromer
                  </h3>
                  <div className="p-3 bg-bg rounded-lg border border-border font-mono text-xs text-quantum overflow-x-auto">
                    {`// En cada frame dt:\nconst alpha = -(g / L) * Math.sin(theta) - damping * omega;\nomega += alpha * dt; // Se actualiza la velocidad primero\ntheta += omega * dt; // Se usa la NUEVA velocidad para la posición`}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    A diferencia del método de Euler simple (que gana energía artificialmente y hace divergir las órbitas), Euler-Cromer conserva la integral de Poincaré en el espacio de fases.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-text-primary">
                    2. Suma Fasorial Cuántica de Feynman
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Cada camino genera un número complejo <MathEq math="e^{i S_k/\hbar}" inline />. Los vectores se suman secuencialmente en el plano complejo de Gauss; el módulo al cuadrado <MathEq math="|\sum e^{i S_k/\hbar}|^2" inline /> representa la probabilidad observable.
                  </p>
                </div>

                <Link
                  href="/least-action/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300"
                >
                  <span>Probar estos motores en vivo en el Laboratorio de Mínima Acción →</span>
                </Link>
              </article>
            )}

            {/* ARTICLE: SCROLLTELLING */}
            {selectedArticle === 'arch-scroll' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-quantum">openwiki/architecture/scrollytelling-engine.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Arquitectura del Motor de Scrollytelling
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  La experiencia de scrollytelling en <code>quantum-origins</code> sincroniza la narración de 13 fases mediante un <strong>IntersectionObserver</strong> con un margen focal del 35%:
                </p>

                <div className="p-3 bg-bg rounded-lg border border-border font-mono text-xs text-quantum overflow-x-auto">
                  {`const observerOptions = {\n  root: null,\n  threshold: 0.35,\n  rootMargin: "-15% 0px -25% 0px"\n};`}
                </div>

                <p className="text-xs text-text-muted leading-relaxed">
                  Esto garantiza que al deslizar suavemente, el panel del <strong>Landau Companion</strong> cambie de volumen y sección al mismo tiempo que el simulador interactivo de cavidad ajusta su temperatura.
                </p>

                <Link
                  href="/quantum-origins/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-quantum hover:text-quantum-bright"
                >
                  <span>Ver Scrollytelling en acción en Orígenes Cuánticos →</span>
                </Link>
              </article>
            )}

            {/* ARTICLE: MATHTOGGLE */}
            {selectedArticle === 'arch-math' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-quantum">openwiki/architecture/math-and-notation.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Arquitectura de Notación & MathToggle
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Para franquear el choque cognitivo entre los libros introductorios y los tratados avanzados de Lev Landau, el conmutador de notación permite cambiar en caliente las fórmulas de todo el sitio:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-text-muted font-mono">
                        <th className="py-2">Magnitud</th>
                        <th className="py-2">Notación Estándar</th>
                        <th className="py-2">Notación Landau</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr>
                        <td className="py-2 font-medium">Cuanto de Luz</td>
                        <td className="py-2 font-mono text-text-muted">E = hν</td>
                        <td className="py-2 font-mono text-quantum">E = ħω</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Energía Térmica</td>
                        <td className="py-2 font-mono text-text-muted">k_B T</td>
                        <td className="py-2 font-mono text-quantum">T (en unidades de energía)</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Densidad de Planck</td>
                        <td className="py-2 font-mono text-text-muted">(8πhν³ / c³) / (e^(hν/kT) - 1)</td>
                        <td className="py-2 font-mono text-quantum">(ħω³ / π²c³) / (e^(ħω/T) - 1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            )}

            {/* ARTICLE: DOMAIN 01 LEAST ACTION */}
            {selectedArticle === 'dom-action' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-amber-400">openwiki/domains/01-classical-least-action.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Dominio: El Principio de Mínima Acción
                  </h2>
                </div>

                <div className="p-4 rounded-lg bg-surface-raised border border-border">
                  <h3 className="font-serif font-semibold text-sm mb-2 text-text-primary">
                    La Condición Variacional de Estacionariedad
                  </h3>
                  <div className="my-2">
                    <MathEq math="\delta S = \delta \int_{t_1}^{t_2} L(q, \dot{q}, t) \, dt = 0" />
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Deducción matemática completa que conduce a las <strong>Ecuaciones de Euler-Lagrange</strong>:
                  </p>
                  <div className="my-2">
                    <MathEq math="\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-xs font-mono uppercase text-text-muted">
                    El Teorema de Noether:
                  </h4>
                  <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
                    <li>Invariancia temporal &rarr; Conservación de la Energía <MathEq math="H" inline />.</li>
                    <li>Invariancia espacial &rarr; Conservación del Momento Lineal <MathEq math="\mathbf{P}" inline />.</li>
                    <li>Invariancia rotacional &rarr; Conservación del Momento Angular <MathEq math="\mathbf{L}" inline />.</li>
                  </ul>
                </div>

                <Link
                  href="/least-action/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300"
                >
                  <span>Abrir Artefacto Interactivo de Mínima Acción →</span>
                </Link>
              </article>
            )}

            {/* ARTICLE: DOMAIN 02 BLACKBODY */}
            {selectedArticle === 'dom-blackbody' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-quantum">openwiki/domains/02-quantum-origins-blackbody.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Dominio: Orígenes Cuánticos & Catástrofe UV
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  La divergencia de Rayleigh-Jeans (<MathEq math="u \propto \int \nu^2 d\nu \to \infty" inline />) obligó a postular que la energía no es continua, sino cuantizada en múltiplos enteros de <MathEq math="\hbar\omega" inline />.
                </p>

                <div className="p-4 rounded-lg bg-surface-raised border border-border">
                  <div className="my-2">
                    <MathEq math="u_\omega = \frac{\hbar\omega^3}{\pi^2 c^3} \frac{1}{e^{\hbar\omega/T} - 1}" />
                  </div>
                  <p className="text-[11px] text-text-muted mt-2">
                    Landau & Lifshitz, <em>Física Estadística</em> §63.
                  </p>
                </div>

                <Link
                  href="/quantum-origins/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-quantum hover:text-quantum-bright"
                >
                  <span>Abrir Artefacto Interactivo de Orígenes Cuánticos →</span>
                </Link>
              </article>
            )}

            {/* ARTICLE: DOMAIN 03 QFT */}
            {selectedArticle === 'dom-qft' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-purple-400">openwiki/domains/03-quantum-field-theory.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Dominio: Teoría Cuántica de Campos
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Cuando la relatividad especial se combina con la mecánica cuántica, el número de partículas ya no es constante (<MathEq math="E = mc^2" inline />). Las partículas materiales emergen como excitaciones colectivas cuantizadas de los campos:
                </p>

                <div className="p-4 rounded-lg bg-surface-raised border border-border space-y-2">
                  <MathEq math="[\hat{a}_{\mathbf{p}}, \hat{a}^\dagger_{\mathbf{k}}] = (2\pi)^3 \delta^{(3)}(\mathbf{p} - \mathbf{k})" />
                  <MathEq math="|\mathbf{p}\rangle = \sqrt{2\omega_{\mathbf{p}}} \hat{a}^\dagger_{\mathbf{p}} |0\rangle" />
                </div>

                <Link
                  href="/quantum-fields/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300"
                >
                  <span>Ver Hoja Interactiva de Campos Cuánticos →</span>
                </Link>
              </article>
            )}

            {/* ARTICLE: DOMAIN 04 QC */}
            {selectedArticle === 'dom-qc' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-emerald-400">openwiki/domains/04-quantum-computing-foundations.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Dominio: Fundamentos de Computación Cuántica
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Un qubit habita en la superficie de la Esfera de Bloch en el espacio de Hilbert bidimensional:
                </p>

                <div className="p-4 rounded-lg bg-surface-raised border border-border my-2">
                  <MathEq math="|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle" />
                </div>

                <p className="text-xs text-text-muted leading-relaxed">
                  Las compuertas unitarias (<MathEq math="U^\dagger U = I" inline />) manipulan las fases cuánticas para que los caminos incorrectos se anulen destructivamente, acelerando exponencialmente los cómputos.
                </p>

                <Link
                  href="/quantum-computing/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300"
                >
                  <span>Abrir Laboratorio de la Esfera de Bloch →</span>
                </Link>
              </article>
            )}

            {/* ARTICLE: LANDAU COMPENDIUM */}
            {selectedArticle === 'res-landau' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-landau">openwiki/resources/landau-lifshitz-compendium.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Compendio del Curso de Física Teórica (Landau & Lifshitz)
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  El repositorio incluye en la carpeta local <code>/Bibliography</code> los 10 volúmenes íntegros del legendario Curso de Física Teórica:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-surface-raised border border-border flex justify-between items-center">
                    <div><strong>Vol. 1: Mecánica</strong> — Base variacional y hamiltoniana</div>
                    <span className="font-mono text-text-muted text-[11px]">Landau, Vol 1.pdf</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-raised border border-border flex justify-between items-center">
                    <div><strong>Vol. 2: Teoría Clásica de Campos</strong> — Relatividad y gravitación</div>
                    <span className="font-mono text-text-muted text-[11px]">Landau, Vol 2.pdf</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-raised border border-border flex justify-between items-center">
                    <div><strong>Vol. 3: Mecánica Cuántica</strong> — Operadores y matriz densidad</div>
                    <span className="font-mono text-text-muted text-[11px]">Landau, Vol 3.pdf</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-raised border border-border flex justify-between items-center">
                    <div><strong>Vol. 4: Teoría Cuántica Relativista</strong> — Fotones y campos cuánticos</div>
                    <span className="font-mono text-text-muted text-[11px]">Landau, Vol 4.pdf</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-raised border border-border flex justify-between items-center">
                    <div><strong>Vol. 5: Física Estadística (Parte 1)</strong> — Radiación cuerpo negro §63</div>
                    <span className="font-mono text-text-muted text-[11px]">Landau, Vol 5.pdf</span>
                  </div>
                </div>
              </article>
            )}

            {/* ARTICLE: BIBLIOGRAPHY */}
            {selectedArticle === 'res-biblio' && (
              <article className="space-y-6 animate-fadeIn">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-mono text-quantum">openwiki/resources/bibliography.md</span>
                  <h2 className="text-2xl font-serif font-bold mt-1">
                    Artículos Seminales & Literatura Citada
                  </h2>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-text-secondary">
                  <div className="p-3 rounded-lg bg-surface-raised border border-border">
                    <strong className="text-text-primary">Max Planck (1900):</strong> <em>"Zur Theorie des Gesetzes der Energieverteilung im Normalspektrum"</em>. Presentación formal del cuanto de acción \( h \).
                  </div>
                  <div className="p-3 rounded-lg bg-surface-raised border border-border">
                    <strong className="text-text-primary">Albert Einstein (1905):</strong> <em>"Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt"</em>. Cuantos de luz y efecto fotoeléctrico.
                  </div>
                  <div className="p-3 rounded-lg bg-surface-raised border border-border">
                    <strong className="text-text-primary">Emmy Noether (1918):</strong> <em>"Invariante Variationsprobleme"</em>. El puente matemático entre simetrías y leyes de conservación.
                  </div>
                  <div className="p-3 rounded-lg bg-surface-raised border border-border">
                    <strong className="text-text-primary">Richard Feynman (1948):</strong> <em>"Space-Time Approach to Non-Relativistic Quantum Mechanics"</em>. Integrales de camino y sumatoria sobre todas las historias.
                  </div>
                </div>
              </article>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
