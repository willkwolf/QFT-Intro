# Arquitectura del Motor de Scrollytelling

> **Categoría:** Arquitectura Técnica  
> **Ubicación:** `openwiki/architecture/scrollytelling-engine.md`

Este documento detalla la sincronización entre el desplazamiento vertical del usuario (*scroll*) y los estados interactivos de visualización.

---

## 1. Detección Reactiva mediante `IntersectionObserver`

En lugar de escuchar eventos continuos de `window.onscroll` (lo cual degrada el rendimiento de renderizado e introduce *jank*), el scrollytelling utiliza `IntersectionObserver` con márgenes de raíz (*root margins*) calibrados:

```typescript
const observerOptions = {
  root: null,
  threshold: 0.35,
  rootMargin: "-15% 0px -25% 0px" // Activa la sección cuando cruza la franja focal central
};

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = parseInt(entry.target.getAttribute('data-section-id') || '0');
      setActiveSection(sectionId);
    }
  });
};
```

---

## 2. Coordinación Estado-Narrativa

Cada sección de la narración (`<section data-section-id="N">`) vincula tres capas:
1. **Párrafo Conceptual / Histórico:** La explicación paso a paso redactada de forma intuitiva.
2. **Panel de Simulación / Visualizador:** El componente que reacciona actualizando sus parámetros automáticamente según la sección activa.
3. **Landau Companion:** Un panel lateral sincronizado que expone la cita textual, volumen y sección correspondiente del Curso de Física Teórica de Landau & Lifshitz.

---

## 3. Controles Fijos (*Sticky*) y Transiciones Suaves

- La barra de navegación superior (`Navigation.tsx`) permanece visible mediante `sticky top-0 z-50 backdrop-blur-md` para permitir el cambio inmediato de módulo.
- La barra de progreso de lectura horizontal proporciona feedback espacial inmediato de avance.
- Los controles de simulación (botones de play/pause, sliders de temperatura o longitud) se desacoplan del desplazamiento para que el usuario pueda detenerse a interactuar sin que el scroll desconfigure sus ajustes.
