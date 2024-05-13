document.addEventListener('DOMContentLoaded', loadCustomers);

async function loadCustomers() {
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
