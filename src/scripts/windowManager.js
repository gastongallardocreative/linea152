/**
 * Window Manager — Línea 152
 * Maneja: abrir, cerrar, mover, traer al frente, minimizar, restaurar
 */

// Estado global del manager
const state = {
  topZIndex: 100,           // z-index actual más alto
  draggingWindow: null,     // qué ventana se está arrastrando ahora
  dragOffset: { x: 0, y: 0 } // offset del mouse respecto al borde de la ventana
};

/**
 * Inicializa el window manager cuando carga la página.
 */
function init() {
  bindIconClicks();
  bindWindowEvents();
  bindGlobalMouseEvents();
}

/**
 * Cuando clickeás un ícono del escritorio, abrí la ventana correspondiente.
 */
function bindIconClicks() {
  const icons = document.querySelectorAll('.desktop-icon');
  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      const targetId = icon.dataset.target;
      openWindow(targetId);
    });
  });
}

/**
 * Eventos de cada ventana: cerrar, minimizar, click para enfocar, drag.
 */
function bindWindowEvents() {
  const windows = document.querySelectorAll('.window');

  windows.forEach(win => {
    // Click en cualquier parte de la ventana → trae al frente
    win.addEventListener('mousedown', () => focusWindow(win));

    // Botones de cerrar y minimizar
    const buttons = win.querySelectorAll('[data-action]');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'close') closeWindow(win);
        if (action === 'minimize') minimizeWindow(win);
      });
    });

    // Drag de la titlebar
    const titlebar = win.querySelector('[data-drag-handle]');
    if (titlebar) {
      titlebar.addEventListener('mousedown', (e) => startDrag(e, win));
    }
  });
}

/**
 * Mouse events globales para el drag (mover y soltar)
 */
function bindGlobalMouseEvents() {
  document.addEventListener('mousemove', doDrag);
  document.addEventListener('mouseup', endDrag);
}

/**
 * Abre una ventana (la muestra y la trae al frente)
 */
function openWindow(windowId) {
  const win = document.querySelector(`[data-window-id="${windowId}"]`);
  if (!win) {
    console.warn(`Ventana no encontrada: ${windowId}`);
    return;
  }

  // Si estaba minimizada en el dock, quitarla del dock
  removeFromDock(windowId);

  // Mostrar la ventana
  win.style.display = 'flex';
  focusWindow(win);
}

/**
 * Cierra una ventana (la oculta)
 */
function closeWindow(win) {
  win.style.display = 'none';
  const windowId = win.dataset.windowId;
  removeFromDock(windowId);
}

/**
 * Minimiza una ventana: la oculta y agrega un item al dock
 */
function minimizeWindow(win) {
  const windowId = win.dataset.windowId;
  const title = win.querySelector('.window-title').textContent;

  win.style.display = 'none';
  addToDock(windowId, title);
}

/**
 * Trae una ventana al frente actualizando su z-index.
 */
function focusWindow(win) {
  state.topZIndex += 1;
  win.style.zIndex = state.topZIndex;

  // Marcar como "focused" para los estilos
  document.querySelectorAll('.window.is-focused').forEach(w => w.classList.remove('is-focused'));
  win.classList.add('is-focused');
}

/**
 * Inicia el drag de una ventana
 */
function startDrag(e, win) {
  // No iniciar drag si el click fue en un botón
  if (e.target.closest('[data-action]')) return;

  state.draggingWindow = win;

  const rect = win.getBoundingClientRect();
  state.dragOffset.x = e.clientX - rect.left;
  state.dragOffset.y = e.clientY - rect.top;

  focusWindow(win);
  e.preventDefault();
}

/**
 * Mueve la ventana siguiendo el mouse
 */
function doDrag(e) {
  if (!state.draggingWindow) return;

  const win = state.draggingWindow;
  let newX = e.clientX - state.dragOffset.x;
  let newY = e.clientY - state.dragOffset.y;

  // Limitar a los bordes de la pantalla
  const maxX = window.innerWidth - 50; // dejar al menos 50px visible
  const maxY = window.innerHeight - 50;
  const minY = 24; // no taparse con el menubar

  newX = Math.max(-win.offsetWidth + 80, Math.min(newX, maxX));
  newY = Math.max(minY, Math.min(newY, maxY));

  win.style.left = `${newX}px`;
  win.style.top = `${newY}px`;
}

/**
 * Termina el drag
 */
function endDrag() {
  state.draggingWindow = null;
}

/**
 * Agrega una ventana minimizada al dock
 */
function addToDock(windowId, title) {
  const dock = document.getElementById('dock');
  if (!dock) return;

  // Si ya existe en el dock, no duplicar
  if (dock.querySelector(`[data-dock-id="${windowId}"]`)) return;

  const item = document.createElement('div');
  item.className = 'dock-item';
  item.dataset.dockId = windowId;
  item.textContent = title;
  item.addEventListener('click', () => openWindow(windowId));

  dock.appendChild(item);
}

/**
 * Quita una ventana del dock
 */
function removeFromDock(windowId) {
  const dock = document.getElementById('dock');
  if (!dock) return;
  const item = dock.querySelector(`[data-dock-id="${windowId}"]`);
  if (item) item.remove();
}

// Arrancar todo cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}