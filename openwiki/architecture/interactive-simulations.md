# Arquitectura de Simulaciones Interactivas & Motores Gráficos

> **Categoría:** Arquitectura Técnica  
> **Ubicación:** `openwiki/architecture/interactive-simulations.md`

Este documento describe la arquitectura empleada en los simuladores interactivos del repositorio, separando la física computacional del pipeline de renderizado gráfico.

---

## 1. Patrones de Renderizado Soportados

El repositorio utiliza dos motores principales según las necesidades pedagógicas de cada módulo:

| Motor | Módulos | Casos de Uso | Ventajas |
|---|---|---|---|
| **SVG Interactivo + D3 / React** | `quantum-origins` | Curvas de Planck, cavidad de cuerpo negro, rampa discreta, circuito fotoeléctrico | Máxima nitidez vectorial, accesibilidad, manipulación declarativa con React |
| **HTML5 Canvas 2D + requestAnimationFrame** | `least-action`, `quantum-fields`, `quantum-computing` | Espacio de fases del péndulo, refracción de Fermat con arrastre, fasores de Feynman, fluctuaciones de vacío | Alto rendimiento para cientos de partículas o trayectorias complejas |

---

## 2. Pipeline de Integración Numérica Física

Para garantizar estabilidad numérica y precisión en las simulaciones continuas (ej. péndulo no lineal en el espacio de fases), se implementan algoritmos simplécticos:

### Integrador Euler-Cromer (Semi-implícito)
A diferencia de Euler explícito ordinario (que acumula energía artificialmente y hace que las órbitas diverjan en el espacio de fases), Euler-Cromer conserva la energía en promedio y mantiene órbitas cerradas estables:

```typescript
// Actualizar velocidad con aceleración en t
const alpha = -(g / L) * Math.sin(theta) - damping * omega;
omega += alpha * dt;

// Actualizar posición con la NUEVA velocidad calculada
theta += omega * dt;
```

### Límites de Delta Time (`dt`)
Para evitar saltos numéricos gigantescos cuando el usuario cambia de pestaña en el navegador y regresa:
```typescript
let dt = (now - lastTime) / 1000;
if (dt > 0.1) dt = 0.1; // Clamp de estabilidad
```

---

## 3. Arquitectura del Espacio de Fases

En el módulo de Mínima Acción (`src/app/least-action/page.tsx`), el lienzo se subdivide en dos representaciones simultáneas:
1. **Espacio de Configuración:** Posición real del péndulo en coordenadas cartesianas/polares $(x, y) = (L\sin\theta, L\cos\theta)$.
2. **Espacio de Fases Hamiltoniano:** Gráfico de fase $(\theta, p_\theta)$ donde cada ciclo del péndulo forma una elipse cerrada de área invariante, demostrando visualmente el **Teorema de Liouville**.

---

## 4. Suma de Fasores Cuánticos de Feynman

Para simular la integral de caminos $\mathcal{K} = \sum e^{i S_k / \hbar}$:
1. Se generan $N$ caminos estocásticos entre un emisor $A$ y un detector $B$.
2. Para cada camino $k$, se calcula la acción $S_k$ aproximada por su longitud de arco:
   $$S_k \propto \int \sqrt{1 + \dot{x}^2} \, dt$$
3. Cada camino contribuye con un número complejo unitario con ángulo de fase:
   $$\phi_k = \frac{S_k}{\hbar}$$
4. En el lienzo se acumulan los vectores complejos punta-a-cola (*tip-to-tail*):
   $$\mathbf{r}_{\text{net}} = \sum_{k=1}^N \begin{pmatrix} \cos\phi_k \\ \sin\phi_k \end{pmatrix}$$
5. La amplitud física observable es la magnitud resultante al cuadrado: $P \propto |\mathbf{r}_{\text{net}}|^2$. Cuando $\hbar \to 0$, las fases aleatorias cancelan todos los caminos excepto el que estaciona la acción ($\delta S = 0$).
