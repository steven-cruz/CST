document.addEventListener('DOMContentLoaded', function () {
    const toastData = JSON.parse(localStorage.getItem('toastMsg'));
    if (toastData) {
        showToast(toastData.message, toastData.type);
        localStorage.removeItem('toastMsg');
    }

    let currentPage = 1;
    const limit = 10; // Límite de registros por página

    // Mostrar los clientes al cargar la página
    loadCustomers();

    // Asignar evento al input de búsqueda
    document.getElementById('filter-input').addEventListener('keyup', function () {
        currentPage = 1; // Reiniciar la página actual cuando se realiza una búsqueda
        loadCustomers();
    });

    // Función para cargar clientes (con filtrado y paginación)
    async function loadCustomers() {
        const searchValue = document.getElementById('filter-input')?.value || '';

        try {
            const response = await fetch(`/api/customers?search=${searchValue}&page=${currentPage}&limit=${limit}`);

            const result = await response.json();
            const customers = result.customers || [];
            const totalPages = result.totalPages || 1;

            const tableBody = document.querySelector('#customers-table tbody');
            const tableContainer = document.querySelector('.container-customers-table');
            const hasClients = document.getElementById('has-clients');
            const noCustomersMessage = document.getElementById('no-customers-message');
            const noResultFound = document.getElementById('no-result-found');

            tableBody.innerHTML = ''; // Limpiar la tabla

            // Ocultar todos los mensajes antes de procesar
            noCustomersMessage.style.display = 'none';
            noResultFound.style.display = 'none';
            tableContainer.style.display = 'none';

            if (customers.length > 0) {
                hasClients.style.display = 'block';
                tableContainer.style.display = 'block';

                // Renderizar filas de clientes
                customers.forEach(customer => {
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
                        <td>
                            <button class="btn-edit" data-id="${customer.id}">Editar</button>
                            <button class="btn-delete" data-id="${customer.id}">Eliminar</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                // Asignar eventos a los botones de eliminar
                document.querySelectorAll('.btn-delete').forEach(button => {
                    button.addEventListener('click', async function () {
                        const customerId = this.getAttribute('data-id');

                        // Mostrar modal de confirmación antes de eliminar
                        showModal('¿Estás seguro de que deseas eliminar este cliente?', async function () {
                            try {
                                const deleteResponse = await fetch(`/api/customers/${customerId}`, {
                                    method: 'DELETE',
                                    credentials: 'include',
                                });

                                const result = await deleteResponse.json();

                                if (result.error) {
                                    showToast(result.error, 'error');
                                } else {
                                    showToast(result.message, 'success');
                                    loadCustomers(); // Recargar la tabla después de eliminar
                                }
                            } catch (error) {
                                console.error('Error al eliminar el cliente:', error);
                                showToast('Error al eliminar el cliente', 'error');
                            }
                        });
                    });
                });

                // Asignar eventos al botón de editar
                document.querySelectorAll('.btn-edit').forEach(button => {
                    button.addEventListener('click', function() {
                        const customerId = this.getAttribute('data-id');
                        window.location.href = `/api/customers/edit/${customerId}`;
                    });
                });

                // Actualizar la paginación
                renderPagination(totalPages);
            } else {
                // Si hay un valor en el campo de búsqueda pero no se encuentran resultados
                if (searchValue.length > 0) {
                    noResultFound.style.display = 'block';
                } else {
                    // Si no hay clientes registrados y no se está filtrando
                    noCustomersMessage.style.display = 'block';
                }
            }

        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        }
    }

    // Función para renderizar la paginación
    function renderPagination(totalPages) {
        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = ''; // Limpiar la paginación previa

        for (let page = 1; page <= totalPages; page++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = page;
            pageButton.classList.add('pagination-button');
            if (page === currentPage) {
                pageButton.disabled = true;
            }

            pageButton.addEventListener('click', function () {
                currentPage = page;
                loadCustomers(); // Cargar la página seleccionada
            });

            paginationContainer.appendChild(pageButton);
        }
    }
});
