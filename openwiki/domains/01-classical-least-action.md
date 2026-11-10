# Dominio Formal: El Principio de Mínima Acción & Mecánica Analítica

> **Categoría:** Conocimiento Formal  
> **Ubicación:** `openwiki/domains/01-classical-least-action.md`  
> **Referencias:** Landau & Lifshitz, *Mecánica* (Volumen 1, §1, §2, §6, §40).

---

## 1. La Visión Histórica y Teleológica

Tradicionalmente, la mecánica newtoniana describe el movimiento mediante una formulación **diferencial local**: en cada instante de tiempo infinitesimal $dt$, las fuerzas aplicadas $\mathbf{F}$ dictan la aceleración instantánea $\frac{d^2\mathbf{r}}{dt^2}$.

En contraste, el **Principio de Mínima Acción** (o principio de acción estacionaria) proporciona una descripción **integral global**: entre todos los caminos imaginables que unen un punto inicial $A(t_1)$ con un punto final $B(t_2)$, la trayectoria física real es aquella que hace **estacionaria** una magnitud escalar global llamada **Acción** ($S$).

### Hitos Históricos Fundacionales
1. **Hero de Alejandría (siglo I d.C.):** La luz toma el camino de longitud mínima en la reflexión en espejos.
2. **Pierre de Fermat (1662):** La luz no minimiza la distancia, sino el **tiempo de viaje**:
   $$t = \int \frac{ds}{v} = \frac{1}{c} \int n(\mathbf{r}) \, ds$$
   De aquí se deduce rigurosamente la Ley de Refracción de Snell:
   $$n_1 \sin\theta_1 = n_2 \sin\theta_2$$
3. **Pierre Louis Maupertuis (1744):** Propone extender el principio de optimización a toda la materia:
   $$S = \int m v \, ds \quad \text{es mínimo}$$
4. **Leonhard Euler (1744) & Joseph-Louis Lagrange (1788):** Formalizan el cálculo de variaciones, eliminando la necesidad de recurrir a fuerzas o poleas ficticias.
5. **William Rowan Hamilton (1834):** Enuncia el principio en su forma moderna y desarrolla la mecánica canónica en el espacio de fases.

---

## 2. Formulación Matemática Rigurosa

### 2.1 El Lagrangiano y la Acción
Dado un sistema con $s$ grados de libertad descritos por coordenadas generalizadas $q = (q_1, \dots, q_s)$ y velocidades generalizadas $\dot{q} = (\dot{q}_1, \dots, \dot{q}_s)$, el estado mecánico en cualquier instante está unívocamente determinado por el **Lagrangiano**:
$$L(q, \dot{q}, t) = T(q, \dot{q}) - V(q)$$

La **Acción** $S$ es la integral temporal de este Lagrangiano:
$$S[q(t)] = \int_{t_1}^{t_2} L(q, \dot{q}, t) \, dt$$

### 2.2 Deducción de las Ecuaciones de Euler-Lagrange
Sea $q(t)$ la trayectoria física real. Consideremos una variación infinitesimal $\delta q(t)$ sujeta a extremos fijos:
$$\delta q(t_1) = \delta q(t_2) = 0$$

La variación de primer orden de la acción es:
$$\delta S = \int_{t_1}^{t_2} \left[ \sum_{i=1}^s \left( \frac{\partial L}{\partial q_i} \delta q_i + \frac{\partial L}{\partial \dot{q}_i} \delta \dot{q}_i \right) \right] dt$$

Notando que $\delta \dot{q}_i = \frac{d}{dt}(\delta q_i)$ e integrando por partes el segundo sumando:
$$\int_{t_1}^{t_2} \frac{\partial L}{\partial \dot{q}_i} \frac{d}{dt}(\delta q_i) \, dt = \left[ \frac{\partial L}{\partial \dot{q}_i} \delta q_i \right]_{t_1}^{t_2} - \int_{t_1}^{t_2} \frac{d}{dt}\left( \frac{\partial L}{\partial \dot{q}_i} \right) \delta q_i \, dt$$

El término de frontera se anula idénticamente porque $\delta q(t_1) = \delta q(t_2) = 0$. Por consiguiente:
$$\delta S = \int_{t_1}^{t_2} \sum_{i=1}^s \left[ \frac{\partial L}{\partial q_i} - \frac{d}{dt}\left( \frac{\partial L}{\partial \dot{q}_i} \right) \right] \delta q_i \, dt = 0$$

Como esta condición debe cumplirse para cualquier variación arbitraria e independiente $\delta q_i(t)$, cada corchete debe anularse por separado:
$$\frac{d}{dt}\left( \frac{\partial L}{\partial \dot{q}_i} \right) - \frac{\partial L}{\partial q_i} = 0 \quad (i = 1, \dots, s)$$

---

## 3. Mecánica Hamiltoniana & Espacio de Fases

Lagrange opera con $s$ ecuaciones diferenciales de **segundo orden** en el espacio de configuración $(q_i, \dot{q}_i)$. Hamilton transforma el sistema en $2s$ ecuaciones diferenciales de **primer orden** en el **espacio de fases** $(q_i, p_i)$ mediante la **transformación de Legendre**:

1. **Momento Generalizado:**
   $$p_i = \frac{\partial L}{\partial \dot{q}_i}$$
2. **Hamiltoniano:**
   $$H(q, p, t) = \sum_{i=1}^s p_i \dot{q}_i - L(q, \dot{q}, t) = T + V$$
3. **Ecuaciones Canónicas de Hamilton:**
   $$\dot{q}_i = \frac{\partial H}{\partial p_i}, \quad \dot{p}_i = -\frac{\partial H}{\partial q_i}$$

---

## 4. Teorema de Noether: Simetría y Conservación

En 1918, Emmy Noether demostró la conexión más profunda de la física clásica:
> **A cada simetría continua de la acción $S$ le corresponde una magnitud física invariante en el tiempo.**

- **Invariancia bajo traslaciones temporales** ($t \to t + \epsilon$):
  $$\frac{\partial L}{\partial t} = 0 \implies \frac{dH}{dt} = 0 \quad \text{(Conservación de la Energía)}$$
- **Invariancia bajo traslaciones espaciales** ($\mathbf{r} \to \mathbf{r} + \mathbf{a}$):
  $$\sum_i \frac{\partial L}{\partial \mathbf{r}_i} = 0 \implies \frac{d\mathbf{P}}{dt} = 0 \quad \text{(Conservación del Momento Lineal)}$$
- **Invariancia bajo rotaciones espaciales** ($\mathbf{r} \to \mathbf{r} + \delta \boldsymbol{\theta} \times \mathbf{r}$):
  $$\frac{d\mathbf{L}}{dt} = 0 \quad \text{(Conservación del Momento Angular)}$$
