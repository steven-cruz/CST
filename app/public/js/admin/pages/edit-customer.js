document.getElementById('edit-customer-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    const customerId = window.location.pathname.split('/').pop(); // Obtener ID del cliente de la URL

    try {
        const response = await fetch(`/api/customers/${customerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.error) {
            showToast(result.error, 'error');
        } else {
            localStorage.setItem('toastMsg', JSON.stringify({ message: '¡Información guardada exitosamente!', type: 'success' }));
            window.location.href = '/customers';
        }
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        showToast('Error al actualizar el cliente', 'error');
    }
});
