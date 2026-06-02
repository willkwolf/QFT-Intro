/* main.js - Control General de Scrolltelling e Interacciones */

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. ANTES DE COMENZAR: DETECTAR Y REGISTRAR FASES
  // ==========================================
  const sections = document.querySelectorAll(".phase-section");
  const dotsContainer = document.getElementById("dots-navigation");
  const progressIndicator = document.getElementById("progress-indicator");

  // Generar dinámicamente los Dots laterales de navegación
  sections.forEach((sec, idx) => {
    const label = sec.getAttribute("data-label") || `Fase ${idx}`;
    const dot = document.createElement("div");
    dot.className = "dot-link";
    dot.setAttribute("data-label", label);
    dot.setAttribute("data-target", sec.id);
    
    dot.addEventListener("click", () => {
      sec.scrollIntoView({ behavior: "smooth" });
    });
    
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot-link");

  // ==========================================
  // 2. SCROLL MONITOR: PROGRESO Y ACTIVACIÓN DE DOTS
  // ==========================================
  window.addEventListener("scroll", () => {
    // A. Barra de Progreso Superior
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / (scrollHeight || 1)) * 100;
    progressIndicator.style.width = `${scrollPercent}%`;

    // B. Activar Dot según la fase visible actual
    let currentPhaseId = "";
    const scrollPos = window.scrollY + window.innerHeight / 2; // medir por el centro de la pantalla

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentPhaseId = sec.id;
      }
    });

    // Si estamos arriba del todo, activar nada o el primero
    if (window.scrollY < 100) {
      currentPhaseId = "hero-section";
    }

    dots.forEach((dot) => {
      const targetId = dot.getAttribute("data-target");
      if (targetId === currentPhaseId) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  });

  // Trigger inicial de scroll
  window.dispatchEvent(new Event("scroll"));

  // ==========================================
  // 3. INTERSECTION OBSERVER (REVELACIONES SUAVES)
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Dejar de observar una vez revelado para mejorar rendimiento
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Disparar cuando el 10% del elemento sea visible
      rootMargin: "0px 0px -50px 0px" // Disparar ligeramente antes de entrar del todo
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });


  // ==========================================
  // 4. CANVAS ESPACIO-TEMPORAL INTERACTIVO
  // ==========================================
  const bgCanvas = document.getElementById("spacetime-canvas");
  const bgCtx = bgCanvas.getContext("2d");

  let canvasW = bgCanvas.width = window.innerWidth;
  let canvasH = bgCanvas.height = window.innerHeight;

  // Seguimiento de posición del mouse
  const mouse = {
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false
  };

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  // Reajustar tamaño del canvas
  window.addEventListener("resize", () => {
    canvasW = bgCanvas.width = window.innerWidth;
    canvasH = bgCanvas.height = window.innerHeight;
  });

  // Configuración de la Rejilla
  const gridSpacing = 45; // Distancia entre líneas en píxeles

  // Función para calcular la deformación del espaciotiempo (Curvatura Gravitacional)
  // Utiliza el principio físico de campo deformable (desplazamiento radial inverso al cuadrado)
  function deformPoint(x, y, mx, my, scrollVelocity) {
    if (mx < 0 || my < 0) return { x, y };

    const dx = mx - x;
    const dy = my - y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    // Parámetros de masa gravitatoria
    const massRadius = 220; // Radio de influencia
    const maxDeform = 50;  // Fuerza de deformación máxima

    if (dist < massRadius && dist > 0) {
      // Fuerza que decae con la distancia (atracción elástica)
      const force = (1.0 - dist / massRadius) * maxDeform;
      
      // Desplazar el punto hacia la masa (mouse)
      return {
        x: x + (dx / dist) * force,
        y: y + (dy / dist) * force
      };
    }

    return { x, y };
  }

  // Medición de velocidad de scroll para efectos de inercia
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  
  function updateScrollVelocity() {
    const currentScrollY = window.scrollY;
    scrollVelocity = (currentScrollY - lastScrollY) * 0.15;
    lastScrollY = currentScrollY;
    
    // Amortiguamiento de velocidad
    scrollVelocity *= 0.9;
  }

  // Bucle de Animación de Fondo
  function renderSpacetime() {
    updateScrollVelocity();

    // Suavizado del movimiento del mouse (Interpolación lineal LERP)
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    // Si el mouse sale, alejarlo suavemente del canvas
    if (!mouse.active) {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    }

    bgCtx.clearRect(0, 0, canvasW, canvasH);

    // Dibujar rejilla deformada
    // Calculamos los nodos
    const cols = Math.ceil(canvasW / gridSpacing) + 2;
    const rows = Math.ceil(canvasH / gridSpacing) + 2;

    const deformedGrid = [];

    for (let r = 0; r < rows; r++) {
      deformedGrid[r] = [];
      for (let c = 0; c < cols; c++) {
        // Coordenada base del nodo
        const baseX = (c - 1) * gridSpacing;
        const baseY = (r - 1) * gridSpacing;

        // Añadir una leve oscilación temporal que simula ondas gravitacionales continuas
        const timeOscillation = Math.sin(Date.now() * 0.001 + (baseX * 0.005) + (baseY * 0.005)) * 2;

        // Deformar punto por la masa gravitatoria (mouse) y por el scroll
        const p = deformPoint(
          baseX,
          baseY + timeOscillation - scrollVelocity,
          mouse.x,
          mouse.y
        );
        deformedGrid[r][c] = p;
      }
    }

    // Renderizar Líneas
    bgCtx.lineWidth = 1;

    // A. Líneas Horizontales
    for (let r = 0; r < rows; r++) {
      bgCtx.beginPath();
      bgCtx.moveTo(deformedGrid[r][0].x, deformedGrid[r][0].y);
      for (let c = 1; c < cols; c++) {
        bgCtx.lineTo(deformedGrid[r][c].x, deformedGrid[r][c].y);
      }
      
      // Color degradado para simular dispersión de energía
      const strokeGrad = bgCtx.createLinearGradient(0, 0, canvasW, 0);
      strokeGrad.addColorStop(0, "rgba(0, 242, 254, 0.03)");
      strokeGrad.addColorStop(0.5, "rgba(142, 45, 226, 0.06)");
      strokeGrad.addColorStop(1, "rgba(226, 183, 105, 0.03)");
      bgCtx.strokeStyle = strokeGrad;
      bgCtx.stroke();
    }

    // B. Líneas Verticales
    for (let c = 0; c < cols; c++) {
      bgCtx.beginPath();
      bgCtx.moveTo(deformedGrid[0][c].x, deformedGrid[0][c].y);
      for (let r = 1; r < rows; r++) {
        bgCtx.lineTo(deformedGrid[r][c].x, deformedGrid[r][c].y);
      }
      
      const strokeGrad = bgCtx.createLinearGradient(0, 0, 0, canvasH);
      strokeGrad.addColorStop(0, "rgba(0, 242, 254, 0.03)");
      strokeGrad.addColorStop(0.5, "rgba(142, 45, 226, 0.06)");
      strokeGrad.addColorStop(1, "rgba(226, 183, 105, 0.03)");
      bgCtx.strokeStyle = strokeGrad;
      bgCtx.stroke();
    }

    // C. Dibujar el horizonte de sucesos local del puntero (si está activo)
    if (mouse.active && mouse.x > 0 && mouse.y > 0) {
      bgCtx.shadowBlur = 15;
      bgCtx.shadowColor = "rgba(0, 242, 254, 0.2)";
      bgCtx.fillStyle = "rgba(0, 242, 254, 0.015)";
      bgCtx.beginPath();
      bgCtx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
      bgCtx.fill();
      
      // Reset sombras
      bgCtx.shadowBlur = 0;
    }

    requestAnimationFrame(renderSpacetime);
  }

  // Iniciar animación del espaciotiempo
  renderSpacetime();
});
