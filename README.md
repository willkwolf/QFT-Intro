# ⚛️ QuantumAtlas & QFT-Intro

[![Live Site](https://img.shields.io/badge/Live_Site-GitHub_Pages-22c55e?style=flat-square&logo=github)](https://willkwolf.github.io/QFT-Intro/)
[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub_Actions-38bdf8?style=flat-square&logo=github-actions)](https://github.com/willkwolf/QFT-Intro/actions)
[![Architecture](https://img.shields.io/badge/Architecture-OpenWiki_OKF-a855f7?style=flat-square)](https://willkwolf.github.io/QFT-Intro/openwiki/)

**English:** An interactive theoretical physics and quantum computing atlas designed as a continuous study notebook. It bridges Classical Geometry, the Principle of Least Action, Quantum Origins, Quantum Field Theory (QFT), and Quantum Computing, supported by the *Course of Theoretical Physics* by **L. D. Landau & E. M. Lifshitz**.

**Español:** Atlas interactivo de física teórica y computación cuántica concebido como un cuaderno de estudio continuo. Conecta la Geometría Clásica, el Principio de Mínima Acción, los Orígenes Cuánticos, la Teoría Cuántica de Campos (QFT) y la Computación Cuántica, fundamentado en el *Curso de Física Teórica* de **L. D. Landau y E. M. Lifshitz**.

🌐 **Sitio Web en Vivo:** **[https://willkwolf.github.io/QFT-Intro/](https://willkwolf.github.io/QFT-Intro/)**

---

## 🗺️ Hojas de Estudio Interactivas / Interactive Modules

| Módulo | Acceso en Vivo | Contenido & Simuladores |
|---|---|---|
| **🏠 Portal Central** | [Abrir Portal](https://willkwolf.github.io/QFT-Intro/) | Atlas Dashboard, roadmap formativo y visión general. |
| **⚛️ 01. Orígenes Cuánticos** | [Ver Módulo 01](https://willkwolf.github.io/QFT-Intro/quantum-origins/) | Catástrofe UV, Ley de Planck, Simulador Fotoeléctrico, MathToggle y Landau Companion. |
| **📐 02. Mínima Acción** | [Ver Módulo 02](https://willkwolf.github.io/QFT-Intro/least-action/) | De Fermat y Maupertuis a Euler-Lagrange, Hamilton y fasores cuánticos de Feynman. |
| **🌌 03. Campos Cuánticos (QFT)** | [Ver Módulo 03](https://willkwolf.github.io/QFT-Intro/quantum-fields/) | Fluctuaciones de vacío, segunda cuantización y operadores escalera. |
| **🔮 04. Computación Cuántica** | [Ver Módulo 04](https://willkwolf.github.io/QFT-Intro/quantum-computing/) | Esfera de Bloch interactiva en 3D, compuertas unitarias ($H, X, Z$) y probabilidades de medición. |
| **📖 OpenWiki Explorer** | [Abrir OpenWiki](https://willkwolf.github.io/QFT-Intro/openwiki/) | Base de conocimiento desacoplada (arquitectura, dominios formales y compendio bibliográfico). |
| **📜 Scrolltelling Clásico** | [Ver Versión Clásica](https://willkwolf.github.io/QFT-Intro/legacy/index.html) | Scrolltelling original en HTML/Canvas con rejilla espaciotemporal. |

---

## 🤖 Habilidad para Agentes AI & Orquestadores (Agent Skill)

Este repositorio incluye una habilidad estándar para agentes en [`skills/openwiki-architecture/SKILL.md`](skills/openwiki-architecture/SKILL.md), diseñada como contrato arquitectónico complementario para orquestadores y agentes de ingeniería (ej. [product-engineering](https://github.com/phuryn/product-engineering) en fases de propuesta y diseño de sistemas):

- **Separación de Capas:** Aísla motores gráficos (`architecture/`), deducciones formales (`domains/`) y fuentes primarias (`resources/`).
- **Instalación Rápida:**
  - **Google Antigravity:** Copiar `skills/openwiki-architecture` a `.agent/skills/`.
  - **Claude Code:** Copiar `skills/openwiki-architecture` a `.claude/skills/`.
  - **OpenAI Codex / OpenHarness:** Copiar a `.agents/skills/`.

---

## 💻 Desarrollo Local / Local Development

```bash
npm install     # Instalar dependencias
npm run dev     # Servidor local en http://localhost:3000
npm run build   # Compilación estática para producción (./out)
```

---

## 📚 Bibliografía / Bibliography

Los 10 volúmenes del *Curso de Física Teórica* de Landau & Lifshitz se encuentran disponibles en formato PDF en el directorio local [`Bibliography/`](Bibliography/).
