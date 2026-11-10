# Dominio Formal: Fundamentos de Computación Cuántica

> **Categoría:** Conocimiento Formal  
> **Ubicación:** `openwiki/domains/04-quantum-computing-foundations.md`  
> **Referencias:** Nielsen & Chuang, *Quantum Computation and Quantum Information*; Landau & Lifshitz, *Mecánica Cuántica* (Volumen 3, §55 "Matriz Densidad y Estados Puros").

---

## 1. El Qubit y la Esfera de Bloch

En la computación clásica, la unidad fundamental de información es el **bit**, restringido a los estados discretos $\{0, 1\}$.

En la computación cuántica, un **qubit** es un sistema cuántico de dos niveles que vive en un espacio de Hilbert complejo bidimensional $\mathcal{H}_2 \cong \mathbb{C}^2$, con base ortonormal canónica:
$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

Cualquier estado puro normalizado puede expresarse mediante dos ángulos reales $\theta \in [0, \pi]$ y $\phi \in [0, 2\pi)$ como un punto en la superficie de la **Esfera de Bloch**:
$$|\psi\rangle = \cos\left(\frac{\theta}{2}\right) |0\rangle + e^{i\phi} \sin\left(\frac{\theta}{2}\right) |1\rangle$$

- El polo norte ($\theta = 0$) corresponde a $|0\rangle$.
- El polo sur ($\theta = \pi$) corresponde a $|1\rangle$.
- El ecuador ($\theta = \pi/2$) representa superposiciones con probabilidades idénticas de colapso pero distintas fases cuánticas relativas $\phi$.

---

## 2. Compuertas Lógicas Cuánticas (Operadores Unitarios)

Cualquier operación lógica válida que transforme un estado cuántico $|\psi\rangle$ en $|\psi'\rangle$ debe preservar la conservación total de la probabilidad ($\langle\psi'|\psi'\rangle = 1$). Por consiguiente, las compuertas cuánticas son **matrices unitarias** $U^\dagger U = I$.

### 2.1 Compuertas de 1 Qubit Fundamentales
- **Hadamard ($H$):** Crea superposiciones equilibradas a partir de estados de la base:
  $$H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}, \quad H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}} \equiv |+\rangle$$
- **Matrices de Pauli:**
  $$\sigma_x = X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \quad \text{(NOT cuántico, invierte } |0\rangle \leftrightarrow |1\rangle)$$
  $$\sigma_y = Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix} \quad \text{(Rotación de bit y fase)}$$
  $$\sigma_z = Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \quad \text{(Flip de fase: deja } |0\rangle \text{ inmune e invierte } |1\rangle \to -|1\rangle)$$

### 2.2 Compuertas de 2 Qubits: El CNOT (Controlled-NOT)
Opera sobre el espacio producto tensorial $\mathcal{H}_2 \otimes \mathcal{H}_2$:
$$\text{CNOT} = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}$$
Invierte el segundo qubit (objetivo) si y solo si el primer qubit (control) está en el estado $|1\rangle$.

---

## 3. Entrelazamiento Cuántico y Estados de Bell

El entrelazamiento es la propiedad según la cual el estado conjunto de dos o más subsistemas cuánticos no puede factorizarse como el producto de los estados individuales:
$$|\Psi\rangle \neq |\psi_A\rangle \otimes |\psi_B\rangle$$

Aplicando una compuerta Hadamard al qubit 1 seguida de un CNOT entre el qubit 1 y el qubit 2:
$$|00\rangle \xrightarrow{H \otimes I} \frac{|0\rangle + |1\rangle}{\sqrt{2}} |0\rangle = \frac{|00\rangle + |10\rangle}{\sqrt{2}} \xrightarrow{\text{CNOT}} \frac{|00\rangle + |11\rangle}{\sqrt{2}} \equiv |\Phi^+\rangle$$

El estado resultante $|\Phi^+\rangle$ es uno de los cuatro **Estados de Bell**. Medir el primer qubit determina instantáneamente y con certeza del 100% el resultado de la medición del segundo qubit, sin importar su separación espacial.

---

## 4. Paralelismo Cuántico e Interferencia

Un registro de $n$ qubits puede existir en una superposición simultánea de $2^n$ estados base:
$$|\Psi\rangle = \sum_{x=0}^{2^n - 1} c_x |x\rangle$$

La ventaja cuántica no consiste simplemente en evaluar $2^n$ funciones en paralelo (ya que al medir el registro colapsaría aleatoriamente a un único resultado), sino en aplicar **transformadas unitarias (interferencia constructiva y destructiva)** para amplificar la probabilidad de las soluciones correctas y cancelar las erróneas (Algoritmo de Grover, Algoritmo de Shor, Estimación Cuántica de Fase).
