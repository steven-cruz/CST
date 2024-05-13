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
                <td>${customer.document_type}</td>
                <td>${customer.document_number}</td>
                <td>${customer.first_name}</td>
                <td>${customer.last_name}</td>
                <td>${customer.phone_number}</td>
                <td>${customer.address_street}</td>
                <td>${customer.email}</td>
                <td>${createdAtFormatted}</td>
                <td>${updatedAtFormatted}</td>
            `;
            tableBody.appendChild(row);
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
