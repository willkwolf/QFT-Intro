# Protocolo de Agentes AI — Repositorio QuantumAtlas & QFT-Intro

> **Propósito:** Guía de navegación, desarrollo y mantenimiento para agentes de IA (Antigravity, Claude Code, Cursor, Codex).  
> **Arquitectura:** Open Knowledge Format (OKF) + Next.js App Router (Static Export) + OpenWiki.

---

## 1. Misión del Repositorio

Este repositorio es un **Atlas Interactivo de Física Teórica y Computación Cuántica**, diseñado como un espacio continuo de estudio donde se construyen progresivamente artefactos interactivos (hojas de scrollytelling, simuladores físicos y notas rigurosas basadas en el *Curso de Física Teórica de Landau & Lifshitz*).

---

## 2. Arquitectura de Navegación & Páginas

El proyecto está configurado para compilar como un sitio estático multipágina desplegable en **GitHub Pages** (`output: 'export'`):

| Ruta | Descripción | Archivo Fuente |
|---|---|---|
| `/` | Dashboard / Portal Central del Atlas | `src/app/page.tsx` |
| `/quantum-origins/` | 01. Orígenes Cuánticos (Catástrofe UV, Planck, Fotoeléctrico, Landau Companion) | `src/app/quantum-origins/page.tsx` |
| `/least-action/` | 02. Principio de Mínima Acción (Fermat, Euler-Lagrange, Espacio de Fases, Feynman) | `src/app/least-action/page.tsx` |
| `/quantum-fields/` | 03. Teoría Cuántica de Campos (QFT) | `src/app/quantum-fields/page.tsx` |
| `/quantum-computing/` | 04. Computación Cuántica & Esfera de Bloch | `src/app/quantum-computing/page.tsx` |
| `/openwiki/` | Visor Interactivo de la Base de Conocimiento OpenWiki | `src/app/openwiki/page.tsx` |
| `/legacy/index.html` | Scrolltelling Clásico Standalone (HTML/JS/Canvas) | `public/legacy/index.html` |

---

## 3. Estructura OpenWiki (`/openwiki`)

Para mantener el desacoplamiento entre el código gráfico y las derivaciones analíticas:
- `openwiki/architecture/`: Documenta los motores de simulación (Canvas 2D / SVG), algoritmos de integración simpléctica y el renderizador KaTeX/MathToggle.
- `openwiki/domains/`: Documenta las deducciones matemáticas formales, teoremas y leyes físicas.
- `openwiki/resources/`: Guía de los 10 volúmenes de Landau & Lifshitz (PDFs en `/Bibliography`) y literatura seminal.

---

## 4. Cómo Crear un Nuevo Artefacto de Estudio

Cuando el usuario pida desarrollar un nuevo tema interactivo:
1. **Paso 1 (Dominio Formal):** Redactar en `openwiki/domains/XX-[nombre].md` la deducción física formal, citas de Landau y formulación matemática.
2. **Paso 2 (Página Interactiva):** Crear `src/app/[nombre]/page.tsx` integrando texto riguroso, fórmulas con KaTeX (`<MathEq />`), y simulaciones visuales (SVG o Canvas).
3. **Paso 3 (Navegación):** Registrar la nueva ruta en `src/components/Navigation.tsx` y en la lista `studyModules` de `src/app/page.tsx`.
4. **Paso 4 (Verificación):** Ejecutar `npm run build` para asegurar que el empaquetado estático genere el archivo HTML sin errores.
