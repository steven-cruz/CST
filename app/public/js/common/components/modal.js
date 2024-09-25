function showModal(message, onConfirm) {
    const modal = document.getElementById('global-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');

    // Set the message
    modalMessage.textContent = message;

    // Mostrar el modal
    modal.style.display = 'flex';

    // Confirmación de acción
    modalConfirm.onclick = function () {
        modal.style.display = 'none';
        if (onConfirm) {
            onConfirm();  // Ejecuta la función de confirmación
        }
    };

    // Cancelación o cierre del modal
    modalCancel.onclick = modalClose.onclick = function () {
        modal.style.display = 'none';
    };
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('global-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
