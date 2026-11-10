# OpenWiki — Base de Conocimiento & Arquitectura

> **Estándar:** Open Knowledge Format (OKF)  
> **Repositorio:** `willkwolf/QFT-Intro`  
> **Objetivo:** Administrar de manera modular y desacoplada la arquitectura de animaciones, los dominios del conocimiento formal en física teórica y el compendio de recursos/bibliografía.

---

## 🗺️ Mapa de la Base de Conocimiento

```
openwiki/
├── INDEX.md                               # Este índice central
├── architecture/                          # ARQUITECTURA TÉCNICA DE ANIMACIONES Y SIMULACIÓN
│   ├── interactive-simulations.md         # Motores SVG y Canvas 2D, integración numérica (Euler/Runge-Kutta)
│   ├── scrollytelling-engine.md           # Observadores de intersección, estados reactivos y navegación por scroll
│   └── math-and-notation.md               # KaTeX, MathJax, MathToggle (Escuela vs. Landau)
├── domains/                               # DOMINIOS DEL CONOCIMIENTO FORMAL
│   ├── 01-classical-least-action.md       # De Fermat y Maupertuis a Lagrange, Hamilton y Noether
│   ├── 02-quantum-origins-blackbody.md    # Catástrofe UV, Ley de Planck, fotones y Landau Vol. 5 §63
│   ├── 03-quantum-field-theory.md         # Segunda cuantización, operadores escalera, integrales de camino
│   └── 04-quantum-computing-foundations.md# Esfera de Bloch, qubits, transformaciones unitarias y entrelazamiento
└── resources/                             # RECURSOS, BIBLIOGRAFÍA Y CITAS
    ├── landau-lifshitz-compendium.md      # Guía de los 10 volúmenes del Curso de Física Teórica
    └── bibliography.md                    # Papers fundacionales, artículos históricos y enlaces clave
```

---

## 🏛️ Filosofía de Separación Arquitectónica

Siguiendo el principio de **OpenWiki**, ningún documento formal de física debe verse contaminado por detalles de implementación de código gráfico (como manipulación de DOM o bucles de `requestAnimationFrame`). De igual modo, los motores de visualización se documentan como componentes de ingeniería de software reutilizables e independientes del contenido específico de una lección.

### 1. Capa de Arquitectura (`openwiki/architecture/`)
Define los contratos técnicos para crear y mantener artefactos interactivos de estudio:
- Cómo renderizar simulaciones físicas a 60 FPS sin fugas de memoria.
- Cómo sincronizar la narrativa de scrollytelling con el estado de los controles interactivos.
- Cómo garantizar que las ecuaciones matemáticas se compilen con delimitadores seguros tanto en SSR como en hidratación de cliente.

### 2. Capa de Conocimiento Formal (`openwiki/domains/`)
Preserva el rigor académico de la física teórica y la computación cuántica:
- Demostraciones analíticas paso a paso.
- Comparación de notaciones (notación estándar de pregrado vs. notación teórica de Landau & Lifshitz).
- Intuición geométrica antes del formalismo algebraico.

### 3. Capa de Recursos (`openwiki/resources/`)
Referencia el material primario disponible en el repositorio (incluyendo los PDFs originales de Landau & Lifshitz en `/Bibliography`) y literatura seminal citada en los simuladores.

---

## 🚀 Cómo Añadir un Nuevo Artefacto de Estudio

Para añadir un nuevo tema o hoja interactiva al repositorio:
1. **Crear el dominio conceptual:** Añadir un archivo `openwiki/domains/XX-[nombre-del-tema].md` con la deducción formal y citas.
2. **Implementar la ruta interactiva:** Crear `src/app/[nombre-del-tema]/page.tsx` reutilizando los componentes de `src/components/` (`Math`, `NotationContext`, etc.).
3. **Vincular en la navegación global:** Añadir el enlace en `src/components/Navigation.tsx` y en el Dashboard de `src/app/page.tsx`.
4. **Actualizar el índice de OpenWiki:** Registrar el nuevo artefacto en este archivo.
