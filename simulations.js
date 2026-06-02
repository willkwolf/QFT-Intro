/* simulations.js - Motores de Simulación Física en Canvas */

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // CONFIGURACIÓN GLOBAL & COLORES DE MARCA
  // ==========================================
  const colors = {
    cyan: "#00f2fe",
    gold: "#e2b769",
    violet: "#8e2de2",
    text: "#f6f5f9",
    muted: "#9fa0b5",
    border: "rgba(255, 255, 255, 0.08)",
    bg: "#020204"
  };

  // =========================================================================
  // SIMULACIÓN 1: PÉNDULO Y ESPACIO DE FASES (FASE 3 / 10)
  // =========================================================================
  const pendCanvas = document.getElementById("pendulum-canvas");
  const pendCtx = pendCanvas.getContext("2d");
  const btnPendPlay = document.getElementById("pendulum-play");
  const sldPendL = document.getElementById("param-pendulum-l");
  const sldPendD = document.getElementById("param-pendulum-d");
  const sldPendTheta = document.getElementById("param-pendulum-theta");
  const lblPendL = document.getElementById("val-pendulum-l");
  const lblPendD = document.getElementById("val-pendulum-d");
  const lblPendTheta = document.getElementById("val-pendulum-theta");
  const statKin = document.getElementById("stat-kin");
  const statPot = document.getElementById("stat-pot");

  let isPendRunning = true;
  let pendTheta = (parseFloat(sldPendTheta.value) * Math.PI) / 180;
  let pendOmega = 0.0;
  const gravity = 9.81;
  const pendMass = 1.0; // masa unitaria para simplificación
  
  // Trayectoria histórica en el espacio de fases
  let phaseHistory = [];
  const maxHistoryLength = 500;

  // Ajustar tamaño del canvas al contenedor
  function resizeCanvas(canvas) {
    const rect = canvas.parentNode.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  resizeCanvas(pendCanvas);
  window.addEventListener("resize", () => {
    resizeCanvas(pendCanvas);
    resizeCanvas(actionCanvas);
    resizeCanvas(feyCanvas);
  });

  // Event Listeners del Péndulo
  btnPendPlay.addEventListener("click", () => {
    isPendRunning = !isPendRunning;
    btnPendPlay.textContent = isPendRunning ? "Pausar" : "Reanudar";
    if (isPendRunning) {
      btnPendPlay.classList.remove("active");
    } else {
      btnPendPlay.classList.add("active");
    }
  });

  sldPendL.addEventListener("input", (e) => {
    lblPendL.textContent = `${parseFloat(e.target.value).toFixed(1)}m`;
  });
  
  sldPendD.addEventListener("input", (e) => {
    lblPendD.textContent = parseFloat(e.target.value).toFixed(2);
  });

  sldPendTheta.addEventListener("input", (e) => {
    const degrees = parseInt(e.target.value);
    lblPendTheta.textContent = `${degrees}°`;
    if (!isPendRunning) {
      pendTheta = (degrees * Math.PI) / 180;
      pendOmega = 0.0;
      phaseHistory = [];
    }
  });

  // Bucle de Integración Numérica (Runge-Kutta 2 / Euler-Cromer)
  let lastTime = performance.now();
  
  function updatePendulum() {
    const currentTime = performance.now();
    let dt = (currentTime - lastTime) / 1000.0;
    lastTime = currentTime;

    // Limitar dt para evitar inestabilidades al cambiar de pestaña
    if (dt > 0.1) dt = 0.1;

    if (isPendRunning) {
      const L = parseFloat(sldPendL.value);
      const damping = parseFloat(sldPendD.value);
      
      // Ecuación diferencial: d2theta/dt2 = -(g/L)*sin(theta) - damping*omega
      const alpha = -(gravity / L) * Math.sin(pendTheta) - damping * pendOmega;
      
      // Euler-Cromer
      pendOmega += alpha * dt;
      pendTheta += pendOmega * dt;
      
      // Momento conjugado generalizado p_theta = m * L^2 * omega
      const pTheta = pendMass * L * L * pendOmega;

      // Guardar en el historial de espacio de fases
      phaseHistory.push({ q: pendTheta, p: pTheta });
      if (phaseHistory.length > maxHistoryLength) {
        phaseHistory.shift();
      }
    }

    drawPendulum();
    requestAnimationFrame(updatePendulum);
  }

  function drawPendulum() {
    const W = pendCanvas.width;
    const H = pendCanvas.height;
    
    // Limpiar canvas
    pendCtx.fillStyle = colors.bg;
    pendCtx.fillRect(0, 0, W, H);

    // Dibujar línea divisoria vertical
    pendCtx.strokeStyle = colors.border;
    pendCtx.beginPath();
    pendCtx.moveTo(W / 2, 0);
    pendCtx.lineTo(W / 2, H);
    pendCtx.stroke();

    // Parámetros físicos actuales
    const L = parseFloat(sldPendL.value);
    const L_px = (H * 0.35) * (L / 2.5); // Escala visual de longitud

    // -------------------------------------------------------------
    // PANEL IZQUIERDO: ANIMACIÓN DEL PÉNDULO
    // -------------------------------------------------------------
    const originX = W / 4;
    const originY = H * 0.25;
    
    const bobX = originX + L_px * Math.sin(pendTheta);
    const bobY = originY + L_px * Math.cos(pendTheta);

    // Dibujar soporte
    pendCtx.fillStyle = colors.muted;
    pendCtx.fillRect(originX - 15, originY - 4, 30, 8);

    // Dibujar hilo
    pendCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    pendCtx.lineWidth = 2;
    pendCtx.beginPath();
    pendCtx.moveTo(originX, originY);
    pendCtx.lineTo(bobX, bobY);
    pendCtx.stroke();

    // Dibujar masa (Bob)
    const glowGradient = pendCtx.createRadialGradient(bobX, bobY, 2, bobX, bobY, 15);
    glowGradient.addColorStop(0, colors.cyan);
    glowGradient.addColorStop(1, "transparent");
    pendCtx.fillStyle = "rgba(0, 242, 254, 0.3)";
    pendCtx.beginPath();
    pendCtx.arc(bobX, bobY, 15, 0, Math.PI * 2);
    pendCtx.fill();

    pendCtx.fillStyle = colors.cyan;
    pendCtx.beginPath();
    pendCtx.arc(bobX, bobY, 8, 0, Math.PI * 2);
    pendCtx.fill();

    // Cálculo y reporte de energías
    const velocity = L * pendOmega;
    const kineticEnergy = 0.5 * pendMass * velocity * velocity;
    const potentialEnergy = pendMass * gravity * (L - L * Math.cos(pendTheta));
    
    statKin.textContent = `${kineticEnergy.toFixed(2)} J`;
    statPot.textContent = `${potentialEnergy.toFixed(2)} J`;

    // -------------------------------------------------------------
    // PANEL DERECHO: DIAGRAMA DE ESPACIO DE FASES (q, p)
    // -------------------------------------------------------------
    const phaseCenterX = (3 * W) / 4;
    const phaseCenterY = H / 2;
    const phaseScaleQ = (W / 4) / Math.PI; // Escala para theta
    const phaseScaleP = (H / 2.5) / (pendMass * gravity * 1.2); // Escala para momento

    // Dibujar Ejes de Coordenadas (q, p)
    pendCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    pendCtx.lineWidth = 1;
    
    // Eje horizontal q (posición theta)
    pendCtx.beginPath();
    pendCtx.moveTo(W / 2 + 20, phaseCenterY);
    pendCtx.lineTo(W - 20, phaseCenterY);
    pendCtx.stroke();
    
    // Eje vertical p (momento)
    pendCtx.beginPath();
    pendCtx.moveTo(phaseCenterX, 20);
    pendCtx.lineTo(phaseCenterX, H - 20);
    pendCtx.stroke();

    // Etiquetas de los ejes
    pendCtx.fillStyle = colors.muted;
    pendCtx.font = "10px JetBrains Mono";
    pendCtx.fillText("q (posición θ)", W - 85, phaseCenterY - 8);
    pendCtx.fillText("p (momento)", phaseCenterX + 8, 30);

    // Dibujar trayectoria histórica
    if (phaseHistory.length > 1) {
      pendCtx.strokeStyle = colors.gold;
      pendCtx.lineWidth = 2;
      pendCtx.beginPath();
      
      const startX = phaseCenterX + phaseHistory[0].q * phaseScaleQ;
      const startY = phaseCenterY - phaseHistory[0].p * phaseScaleP;
      pendCtx.moveTo(startX, startY);
      
      for (let i = 1; i < phaseHistory.length; i++) {
        const x = phaseCenterX + phaseHistory[i].q * phaseScaleQ;
        const y = phaseCenterY - phaseHistory[i].p * phaseScaleP;
        pendCtx.lineTo(x, y);
      }
      pendCtx.stroke();
    }

    // Dibujar punto actual en el espacio de fases
    if (phaseHistory.length > 0) {
      const currentPoint = phaseHistory[phaseHistory.length - 1];
      const pX = phaseCenterX + currentPoint.q * phaseScaleQ;
      const pY = phaseCenterY - currentPoint.p * phaseScaleP;

      pendCtx.fillStyle = colors.cyan;
      pendCtx.beginPath();
      pendCtx.arc(pX, pY, 5, 0, Math.PI * 2);
      pendCtx.fill();
      
      // Anillo de brillo
      pendCtx.strokeStyle = colors.cyan;
      pendCtx.beginPath();
      pendCtx.arc(pX, pY, 9, 0, Math.PI * 2);
      pendCtx.stroke();
    }
  }

  // Inicializar simulación del péndulo
  updatePendulum();


  // =========================================================================
  // SIMULACIÓN 2: PRINCIPIO DE FERMAT Y ACCIÓN DE LA LUZ (FASE 6 / 7)
  // =========================================================================
  const actionCanvas = document.getElementById("action-canvas");
  const actionCtx = actionCanvas.getContext("2d");
  const btnActionReset = document.getElementById("action-reset");
  const sldN1 = document.getElementById("param-n1");
  const sldN2 = document.getElementById("param-n2");
  const lblN1 = document.getElementById("val-n1");
  const lblN2 = document.getElementById("val-n2");
  const statCurrentTime = document.getElementById("stat-current-time");
  const statMinTime = document.getElementById("stat-min-time");

  resizeCanvas(actionCanvas);

  // Posiciones de origen (A) y destino (B) en el Canvas
  const posA = { x: 0.2, y: 0.2 }; // Porcentaje
  const posB = { x: 0.8, y: 0.8 }; // Porcentaje
  
  // Posición del nodo en la interfaz (interactivo)
  let interfaceX = 0.5; // Porcentaje del ancho
  let isDraggingNode = false;

  // Actualizar valores de inputs
  sldN1.addEventListener("input", (e) => {
    lblN1.textContent = parseFloat(e.target.value).toFixed(2);
    calculateFermatTimes();
  });

  sldN2.addEventListener("input", (e) => {
    lblN2.textContent = parseFloat(e.target.value).toFixed(2);
    calculateFermatTimes();
  });

  btnActionReset.addEventListener("click", () => {
    // Alinear interfaceX con el óptimo teórico (Ley de Snell)
    interfaceX = calculateOptimalX();
    calculateFermatTimes();
  });

  // Control táctil / Mouse para arrastrar el nodo de la interfaz
  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  actionCanvas.addEventListener("mousedown", (e) => {
    const mouse = getMousePos(actionCanvas, e);
    const nodePixelX = interfaceX * actionCanvas.width;
    const nodePixelY = actionCanvas.height / 2;
    
    // Comprobar si hace clic cerca del nodo dorado
    const dist = Math.hypot(mouse.x - nodePixelX, mouse.y - nodePixelY);
    if (dist < 20) {
      isDraggingNode = true;
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDraggingNode) return;
    const rect = actionCanvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    
    // Normalizar
    let normX = clientX / actionCanvas.width;
    if (normX < 0.05) normX = 0.05;
    if (normX > 0.95) normX = 0.95;
    
    interfaceX = normX;
    calculateFermatTimes();
  });

  window.addEventListener("mouseup", () => {
    isDraggingNode = false;
  });

  // Encontrar numéricamente la posición que minimiza el tiempo
  function calculateOptimalX() {
    const n1 = parseFloat(sldN1.value);
    const n2 = parseFloat(sldN2.value);
    
    const ax = posA.x;
    const ay = 0.2;
    const bx = posB.x;
    const by = 0.8;
    
    let minTime = Infinity;
    let bestX = 0.5;
    
    // Barrido fino entre 0 y 1
    for (let x = 0.05; x <= 0.95; x += 0.001) {
      const d1 = Math.hypot(x - ax, 0.5 - ay);
      const d2 = Math.hypot(bx - x, by - 0.5);
      
      const time = d1 * n1 + d2 * n2;
      if (time < minTime) {
        minTime = time;
        bestX = x;
      }
    }
    return bestX;
  }

  function calculateFermatTimes() {
    const W = actionCanvas.width;
    const H = actionCanvas.height;
    
    const n1 = parseFloat(sldN1.value);
    const n2 = parseFloat(sldN2.value);

    // Coordenadas absolutas
    const ax = posA.x * W;
    const ay = posA.y * H;
    const bx = posB.x * W;
    const by = posB.y * H;
    const ix = interfaceX * W;
    const iy = H / 2;

    // Distancias reales en píxeles convertidos a "unidades" ficticias de espacio
    const scale = 1.0 / W; // Factor de conversión
    const d1 = Math.hypot(ix - ax, iy - ay) * scale;
    const d2 = Math.hypot(bx - ix, by - iy) * scale;

    // Velocidades en el medio
    const c = 300.0; // Velocidad de la luz ficticia (pixels/ns aproximado)
    const v1 = c / n1;
    const v2 = c / n2;

    // Tiempo total de viaje
    const currentTime = (d1 / v1) + (d2 / v2);
    
    // Tiempo óptimo
    const optX = calculateOptimalX();
    const od1 = Math.hypot(optX - posA.x, 0.5 - posA.y);
    const od2 = Math.hypot(posB.x - optX, posB.y - 0.5);
    const minTime = (od1 / (c / n1)) + (od2 / (c / n2));

    // Mostrar en UI (con escalamiento temporal para simulación)
    statCurrentTime.textContent = `${(currentTime * 100).toFixed(2)} ns`;
    statMinTime.textContent = `${(minTime * 100).toFixed(2)} ns`;

    drawFermatScene(ax, ay, bx, by, ix, iy, optX * W, n1, n2);
  }

  function drawFermatScene(ax, ay, bx, by, ix, iy, optX_abs, n1, n2) {
    const W = actionCanvas.width;
    const H = actionCanvas.height;

    // 1. Limpiar canvas
    actionCtx.fillStyle = colors.bg;
    actionCtx.fillRect(0, 0, W, H);

    // 2. Dibujar medios refractivos
    // Medio 1 (Aire / arriba)
    actionCtx.fillStyle = "rgba(255, 255, 255, 0.02)";
    actionCtx.fillRect(0, 0, W, H / 2);
    
    // Medio 2 (Agua / abajo)
    actionCtx.fillStyle = "rgba(0, 242, 254, 0.04)";
    actionCtx.fillRect(0, H / 2, W, H / 2);

    // Línea de interfaz
    actionCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    actionCtx.lineWidth = 2;
    actionCtx.beginPath();
    actionCtx.moveTo(0, H / 2);
    actionCtx.lineTo(W, H / 2);
    actionCtx.stroke();

    // Textos informativos de medios
    actionCtx.fillStyle = colors.muted;
    actionCtx.font = "10px JetBrains Mono";
    actionCtx.fillText(`MEDIO 1 (Aire) - n₁ = ${n1.toFixed(2)}`, 20, 30);
    actionCtx.fillText(`MEDIO 2 (Agua) - n₂ = ${n2.toFixed(2)}`, 20, H / 2 + 30);

    // 3. Dibujar camino clásico óptimo (Línea de trazos finos)
    actionCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    actionCtx.lineWidth = 1;
    actionCtx.setLineDash([4, 4]);
    actionCtx.beginPath();
    actionCtx.moveTo(ax, ay);
    actionCtx.lineTo(optX_abs, H / 2);
    actionCtx.lineTo(bx, by);
    actionCtx.stroke();
    actionCtx.setLineDash([]); // Reset

    // 4. Dibujar camino interactivo actual
    actionCtx.strokeStyle = colors.gold;
    actionCtx.lineWidth = 3;
    actionCtx.beginPath();
    actionCtx.moveTo(ax, ay);
    actionCtx.lineTo(ix, iy);
    actionCtx.lineTo(bx, by);
    actionCtx.stroke();

    // 5. Dibujar Fuente (A) y Receptor (B)
    // Fuente A
    actionCtx.fillStyle = colors.cyan;
    actionCtx.beginPath();
    actionCtx.arc(ax, ay, 6, 0, Math.PI * 2);
    actionCtx.fill();
    actionCtx.fillText("Fuente (A)", ax + 12, ay + 4);

    // Receptor B
    actionCtx.fillStyle = colors.violet;
    actionCtx.beginPath();
    actionCtx.arc(bx, by, 6, 0, Math.PI * 2);
    actionCtx.fill();
    actionCtx.fillText("Receptor (B)", bx + 12, by + 4);

    // Normal en el punto de contacto
    actionCtx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    actionCtx.lineWidth = 1;
    actionCtx.setLineDash([2, 2]);
    actionCtx.beginPath();
    actionCtx.moveTo(ix, iy - 60);
    actionCtx.lineTo(ix, iy + 60);
    actionCtx.stroke();
    actionCtx.setLineDash([]);

    // 6. Dibujar nodo de interfaz arrastrable
    // Brillo del nodo
    const nodeGlow = actionCtx.createRadialGradient(ix, iy, 2, ix, iy, 12);
    nodeGlow.addColorStop(0, colors.gold);
    nodeGlow.addColorStop(1, "transparent");
    actionCtx.fillStyle = "rgba(226, 183, 105, 0.35)";
    actionCtx.beginPath();
    actionCtx.arc(ix, iy, 12, 0, Math.PI * 2);
    actionCtx.fill();

    // Centro del nodo
    actionCtx.fillStyle = colors.gold;
    actionCtx.beginPath();
    actionCtx.arc(ix, iy, 6, 0, Math.PI * 2);
    actionCtx.fill();

    // Pequeño indicador de óptimo teórico
    actionCtx.fillStyle = "rgba(0, 242, 254, 0.3)";
    actionCtx.beginPath();
    actionCtx.arc(optX_abs, H / 2, 4, 0, Math.PI * 2);
    actionCtx.fill();
  }

  // Inicializar simulación Fermat
  setTimeout(calculateFermatTimes, 100);


  // =========================================================================
  // SIMULACIÓN 3: INTEGRAL DE CAMINOS DE FEYNMAN (FASE 17)
  // =========================================================================
  const feyCanvas = document.getElementById("feynman-canvas");
  const feyCtx = feyCanvas.getContext("2d");
  const btnFeyLaunch = document.getElementById("feynman-clear");
  const sldPaths = document.getElementById("param-paths-count");
  const sldHbar = document.getElementById("param-hbar");
  const lblPaths = document.getElementById("val-paths-count");
  const lblHbar = document.getElementById("val-hbar");
  const statAmplitude = document.getElementById("stat-feynman-amplitude");
  const statCoherent = document.getElementById("stat-feynman-coherent");

  resizeCanvas(feyCanvas);

  // Puntos A y B de la simulación cuántica
  const startFey = { x: 0.1, y: 0.5 };
  const endFey = { x: 0.9, y: 0.5 };
  
  let quantumPaths = [];

  sldPaths.addEventListener("input", (e) => {
    lblPaths.textContent = parseInt(e.target.value);
    generateQuantumPaths();
  });

  sldHbar.addEventListener("input", (e) => {
    lblHbar.textContent = parseFloat(e.target.value).toFixed(2);
    generateQuantumPaths();
  });

  btnFeyLaunch.addEventListener("click", () => {
    // Regenerar caminos
    generateQuantumPaths();
  });

  // Generación de caminos con ruido browniano y extremos fijos
  function generateQuantumPaths() {
    const N = parseInt(sldPaths.value);
    const hbar = parseFloat(sldHbar.value);
    
    quantumPaths = [];
    
    const W = feyCanvas.width;
    const H = feyCanvas.height;
    
    const ax = startFey.x * W;
    const ay = startFey.y * H;
    const bx = endFey.x * W;
    const by = endFey.y * H;
    
    const distClassic = Math.hypot(bx - ax, by - ay);

    for (let pathIdx = 0; pathIdx < N; pathIdx++) {
      const pathPoints = [{ x: ax, y: ay }];
      const segments = 10;
      
      let accumLength = 0;
      let lastX = ax;
      let lastY = ay;

      // Generar puntos intermedios
      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        
        // Coordenada del camino clásico lineal
        const classicX = ax + (bx - ax) * t;
        const classicY = ay + (by - ay) * t;

        // Desviación cuántica basada en la amplitud de fluctuación (hbar)
        // A mayor hbar, mayor es la desviación permitida
        const devRange = hbar * H * 0.75;
        const deviationY = (Math.random() - 0.5) * devRange;
        const deviationX = (Math.random() - 0.5) * (devRange * 0.2); // menor fluctuación en X

        const px = classicX + deviationX;
        const py = classicY + deviationY;

        pathPoints.push({ x: px, y: py });
        accumLength += Math.hypot(px - lastX, py - lastY);
        
        lastX = px;
        lastY = py;
      }

      pathPoints.push({ x: bx, y: by });
      accumLength += Math.hypot(bx - lastX, by - lastY);

      // La Acción S de la trayectoria es proporcional a su longitud
      // Camino recto = Acción Mínima
      const action = accumLength / distClassic; // Normalizada. Clásico = 1.0

      quantumPaths.push({
        points: pathPoints,
        action: action
      });
    }

    drawFeynmanSuma();
  }

  function drawFeynmanSuma() {
    const W = feyCanvas.width;
    const H = feyCanvas.height;

    // 1. Limpiar canvas
    feyCtx.fillStyle = colors.bg;
    feyCtx.fillRect(0, 0, W, H);

    const ax = startFey.x * W;
    const ay = startFey.y * H;
    const bx = endFey.x * W;
    const by = endFey.y * H;

    // 2. Dibujar caminos cuánticos (Líneas ondulantes con opacidad)
    const numPaths = quantumPaths.length;
    feyCtx.lineWidth = 1;

    quantumPaths.forEach((path) => {
      // Los caminos con más acción (más largos y alejados) son más violetas/difusos
      feyCtx.strokeStyle = "rgba(142, 45, 226, 0.15)";
      
      feyCtx.beginPath();
      feyCtx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        feyCtx.lineTo(path.points[i].x, path.points[i].y);
      }
      feyCtx.stroke();
    });

    // 3. Dibujar camino clásico prominente (Dashed, fondo conceptual)
    feyCtx.strokeStyle = "rgba(0, 242, 254, 0.3)";
    feyCtx.lineWidth = 2;
    feyCtx.setLineDash([4, 4]);
    feyCtx.beginPath();
    feyCtx.moveTo(ax, ay);
    feyCtx.lineTo(bx, by);
    feyCtx.stroke();
    feyCtx.setLineDash([]);

    // 4. Dibujar fuente A y detector B
    feyCtx.fillStyle = colors.cyan;
    feyCtx.beginPath();
    feyCtx.arc(ax, ay, 5, 0, Math.PI * 2);
    feyCtx.fill();

    feyCtx.fillStyle = colors.violet;
    feyCtx.beginPath();
    feyCtx.arc(bx, by, 5, 0, Math.PI * 2);
    feyCtx.fill();

    // -------------------------------------------------------------
    // GRÁFICO INFERIOR IZQUIERDO: SUMA DE FASORES (DIAGRAMA DE FEYNMAN)
    // -------------------------------------------------------------
    const diagramSize = 110;
    const diagramX = W * 0.15 + 20;
    const diagramY = H * 0.75 + 10;
    const hbar = parseFloat(sldHbar.value);

    // Fondo del diagrama de fase
    feyCtx.fillStyle = "rgba(0,0,0,0.45)";
    feyCtx.strokeStyle = colors.border;
    feyCtx.lineWidth = 1;
    feyCtx.beginPath();
    feyCtx.arc(diagramX, diagramY, diagramSize / 2, 0, Math.PI * 2);
    feyCtx.fill();
    feyCtx.stroke();

    // Dibujar cruz de referencia en el centro
    feyCtx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    feyCtx.beginPath();
    feyCtx.moveTo(diagramX - diagramSize / 2, diagramY);
    feyCtx.lineTo(diagramX + diagramSize / 2, diagramY);
    feyCtx.moveTo(diagramX, diagramY - diagramSize / 2);
    feyCtx.lineTo(diagramX, diagramY + diagramSize / 2);
    feyCtx.stroke();

    // Sumatoria de vectores tip-to-tail (punta a cola)
    let currentVectorX = diagramX;
    let currentVectorY = diagramY;
    
    // Escalamiento del tamaño de cada vector individual para que quepa en el gráfico
    const vectorScale = (diagramSize * 0.38) / Math.max(1, Math.sqrt(numPaths));

    feyCtx.strokeStyle = "rgba(142, 45, 226, 0.4)";
    feyCtx.lineWidth = 1;

    quantumPaths.forEach((path) => {
      // Fase de Feynman: phi = Acción / hbar
      // La fase dicta el ángulo de rotación del número complejo e^{iS/hbar}
      const phi = path.action / hbar;
      
      const dx = Math.cos(phi) * vectorScale;
      const dy = Math.sin(phi) * vectorScale;

      feyCtx.beginPath();
      feyCtx.moveTo(currentVectorX, currentVectorY);
      feyCtx.lineTo(currentVectorX + dx, currentVectorY + dy);
      feyCtx.stroke();

      currentVectorX += dx;
      currentVectorY += dy;
    });

    // Dibujar el vector suma resultante en cian brillante
    feyCtx.strokeStyle = colors.cyan;
    feyCtx.lineWidth = 2.5;
    feyCtx.beginPath();
    feyCtx.moveTo(diagramX, diagramY);
    feyCtx.lineTo(currentVectorX, currentVectorY);
    feyCtx.stroke();

    // Dibujar punta de flecha en el vector suma
    const totalDX = currentVectorX - diagramX;
    const totalDY = currentVectorY - diagramY;
    const totalAmp = Math.hypot(totalDX, totalDY);
    
    if (totalAmp > 3) {
      const angle = Math.atan2(totalDY, totalDX);
      feyCtx.fillStyle = colors.cyan;
      feyCtx.beginPath();
      feyCtx.moveTo(currentVectorX, currentVectorY);
      feyCtx.lineTo(
        currentVectorX - 6 * Math.cos(angle - Math.PI / 6),
        currentVectorY - 6 * Math.sin(angle - Math.PI / 6)
      );
      feyCtx.lineTo(
        currentVectorX - 6 * Math.cos(angle + Math.PI / 6),
        currentVectorY - 6 * Math.sin(angle + Math.PI / 6)
      );
      feyCtx.closePath();
      feyCtx.fill();
    }

    // Calcular la amplitud física real (longitud del fasor total normalizado)
    const normAmplitude = totalAmp / (numPaths * vectorScale || 1.0);
    statAmplitude.textContent = normAmplitude.toFixed(3);

    // Clasificar el tipo de interferencia
    if (normAmplitude > 0.7) {
      statCoherent.textContent = "Coherente (Clásica)";
      statCoherent.style.color = colors.cyan;
    } else if (normAmplitude > 0.35) {
      statCoherent.textContent = "Cuántica Parcial";
      statCoherent.style.color = colors.gold;
    } else {
      statCoherent.textContent = "Destructiva (Cancelada)";
      statCoherent.style.color = colors.violet;
    }

    // Texto descriptivo del gráfico
    feyCtx.fillStyle = colors.muted;
    feyCtx.font = "9px JetBrains Mono";
    feyCtx.fillText("SUMATORIA FASORES e^(iS/ħ)", diagramX - 60, diagramY + diagramSize / 2 + 15);
  }

  // Inicializar simulación Feynman
  setTimeout(generateQuantumPaths, 200);
});
