# Dominio Formal: Teoría Cuántica de Campos (QFT)

> **Categoría:** Conocimiento Formal  
> **Ubicación:** `openwiki/domains/03-quantum-field-theory.md`  
> **Referencias:** Landau & Lifshitz, *Teoría Cuántica Relativista* (Volumen 4, §1-§15).

---

## 1. La Necesidad Inevitable de los Campos

La mecánica cuántica no-relativista (Ecuación de Schrödinger) asume que el número de partículas $N$ es estrictamente constante y que el tiempo $t$ es un parámetro externo, mientras que la posición $\hat{\mathbf{x}}$ es un operador.

Sin embargo, al incorporar la Relatividad Especial:
1. **$E = mc^2$:** Con suficiente energía cinética concentrada, la energía se transforma espontáneamente en pares de partículas y antipartículas. El número de partículas ya no se conserva.
2. **Causalidad Relativista:** Para que dos eventos separados espacialmente ($s^2 < 0$) no interfieran entre sí, los conmutadores de observables físicos deben anularse fuera del cono de luz:
   $$[\mathcal{O}(x), \mathcal{O}(y)] = 0 \quad \text{para } (x - y)^2 < 0$$

La única solución matemática consistente es promover tanto el espacio $\mathbf{x}$ como el tiempo $t$ a simples **coordenadas de fondo**, y convertir los valores del campo en **operadores cuánticos** $\hat{\phi}(x, t)$ definidos en cada punto del espacio-tiempo.

---

## 2. Segunda Cuantización: El Oscilador Cuántico como Ladrillo Cósmico

Un campo clásico libre puede descomponerse mediante transformada de Fourier en una superposición de infinitas ondas planas monocromáticas con vector de onda $\mathbf{p}$:
$$\phi(\mathbf{x}, t) = \int \frac{d^3p}{(2\pi)^3 \sqrt{2\omega_{\mathbf{p}}}} \left( a_{\mathbf{p}} e^{-i(\omega_{\mathbf{p}} t - \mathbf{p}\cdot\mathbf{x})} + a_{\mathbf{p}}^* e^{i(\omega_{\mathbf{p}} t - \mathbf{p}\cdot\mathbf{x})} \right)$$

En la **segunda cuantización**, los coeficientes de Fourier $a_{\mathbf{p}}$ y $a_{\mathbf{p}}^*$ son promovidos a **operadores de aniquilación y creación**:
$$a_{\mathbf{p}} \to \hat{a}_{\mathbf{p}}, \quad a_{\mathbf{p}}^* \to \hat{a}_{\mathbf{p}}^\dagger$$

que satisfacen las relaciones de conmutación canónicas bosónicas:
$$[\hat{a}_{\mathbf{p}}, \hat{a}_{\mathbf{k}}^\dagger] = (2\pi)^3 \delta^{(3)}(\mathbf{p} - \mathbf{k}), \quad [\hat{a}_{\mathbf{p}}, \hat{a}_{\mathbf{k}}] = 0$$

### El Estado de Vacío y las Partículas
- **El Vacío $|0\rangle$:** El estado fundamental sin partículas, definido por:
  $$\hat{a}_{\mathbf{p}} |0\rangle = 0 \quad \forall \mathbf{p}$$
- **Estado de 1 partícula:** Un cuanto de excitación con momento $\mathbf{p}$:
  $$|\mathbf{p}\rangle = \sqrt{2\omega_{\mathbf{p}}} \, \hat{a}_{\mathbf{p}}^\dagger |0\rangle$$
- **Las partículas materiales no son entes primarios:** Son excitaciones localizadas de los campos fundamentales subyacentes.

---

## 3. Energía del Punto Cero y Fluctuaciones del Vacío

El Hamiltoniano del campo escalar libre toma la forma:
$$\hat{H} = \int \frac{d^3p}{(2\pi)^3} \, \omega_{\mathbf{p}} \left( \hat{a}_{\mathbf{p}}^\dagger \hat{a}_{\mathbf{p}} + \frac{1}{2} (2\pi)^3 \delta^{(3)}(0) \right)$$

El valor esperado en el vacío es:
$$\langle 0 | \hat{H} | 0 \rangle = \int \frac{d^3p}{(2\pi)^3} \frac{1}{2} \hbar \omega_{\mathbf{p}} \to \infty$$

Cada modo del campo posee una energía de punto cero $\frac{1}{2}\hbar\omega$. Aunque en física de partículas este término divergente suele redefinirse mediante **ordenamiento normal** ($:\hat{H}:$), en presencia de fronteras materiales produce una fuerza medible real: el **Efecto Casimir**.

---

## 4. El Formalismo de la Integral Funcional de Feynman

En QFT, la función generatriz de funciones de correlación $\mathcal{Z}[J]$ se calcula sumando sobre todas las historias posibles de campos continuos en el espacio-tiempo de Minkowski:
$$\mathcal{Z}[J] = \int \mathcal{D}\phi \, \exp\left\{ \frac{i}{\hbar} \int d^4x \, \left[ \mathcal{L}(\phi, \partial_\mu \phi) + J(x)\phi(x) \right] \right\}$$

Donde la densidad Lagrangiana clásica de Klein-Gordon es:
$$\mathcal{L} = \frac{1}{2}(\partial_\mu \phi)(\partial^\mu \phi) - \frac{1}{2}m^2\phi^2 - V(\phi)$$

El propagador de Feynman $\Delta_F(x - y) = \langle 0 | \mathcal{T} \phi(x)\phi(y) | 0 \rangle$ dicta la amplitud de probabilidad de que una perturbación cuántica viaje entre dos puntos del universo.
