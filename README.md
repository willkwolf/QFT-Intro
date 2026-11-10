# ⚛️ QuantumAtlas & QFT-Intro

> **Atlas Interactivo de Física Teórica & Computación Cuántica**  
> Un viaje continuo de aprendizaje: desde la Geometría y el Principio de Mínima Acción hasta la Teoría Cuántica de Campos y la Computación Cuántica.  
> Con el rigor analítico del *Curso de Física Teórica* de **L. D. Landau & E. M. Lifshitz**.

---

## 🌐 Sitio Web en Vivo (GitHub Pages)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Website-success?style=for-the-badge&logo=github)](https://willkwolf.github.io/QFT-Intro/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-React%2019-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![OpenWiki OKF](https://img.shields.io/badge/OpenWiki-OKF%20Architecture-blueviolet?style=for-the-badge)](https://willkwolf.github.io/QFT-Intro/openwiki/)

### 🔗 Enlace directo: **[https://willkwolf.github.io/QFT-Intro/](https://willkwolf.github.io/QFT-Intro/)**

---

## 🗺️ Mapa de Artefactos de Estudio Interactivos

El sitio está estructurado como un compendio multipágina de hojas interactivas donde cada módulo aborda una etapa de la física moderna:

| Módulo | Enlace en Vivo | Descripción & Simuladores |
|---|---|---|
| **🏠 Portal Central** | [Ver Portal](https://willkwolf.github.io/QFT-Intro/) | Dashboard de navegación del Atlas, hoja de ruta pedagógica y resumen general. |
| **⚛️ 01. Orígenes Cuánticos** | [Ver Módulo 01](https://willkwolf.github.io/QFT-Intro/quantum-origins/) | Scrollytelling de 13 fases: Catástrofe Ultravioleta, Ley de Wien, Rayleigh-Jeans, Hipótesis de Planck, Simulador del Efecto Fotoeléctrico, conmutador de notación **MathToggle** y panel de citas del **Landau Companion**. |
| **📐 02. Mínima Acción** | [Ver Módulo 02](https://willkwolf.github.io/QFT-Intro/least-action/) | Historia profunda del principio variacional (Fermat $\to$ Maupertuis $\to$ Euler-Lagrange $\to$ Hamilton $\to$ Noether $\to$ Feynman). Incluye 3 simuladores Canvas: refracción de Snell interactiva con arrastre, espacio de fases $(\theta, p_\theta)$ del péndulo, y sumatoria de fasores de caminos cuánticos. |
| **🌌 03. Campos Cuánticos (QFT)** | [Ver Módulo 03](https://willkwolf.github.io/QFT-Intro/quantum-fields/) | Fundamentos de segunda cuantización: ¿por qué los campos son primarios sobre las partículas? Simulador en tiempo real de **fluctuaciones cuánticas de punto cero** del vacío escalar y operadores escalera. |
| **🔮 04. Computación Cuántica** | [Ver Módulo 04](https://willkwolf.github.io/QFT-Intro/quantum-computing/) | De los operadores al qubit: visualizador 3D interactivo de la **Esfera de Bloch**, aplicación de compuertas unitarias ($H, X, Z$) y cálculo de probabilidades de colapso de medición. |
| **📖 OpenWiki Explorer** | [Abrir OpenWiki](https://willkwolf.github.io/QFT-Intro/openwiki/) | Visor interactivo integrado en la web para consultar la documentación desacoplada de arquitectura, dominios formales y compendio de Landau. |
| **📜 Scrolltelling Clásico** | [Ver Versión Clásica](https://willkwolf.github.io/QFT-Intro/legacy/index.html) | Scrolltelling original standalone en HTML/JS con canvas de espaciotiempo y MathJax. |

---

## 📚 Arquitectura OpenWiki (Open Knowledge Format - OKF)

Para evitar la dispersión de archivos markdown aislados y desacoplar la ingeniería de visualización de los teoremas matemáticos, toda la documentación del repositorio se gestiona estrictamente en la carpeta [`openwiki/`](openwiki/INDEX.md):

```
openwiki/
├── INDEX.md                               # Índice central y mapa de conceptos
├── architecture/                          # INGENIERÍA DE ANIMACIONES Y VISUALIZACIÓN
│   ├── interactive-simulations.md         # Motores SVG y Canvas, integradores de Euler-Cromer y fasores
│   ├── scrollytelling-engine.md           # Observadores de scroll y sincronización de paneles
│   └── math-and-notation.md               # Renderizado matemático KaTeX/MathJax y sistema MathToggle
├── domains/                               # DOMINIOS DEL CONOCIMIENTO FORMAL
│   ├── 01-classical-least-action.md       # De Fermat y Maupertuis a Euler-Lagrange, Hamilton y Noether
│   ├── 02-quantum-origins-blackbody.md    # Catástrofe UV, distribución de Planck y Landau Vol. 5 §63
│   ├── 03-quantum-field-theory.md         # Segunda cuantización y partículas como excitaciones
│   └── 04-quantum-computing-foundations.md# Qubits, transformaciones unitarias y entrelazamiento
└── resources/                             # RECURSOS PRIMARIOS Y CITAS
    ├── landau-lifshitz-compendium.md      # Guía de los 10 volúmenes del Curso de Física Teórica
    └── bibliography.md                    # Artículos seminales (Planck 1900, Einstein 1905, etc.)
```

---

## 📖 Compendio Landau & Lifshitz en el Repositorio

El repositorio incluye en formato PDF los **10 volúmenes completos** del legendario *Curso de Física Teórica* de L. D. Landau y E. M. Lifshitz dentro del directorio local [`Bibliography/`](Bibliography/):

1. **Vol. 1:** *Mecánica*
2. **Vol. 2:** *Teoría Clásica de los Campos*
3. **Vol. 3:** *Mecánica Cuántica (No Relativista)*
4. **Vol. 4:** *Teoría Cuántica Relativista*
5. **Vol. 5:** *Física Estadística (Parte 1)*
6. **Vol. 6:** *Mecánica de Fluidos*
7. **Vol. 7:** *Teoría de la Elasticidad*
8. **Vol. 8:** *Electrodinámica de Medios Continuos*
9. **Vol. 9:** *Física Estadística (Parte 2)*
10. **Vol. 10:** *Cinética Física*

---

## 🛠️ Cómo Añadir Nuevas Hojas de Estudio

Este repositorio está concebido para crecer modularmente según las dudas e inquietudes que surjan en el aprendizaje:

1. **Formalizar el dominio:** Redacta la deducción teórica y citas en `openwiki/domains/XX-[tema].md`.
2. **Construir la hoja interactiva:** Implementa `src/app/[tema]/page.tsx` combinando narrativa, fórmulas con `<MathEq />` y simuladores visuales.
3. **Registrar la navegación:** Agrega la ruta en `src/components/Navigation.tsx` y en el Dashboard de `src/app/page.tsx`.
4. **Verificar compilación:** Ejecuta `npm run build` para comprobar que la página estática se genera sin errores.

---

## 💻 Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo interactivo (localhost:3000)
npm run dev

# 3. Compilación estática local (genera ./out)
npm run build
```

---

## 🚀 Despliegue Automatizado

Cada `push` a la rama `main` activa el workflow de GitHub Actions en [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), el cual compila la aplicación y despliega la exportación estática directamente en GitHub Pages.
