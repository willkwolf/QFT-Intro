# Arquitectura de Notación Matemática & Renderizado

> **Categoría:** Arquitectura Técnica  
> **Ubicación:** `openwiki/architecture/math-and-notation.md`

Este documento describe el sistema de renderizado matemático y el conmutador de notaciones (**MathToggle**).

---

## 1. Motor de Renderizado: KaTeX vs MathJax

- **KaTeX:** Utilizado en la aplicación principal Next.js por su velocidad de renderizado sincrónico en milisegundos y cero impacto en el hilo principal durante el scroll.
- **MathJax 3:** Empleado en el scrollytelling autónomo legado (`public/legacy/index.html`) mediante CDN con soporte completo para extensiones de física teórica como `physics` y `braket`.

---

## 2. Sistema MathToggle: Notación Escolar vs. Notación de Landau

Uno de los principales obstáculos en la transición desde la física de pregrado hacia la física teórica formal es el choque de notaciones. Para superar esta barrera pedagógica, el repositorio implementa un contexto global de React (`NotationContext`):

```typescript
export type NotationMode = 'standard' | 'landau';
```

### Tabla de Equivalencias Fundamentales

| Concepto Físico | Notación Estándar (Escolar) | Notación Teórica (L. Landau) | Justificación de Landau |
|---|---|---|---|
| **Energía del Cuanto** | $E = h \nu$ | $E = \hbar \omega$ | La frecuencia angular $\omega = 2\pi\nu$ simplifica las integrales de Fourier y el conmutador cuántico $[x, p] = i\hbar$. |
| **Constante de Boltzmann** | $k_B$ explícita ($k_B T$) | $T$ medida directamente en unidades de energía | En física teórica la temperatura es una energía media por grado de libertad; $k_B$ es un mero factor de conversión histórico. |
| **Densidad Espectral de Planck** | $\rho(\nu, T) = \frac{8\pi h \nu^3}{c^3} \frac{1}{e^{h\nu/k_BT} - 1}$ | $u_\omega = \frac{\hbar \omega^3}{\pi^2 c^3} \frac{1}{e^{\hbar\omega/T} - 1}$ | Factor $\frac{1}{\pi^2}$ derivado directamente de la densidad de estados en el espacio de fase de ondas electromagnéticas (§63 de *Física Estadística*). |
| **Acción** | $S = \int L \, dt$ | $S = \int L \, dt$ | Coincidente, base de la formulación variacional. |

---

## 3. Uso del Componente `<MathEq />`

```tsx
import MathEq from '@/components/Math';

// Renderizado inline
<MathEq math="E = \hbar\omega" inline />

// Renderizado en bloque (display mode)
<MathEq math="S = \int_{t_1}^{t_2} L(q, \dot{q}, t) \, dt" />
```
