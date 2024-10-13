document.addEventListener('DOMContentLoaded', function () {
    const toastData = JSON.parse(localStorage.getItem('toastMsg'));
    if (toastData) {
        showToast(toastData.message, toastData.type);
        localStorage.removeItem('toastMsg');
    }

    let currentPage = 1;
    const limit = 9; // Límite de registros por página

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

            const customerCards = document.querySelector('#customer-cards');
            const tableContainer = document.querySelector('.container-customers-cards');
            const hasClients = document.getElementById('has-clients');
            const noCustomersMessage = document.getElementById('no-customers-message');
            const noResultFound = document.getElementById('no-result-found');

            customerCards.innerHTML = ''; // Limpiar la tabla

            // Ocultar todos los mensajes antes de procesar
            noCustomersMessage.style.display = 'none';
            noResultFound.style.display = 'none';
            tableContainer.style.display = 'none';

            if (customers.length > 0) {
                hasClients.setAttribute('aria-hidden', 'false');
                tableContainer.style.display = 'block';

                // Renderizar filas de clientes
                customers.forEach(customer => {
                    const card = document.createElement('div');
                    card.innerHTML = `
                        <div class="actions">
                            <button class="btn-edit" title="Editar" data-id="${customer.id}">
                                <img src="../../icons/edit.svg" alt="Edit">
                            </button>
                            <button class="btn-delete" title="Eliminar" data-id="${customer.id}">
                                <img src="../../icons/transh.svg" alt="Edit">
                            </button>
                        </div>
                        <div class="info id-field"><span class="title">ID</span><span class="label">${customer.id}</span></div>
                        <div class="info"><span class="title" title="Número de documento">Núm. Documento:</span><span class="label">${customer.document_number}</span></div>
                        <div class="info"><span class="title" title="Tipo de documento">Tipo de doc:</span><span class="label">${customer.document_type}</span></div>
                        <div class="info"><span class="title">Nombre(s):</span><span class="label">${customer.first_name}</span></div>
                        <div class="info"><span class="title">Apellido(s):</span><span class="label">${customer.last_name}</span></div>
                        <div class="info"><span class="title">Número de celular:</span><span class="label">${customer.phone_number}</span></div>
                        <div class="info"><span class="title">Dirección:</span><span class="label">${customer.address_street}</span></div>
                        <div class="info email-field"><span class="title">Correo electronico:</span><span class="label">${customer.email}</span></div>
                    `;
                    customerCards.appendChild(card);
                    card.classList.add('card-information');
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
                                    location.reload();
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
                pageButton.title = 'Página actual';
            }

            pageButton.addEventListener('click', function () {
                currentPage = page;
                window.scrollTo({top: 0, behavior: 'smooth'});
                loadCustomers(); // Cargar la página seleccionada
            });

            paginationContainer.appendChild(pageButton);
        }
    }
});
