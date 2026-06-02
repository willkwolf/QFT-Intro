# PROMPT MAESTRO: GENERACIÓN DE UN SCROLLIN TELLING INTERACTIVO  
**De la Geometría a la Gravedad Cuántica – Ruta pedagógica completa**

Quiero que actúes como un desarrollador front‑end, narrador y profesor de física teórica. Tu tarea es generar un **único archivo HTML autocontenido** (sin dependencias externas salvo las indicadas) que implemente una experiencia moderna de ***Scrollin Telling*** (narración basada en desplazamiento vertical) de una sola página. El contenido será una explicación profunda, intuitiva y progresiva de la física teórica, siguiendo estrictamente la secuencia pedagógica:

**Geometría → Simetrías → Acción → Lagrangianos → Campos → Cuantización**  
hasta llegar a Teoría Cuántica de Campos, Relatividad General y el problema de la Gravedad Cuántica.

---

## 1. REQUISITOS TÉCNICOS OBLIGATORIOS

- **HTML5 + CSS3 + JavaScript vainilla** (sin frameworks como React, Vue, etc.).
- **MathJax 3** cargado desde CDN para renderizar todo el LaTeX.
  - Usa `tex-chtml` o `tex-svg` con delimitadores `\(...\)` para inline y `\[...\]` para display.
  - Configuración: `MathJax = { tex: { inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']] } };`
- **Diseño responsivo**: se vea bien en móvil, tablet y escritorio.
- **Fuente tipográfica**: sans‑serif moderna y legible (ej. Inter, system-ui).
- **Paleta de colores**: oscura pero cálida, estilo pizarra o espacio profundo, con buen contraste (texto claro sobre fondo oscuro). Puedes incluir un botón para alternar modo claro/oscuro.
- **Navegación**:
  - Barra de progreso fija en la parte superior que indique el avance de la lectura.
  - Puntos de anclaje (dots) en el lateral derecho para saltar a cada fase (opcional, pero recomendable).
- **Animaciones**: suaves, disparadas por scroll (Intersection Observer). Las revelaciones de texto, ecuaciones o diagramas deben aparecer progresivamente, no todas de golpe.
- **Diagramas interactivos**: donde sea útil (fases iniciales de geometría, principio de Fermat, espacio de fases, integral de caminos, etc.) usar SVG o Canvas embebidos. No es necesario que sean extremadamente complejos; pueden ser esquemas animados que respondan al scroll o al clic. Por ejemplo:
  - Trayectorias en coordenadas polares.
  - Línea geodésica en superficie curva.
  - Visualización de un campo escalar.
  - Esquema de transformación de Legendre.
- **Rendimiento**: todas las imágenes deben ser vectoriales o generadas con código; nada de imágenes pesadas.

---

## 2. TONO Y ESTILO NARRATIVO

El texto debe sonar como una conversación íntima entre un gran maestro (mezcla de Feynman, Landau y un geómetra moderno) y un estudiante curioso. Características obligatorias:

- **Jamás introducir matemáticas antes de que exista una necesidad conceptual clara.**
- **Primero**: intuición física con metáforas cotidianas.
- **Segundo**: interpretación geométrica.
- **Tercero**: formulación matemática gradual.
- **Cuarto**: formalismo riguroso (solo al final de cada fase).
- Cada idea debe conectarse con:
  - **Historia** (anecdota breve del descubridor, contexto).
  - **Filosofía** (¿qué significa explicar? ¿qué es una ley?).
  - **Experimento crucial** (evidencia que motivó o confirmó la idea).
  - **Estructura matemática subyacente** (mostrando la belleza de la abstracción).
- Evitar memorización. El lector debe *entender*, no almacenar fórmulas.
- Mostrar siempre **qué problema intenta resolver** cada nuevo concepto.
- Señalar las **limitaciones** de cada teoría (cuándo deja de ser válida).
- El texto debe estar salpicado de preguntas retóricas y pequeños desafíos mentales que inviten a hacer una pausa.

---

## 3. ESTRUCTURA DEL CONTENIDO POR FASES

Debes generar el contenido completo, no resúmenes. A continuación se detalla cada fase, los conceptos clave y el enfoque narrativo. **No tienes que escribir un libro de texto; tienes que construir un viaje.** Usa listas numeradas, citas destacadas, cajas de “idea fuerza” y pequeños diálogos si es necesario.

### **FASE 0 – Cómo piensa la naturaleza**
- ¿Qué es una ley física? Diferencia entre ley, principio y modelo.
- Simetría como lenguaje de la naturaleza.
- Predecir vs. explicar.
- Mini biografías de Galileo, Newton, Einstein, Feynman (una frase que capture su espíritu).
- Introduce la idea de “la navaja de la simplicidad” y la búsqueda de patrones.

### **FASE 1 – Geometría del movimiento (sin cálculo)**
- Posición, desplazamiento, trayectoria, velocidad, aceleración usando solo palabras, dibujos y gráficos animados.
- Movimiento rectilíneo, circular y en espiral.
- Concepto de vector de forma puramente geométrica.
- Anima un punto moviéndose en un SVG según el scroll.

### **FASE 2 – Coordenadas polares**
- Muestra por qué las coordenadas cartesianas son una elección humana, no una verdad física.
- Introduce \( r \) y \( \theta \) como descripción natural de muchos fenómenos.
- Comparación visual: cartesianas vs. polares vs. coordenadas naturales (ej. a lo largo de una curva).
- Haz que el lector “sienta” que la geometría del problema dicta las coordenadas.

### **FASE 3 – Energía como lenguaje de la naturaleza**
- Energía cinética y potencial sin ecuaciones al principio: analogías (dinero en el banco, altura de un péndulo).
- ¿Por qué la energía es más fundamental que la fuerza? (integral primera, cantidad conservada).
- Ejemplos con resortes y péndulo simple.

### **FASE 4 – El principio de mínima acción (momento fundacional)**
- ¿Por qué la naturaleza parece elegir caminos óptimos?
- Camino de Fermat (luz) → Maupertuis → Euler → Lagrange.
- Muestra con una animación simple: entre dos puntos, el camino recto minimiza la distancia; la luz minimiza el tiempo.
- Anima la refracción como consecuencia del tiempo mínimo.
- La fuerza deja de ser protagonista.

### **FASE 5 – Lagrangiano \( L = T - V \)**
- Construcción lenta: “energía cinética menos energía potencial”.
- ¿Qué representa L? No es energía total, es una “diferencia de vitalidad”.
- ¿Por qué funciona? Porque contiene la dinámica completa de un sistema.
- Interpretación geométrica: L como generador de la evolución.
- Ejemplo con péndulo (coordenada angular) y partícula libre.

### **FASE 6 – Acción \( S = \int L \, dt \)**
- La acción como “costo total del universo” para una trayectoria.
- Analogías: presupuesto, esfuerzo acumulado, camino óptimo en montaña.
- Visualiza una función S[q] sobre un espacio de curvas (diagrama conceptual).

### **FASE 7 – Ecuaciones de Euler‑Lagrange**
- Derivación visual: comparamos dos trayectorias vecinas, el cambio en la acción debe anularse en primer orden.
- Introduce el principio variacional \( \delta S = 0 \) sin sumergirse de inmediato en cálculos pesados.
- Deduce lentamente \( \frac{d}{dt}\frac{\partial L}{\partial \dot{q}} - \frac{\partial L}{\partial q} = 0 \).
- Muestra cómo esta única ecuación reemplaza a todas las leyes de Newton.

### **FASE 8 – Simetrías (el gran salto conceptual)**
- ¿Por qué la simetría es más importante que las ecuaciones?
- Traslación en el espacio → homogeneidad.
- Rotación → isotropía.
- Traslación temporal → uniformidad del tiempo.
- Ejemplos visuales: un tablero de ajedrez vacío vs. con una pieza.
- Conecta con la filosofía: las leyes no dependen de dónde ni cuándo.

### **FASE 9 – Teorema de Noether (corazón de la física moderna)**
- “A cada simetría continua le corresponde una cantidad conservada”.
- Espacio → momento lineal.
- Rotación → momento angular.
- Tiempo → energía.
- Debe ser tratado como un descubrimiento de una profundidad casi mística.
- Muestra con diagramas cómo una invariancia implica una ley de conservación.
- Deduce visualmente, sin excesiva álgebra, usando variaciones infinitesimales.

### **FASE 10 – Momento generalizado \( p = \frac{\partial L}{\partial \dot{q}} \)**
- El momento no es simplemente \( m v \). En coordenadas polares \( p_\theta = m r^2 \dot{\theta} \).
- Énfasis geométrico: momento conjugado como gradiente en el espacio de velocidades.
- Construye la intuición con un péndulo: cuando el ángulo cambia, el momento conjugado es otra cosa.

### **FASE 11 – Espacio de fases \( (q, p) \)**
- El estado completo de un sistema es un punto en el espacio de fases.
- Compara con el espacio de configuración de Newton.
- Muestra cómo una trayectoria se convierte en una curva fluida en este espacio.
- Incluye un diagrama animado de un oscilador armónico en el plano \( x, p \) (círculos).

### **FASE 12 – Hamiltoniano**
- Transformación de Legendre: de \( L(q,\dot{q}) \) a \( H(q,p) \).
- Interpretación geométrica: pendiente de la tangente, envolvente.
- \( H = p\dot{q} - L \), normalmente energía total.
- Muestra la simetría entre coordenadas y momentos.
- Ecuaciones de Hamilton visualmente atractivas.

### **FASE 13 – Campos: el universo no es solo partículas**
- ¿Por qué una partícula puntual es insuficiente? Porque las interacciones se propagan.
- Introduce campo escalar (temperatura en una habitación), campo vectorial (viento, campo eléctrico).
- Campo electromagnético: Faraday y Maxwell.
- Representación visual con colores y flechitas.

### **FASE 14 – Lagrangianos de campos (transición crítica a QFT)**
- La misma estructura L, pero ahora la variable dinámica es un campo \( \phi(x,t) \).
- Acción \( S = \int \mathcal{L}(\phi, \partial_\mu \phi) \, d^4x \).
- Densidad lagrangiana \( \mathcal{L} \).
- Ecuaciones de Euler‑Lagrange para campos: derivadas parciales y funcionales.
- Conecta directamente con la fase 5: la lógica es idéntica, solo cambian los objetos.

### **FASE 15 – Cuantización: ¿por qué aparece?**
- Las limitaciones de la física clásica: catástrofe ultravioleta, efecto fotoeléctrico, estabilidad del átomo.
- No empezar con postulados abstractos, sino mostrando el fracaso de lo continuo.
- ¿Qué permanece clásico? El principio de acción, las simetrías.
- ¿Qué cambia? La noción de trayectoria única.

### **FASE 16 – Mecánica Cuántica (solo ahora, después de todo lo anterior)**
- Amplitudes de probabilidad e interferencia.
- Estados como vectores, operadores como transformaciones.
- Construir desde la acción: el propagador cuántico contiene toda la dinámica.
- Ecuación de Schrödinger como aproximación no relativista.
- Mostrar que la cuántica es natural cuando ya piensas en acción y simetrías.

### **FASE 17 – Integral de caminos de Feynman**
- “La partícula toma todos los caminos a la vez”.
- Fase \( e^{i S/\hbar} \). Suma sobre historias.
- Cómo emerge la trayectoria clásica por interferencia constructiva (principio de acción estacionaria).
- Esta sección debe ser visualmente impactante: diagramas de muchos caminos y su cancelación.

### **FASE 18 – Teoría Cuántica de Campos**
- Partículas como excitaciones (cuantos) de campos fundamentales.
- El vacío no está vacío.
- Simetrías gauge como principio organizador (QED, QCD).
- Diagramas de Feynman como herramienta de cálculo, no como dibujos de partículas.
- Renormalización en esencia conceptual.

### **FASE 19 – Relatividad General**
- La gravedad como geometría dinámica del espaciotiempo.
- Principio de equivalencia.
- Acción de Einstein‑Hilbert \( S = \frac{1}{16\pi G} \int R \sqrt{-g} \, d^4x \).
- Mostrar paralelismos asombrosos con teoría de campos: acción, invariancia bajo difeomorfismos (simetría).
- Ondas gravitacionales y agujeros negros como predicciones.

### **FASE 20 – El choque de titanes: el problema de la Gravedad Cuántica**
- ¿Dónde chocan QFT y RG?
- Escala de Planck, pérdida de predictibilidad.
- Puntos clave: la gravedad no es renormalizable (en el sentido usual), el espaciotiempo podría no ser fundamental.
- Sin especulación, solo la naturaleza del conflicto: descripción geométrica continua vs. cuantos discretos.
- Termina con una nota de apertura: el viaje continúa (teoría de cuerdas, gravedad cuántica de lazos, etc.) y la invitación a seguir explorando.

---

## 4. INTERACTIVIDAD Y DISEÑO DEL SCROLL

- Las fases deben estar claramente separadas por transiciones visuales (pantallas completas, cambios de fondo sutiles).
- Cada fase comienza con un título grande y una frase provocadora.
- El texto se irá desvelando a medida que el usuario hace scroll (efecto parallax suave, opacidad, deslizamiento).
- Los diagramas deben activarse cuando su contenedor entra en el viewport.
- Incluye al menos **tres desafíos interactivos** sencillos a lo largo del viaje:
  1. Un deslizador que cambie la trayectoria y recalcule la acción (fase 6 o 7).
  2. Un pequeño simulador del péndulo donde se vea la conservación de la energía (fase 3 o 10).
  3. Una visualización interactiva de suma de caminos (fase 17): un número variable de “caminos aleatorios” y cómo la suma se acerca al clásico.
- Utiliza `details`/`summary` para profundizaciones opcionales (notas históricas, demostraciones matemáticas extensas) que no interrumpan el flujo principal.
- Añade citas textuales de los grandes físicos en puntos clave.

---

## 5. INSTRUCCIONES FINALES

- **Todo el contenido (texto, ecuaciones, diagramas) debe estar generado por ti**, no meramente descrito. Sé creativo y riguroso.
- Las ecuaciones LaTeX deben estar perfectamente formateadas y ser correctas.
- El código final será **un único bloque HTML** que comience con `<!DOCTYPE html>` y contenga todo lo necesario.
- Asegúrate de que no haya errores de JavaScript y que MathJax procese correctamente al cargar y al añadir contenido dinámico (puedes llamar a `MathJax.typesetPromise()` cuando sea necesario).

**Genera el archivo HTML completo. Responde exclusivamente con el bloque de código del HTML, sin comentarios adicionales.**