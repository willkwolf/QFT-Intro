# ⚛️ QuantumAtlas & QFT-Intro

> **Un viaje interactivo y riguroso por la física teórica:** De la Geometría y el Principio de Mínima Acción a la Teoría Cuántica de Campos y la Computación Cuántica.  
> Integrado con la obra maestra de **L. D. Landau & E. M. Lifshitz** (*Curso de Física Teórica*).

---

## 🌟 Características Principales

*   **Repositorio & Sitio Integrado Multipágina:** Desplegable automáticamente en **GitHub Pages** mediante GitHub Actions.
*   **Navegación Unificada:** Un único portal que permite saltar fluidamente entre artefactos interactivos de estudio.
*   **01. Orígenes Cuánticos (`/quantum-origins`):** Scrollytelling de 13 secciones trazando el colapso de la física clásica (Catástrofe Ultravioleta, Leyes de Wien y Rayleigh-Jeans, Hipótesis Cuántica de Planck, Efecto Fotoeléctrico, MathToggle y el panel interactivo *Landau Companion*).
*   **02. Principio de Mínima Acción (`/least-action`):** Estudio analítico e interactivo de la historia variacional:
    *   *Laboratorio de Fermat:* Refracción de Snell arrastrable con cálculo en tiempo real del tiempo mínimo de viaje.
    *   *Laboratorio de Lagrange:* Péndulo no lineal y trazado de órbitas cerradas en el espacio de fases $(\theta, p_\theta)$.
    *   *Laboratorio de Feynman:* Suma de caminos cuánticos con diagramas de fasores complejos en interferencia.
*   **03. Teoría Cuántica de Campos (`/quantum-fields`):** Visualizador de fluctuaciones de vacío del campo cuántico escalar y operadores de creación.
*   **04. Computación Cuántica (`/quantum-computing`):** Laboratorio de la Esfera de Bloch, compuertas unitarias ($H, X, Z$) y cálculo dinámico de probabilidades de medición.
*   **Arquitectura OpenWiki (`/openwiki`):** Separación limpia entre la ingeniería de animaciones (`openwiki/architecture/`), los dominios del conocimiento formal (`openwiki/domains/`) y los recursos bibliográficos (`openwiki/resources/`).
*   **Biblioteca Landau & Lifshitz:** Los 10 volúmenes del Curso de Física Teórica preservados en la carpeta `Bibliography/` para consulta directa.

---

## 🚀 Despliegue en GitHub Pages

El proyecto incluye un flujo de trabajo de GitHub Actions en `.github/workflows/deploy.yml` que:
1. Instala dependencias con `npm ci`.
2. Compila la exportación estática multipágina con `npm run build`.
3. Despliega la carpeta resultante `./out` en GitHub Pages con soporte de subruta automática.

---

## 💻 Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en localhost:3000
npm run dev

# 3. Compilar exportación estática localmente
npm run build
```

---

## 📂 Estructura del Repositorio

```
QFT-intro/
├── .github/workflows/deploy.yml       # Flujo de CI/CD para GitHub Pages
├── Bibliography/                      # 10 Volúmenes originales de Landau & Lifshitz (PDF)
├── openwiki/                          # Base de Conocimiento OpenWiki (OKF)
│   ├── INDEX.md
│   ├── architecture/                  # Motores de simulación, scrollytelling y notación
│   ├── domains/                       # Deducciones analíticas (Mínima Acción, Cuerpo Negro, QFT, QC)
│   └── resources/                     # Guía de volúmenes de Landau y bibliografía
├── public/                            # Activos estáticos y versión standalone clásica
│   └── legacy/                        # Scrolltelling autónomo original en HTML/Canvas
├── src/
│   ├── app/
│   │   ├── page.tsx                   # Portal Central / Dashboard
│   │   ├── quantum-origins/page.tsx   # 01. Orígenes Cuánticos
│   │   ├── least-action/page.tsx      # 02. Principio de Mínima Acción
│   │   ├── quantum-fields/page.tsx    # 03. Teoría Cuántica de Campos
│   │   ├── quantum-computing/page.tsx # 04. Computación Cuántica
│   │   └── openwiki/page.tsx          # Visor en-app de OpenWiki
│   ├── components/                    # Math, Navigation, MathToggle, LandauCompanion, etc.
│   └── context/                       # NotationContext (Estándar vs. Landau)
├── AGENTS.md                          # Guía para agentes de IA
└── README.md
```
