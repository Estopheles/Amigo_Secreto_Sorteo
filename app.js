// Array para almacenar los nombres de los amigos
let amigos = [];

/**
 * Función para agregar un amigo a la lista
 * Valida que el nombre no esté vacío y no esté duplicado
 */
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el nombre no esté vacío
    if (nombreAmigo === '') {
        mostrarNotificacion('Por favor, ingresa un nombre válido.', 'warning');
        inputAmigo.focus();
        return;
    }
    
    // Validar que el nombre no esté duplicado
    if (amigos.includes(nombreAmigo)) {
        mostrarNotificacion('Este nombre ya está en la lista.', 'warning');
        inputAmigo.focus();
        return;
    }
    
    // Agregar el nombre al array
    amigos.push(nombreAmigo);
    
    // Limpiar el input
    inputAmigo.value = '';
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Limpiar resultado anterior si existe
    limpiarResultado();
    
    // Mostrar notificación de éxito
    mostrarNotificacion(`${nombreAmigo} agregado exitosamente!`, 'success');
}

/**
 * Función para actualizar la lista visual de amigos
 */
function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    // Si no hay amigos, mostrar estado vacío
    if (amigos.length === 0) {
        const emptyState = document.createElement('li');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'Los nombres aparecerán aquí...';
        lista.appendChild(emptyState);
        return;
    }
    
    // Crear elementos de lista para cada amigo con animación
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo}`;
        li.style.animationDelay = `${index * 0.1}s`;
        lista.appendChild(li);
    });
}

/**
 * Función para sortear un amigo secreto
 * Selecciona aleatoriamente un nombre de la lista
 */
function sortearAmigo() {
    // Validar que haya amigos en la lista
    if (amigos.length === 0) {
        mostrarNotificacion('No hay amigos en la lista. Agrega algunos nombres primero.', 'warning');
        return;
    }
    
    // Generar índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    
    // Obtener el amigo seleccionado
    const amigoSeleccionado = amigos[indiceAleatorio];
    
    // Mostrar el resultado con animación
    mostrarResultado(amigoSeleccionado);
}

/**
 * Función para mostrar el resultado del sorteo
 * @param {string} amigo - El nombre del amigo seleccionado
 */
function mostrarResultado(amigo) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>🎉 ¡${amigo} es tu amigo secreto! 🎁</li>`;
}

/**
 * Función para limpiar el resultado anterior
 */
function limpiarResultado() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
}

/**
 * Función para mostrar notificaciones temporales
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación ('success' o 'warning')
 */
function mostrarNotificacion(mensaje, tipo) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: 'Poppins', sans-serif;
        ${tipo === 'success' ? 'background: var(--success-color);' : 'background: var(--warning-color);'}
    `;
    
    document.body.appendChild(notificacion);
    
    // Mostrar notificación con animación
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y eliminar notificación después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

/**
 * Función para permitir agregar amigos presionando Enter
 * @param {Event} event - El evento del teclado
 */
function manejarTeclaEnter(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
}

/**
 * Función opcional para reiniciar el juego
 */
function reiniciarJuego() {
    amigos = [];
    actualizarListaAmigos();
    limpiarResultado();
    document.getElementById('amigo').value = '';
    mostrarNotificacion('Juego reiniciado', 'success');
}

// Event listeners que se ejecutan cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    const inputAmigo = document.getElementById('amigo');
    
    // Agregar event listener para la tecla Enter
    inputAmigo.addEventListener('keypress', manejarTeclaEnter);
    
    // Enfocar automáticamente el input al cargar la página
    inputAmigo.focus();
});