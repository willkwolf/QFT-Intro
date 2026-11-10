# Dominio Formal: Orígenes Cuánticos & La Catástrofe Ultravioleta

> **Categoría:** Conocimiento Formal  
> **Ubicación:** `openwiki/domains/02-quantum-origins-blackbody.md`  
> **Referencias:** Landau & Lifshitz, *Física Estadística* (Volumen 5, §63 "Radiación de Cuerpo Negro") y *Mecánica Cuántica* (Volumen 3, §1).

---

## 1. El Colapso de la Termodinámica y Electrodinámica Clásica

Hacia finales del siglo XIX, la física clásica parecía completa: la mecánica de Newton/Lagrange describía la materia, las ecuaciones de Maxwell gobernaban la radiación electromagnética y la termodinámica de Boltzmann-Gibbs explicaba el calor.

Sin embargo, el estudio de la **radiación de equilibrio térmico dentro de una cavidad reflectora (cuerpo negro)** reveló una paradoja insostenible.

### 1.1 El Teorema de Equipartición y la Ley de Rayleigh-Jeans
Según la mecánica estadística clásica, cada modo electromagnético estacionario dentro de una cavidad cúbica de lado $L$ se comporta como un oscilador armónico con dos grados de libertad cuadráticos (campo eléctrico y campo magnético).

Por el **teorema de equipartición clásica de la energía**, a temperatura $T$, cada oscilador debe poseer una energía media:
$$\langle \varepsilon \rangle = k_B T$$

Calculando el número de modos de vibración electromagnéticos por unidad de volumen en el intervalo $[\nu, \nu + d\nu]$:
$$g(\nu) \, d\nu = \frac{8\pi \nu^2}{c^3} \, d\nu$$

La densidad espectral de energía clásica resultante (**Ley de Rayleigh-Jeans**) es:
$$\rho_{\text{RJ}}(\nu, T) = g(\nu) \langle \varepsilon \rangle = \frac{8\pi \nu^2}{c^3} k_B T$$

### 1.2 La Catástrofe Ultravioleta
Al integrar sobre todas las frecuencias para obtener la energía total radiada por unidad de volumen:
$$u_{\text{total}} = \int_0^\infty \rho_{\text{RJ}}(\nu, T) \, d\nu = \frac{8\pi k_B T}{c^3} \int_0^\infty \nu^2 \, d\nu \to \infty$$

La integral diverge catastróficamente en el límite de altas frecuencias ($\nu \to \infty$, región ultravioleta). La física clásica predecía absurdamente que cualquier objeto a temperatura finita debería vaciar instantáneamente toda su energía en una ráfaga infinita de rayos gamma y rayos X.

---

## 2. El Salto Revolucionario de Max Planck (1900)

El 14 de diciembre de 1900, Max Planck presentó una solución audaz ante la Sociedad Alemana de Física. Para impedir que los osciladores de altísima frecuencia absorbieran energía térmica continuamente, postuló que:

> **Un oscilador electromagnético de frecuencia $\nu$ no puede emitir o absorber energía de manera continua, sino únicamente en paquetes discretos indivisibles (cuantos) proporcionales a su frecuencia:**
> $$\varepsilon_n = n h \nu = n \hbar \omega \quad (n = 0, 1, 2, \dots)$$

### Deducción de la Energía Media Cuántica
Aplicando la distribución canónica de Boltzmann con el espectro discreto $\varepsilon_n = n \hbar \omega$:
$$\langle \varepsilon \rangle = \frac{\sum_{n=0}^\infty n\hbar\omega \, e^{-n\hbar\omega / T}}{\sum_{n=0}^\infty e^{-n\hbar\omega / T}}$$

Haciendo el cambio de variable $x = \hbar\omega / T$ y usando la suma de series geométricas:
$$\sum_{n=0}^\infty e^{-nx} = \frac{1}{1 - e^{-x}}$$
$$\sum_{n=0}^\infty n e^{-nx} = -\frac{d}{dx}\left(\frac{1}{1 - e^{-x}}\right) = \frac{e^{-x}}{(1 - e^{-x})^2}$$

Dividiendo ambos resultados obtenemos la célebre **energía media cuántica**:
$$\langle \varepsilon \rangle = \frac{\hbar\omega}{e^{\hbar\omega / T} - 1}$$

### La Fórmula de Radiación de Planck
Multiplicando por la densidad de estados espaciales por unidad de volumen:
$$u_\omega \, d\omega = \frac{\hbar \omega^3}{\pi^2 c^3} \frac{1}{e^{\hbar\omega/T} - 1} \, d\omega$$

### Los Límites Asintóticos
1. **Límite de bajas frecuencias (Clásico, $\hbar\omega \ll T$):**
   $$e^{\hbar\omega/T} - 1 \approx \frac{\hbar\omega}{T} \implies u_\omega \approx \frac{\omega^2}{\pi^2 c^3} T \quad \text{(Recupera Rayleigh-Jeans)}$$
2. **Límite de altas frecuencias (Exponencial, $\hbar\omega \gg T$):**
   $$u_\omega \approx \frac{\hbar\omega^3}{\pi^2 c^3} e^{-\hbar\omega/T} \quad \text{(Recupera la Ley de Wien)}$$

El factor exponencial $e^{-\hbar\omega/T}$ suprime a cero la radiación para altas frecuencias, eliminando para siempre la catástrofe ultravioleta.

---

## 3. Einstein y los Cuantos de Luz (1905)

Mientras Planck consideró la cuantización como un mero artificio estadístico de las paredes de la cavidad, Albert Einstein llevó la idea hasta sus últimas consecuencias: **la radiación electromagnética misma está corpuscularmente cuantizada en el espacio**.

Cada fotón transporta:
$$E = \hbar\omega, \quad p = \frac{\hbar\omega}{c} = \hbar k$$

Esto explicó de forma inmediata el **efecto fotoeléctrico**:
$$K_{\text{max}} = \hbar\omega - W$$
donde $W$ es la función de trabajo del metal. La energía cinética del electrón no depende de la intensidad de la luz (número de fotones por segundo), sino estrictamente de su frecuencia $\omega$.
