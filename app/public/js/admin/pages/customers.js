document.addEventListener('DOMContentLoaded', loadCustomers);

async function loadCustomers() {
    const toastData = JSON.parse(localStorage.getItem('toastMsg'));
    if (toastData) {
        showToast(toastData.message, toastData.type);
        localStorage.removeItem('toastMsg'); // Limpiar el mensaje una vez mostrado
    }

    try {
        const response = await fetch('/api/customers');
        const customers = await response.json();

        const tableBody = document.querySelector('#customers-table tbody');
        tableBody.innerHTML = '';

        customers.forEach(customer => {
            const createdAtFormatted = customer.create_at.split('T')[0];
            const updatedAtFormatted = customer.update_up.split('T')[0];
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${customer.id}</td>
                <td class="document-type">${customer.document_type}</td>
                <td>${customer.document_number}</td>
                <td>${customer.first_name}</td>
                <td>${customer.last_name}</td>
                <td>${customer.phone_number}</td>
                <td>${customer.address_street}</td>
                <td>${customer.email}</td>
                <td><button class="btn-delete" data-id="${customer.id}">Eliminar</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Asignar eventos a los botones de eliminar
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', async function () {
                const customerId = this.getAttribute('data-id');
                const confirmed = confirm('¿Estás seguro de que deseas eliminar este cliente?');
                if (!confirmed) return;

                try {
                    const deleteResponse = await fetch(`/api/customers/${customerId}`, {
                        method: 'DELETE',
                        credentials: 'include',
                    });

                    const result = await deleteResponse.json();

                    if (result.error) {
                        alert(result.error);
                    } else {
                        loadCustomers();
                        showToast(result.message, 'success');
                    }
                } catch (error) {
                    console.error('Error al eliminar el cliente:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
    }
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? 'green' : 'red';
    toast.style.color = 'white';
    toast.style.padding = '10px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}
