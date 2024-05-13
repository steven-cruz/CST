document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#create-customer');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío inicial
        let isFormValid = true;

        // Array de objetos con campos a validar
        const fields = [
            { id: '#document-type', errorMessage: 'Seleccione un tipo de documento.' },
            { id: '#document-number', errorMessage: 'Ingrese un número de documento.' },
            { id: '#first-name', errorMessage: 'Ingrese su nombre.' },
            { id: '#last-name', errorMessage: 'Ingrese su apellido.' },
            { id: '#phone-number', errorMessage: 'Ingrese un número de teléfono válido.', validate: validatePhoneNumber },
            { id: '#address-street', errorMessage: 'Ingrese una dirección.' },
            { id: '#email', errorMessage: 'Ingrese un correo electrónico válido.', validate: validateEmail }
        ];

        // Limpiar mensajes de error previos
        form.querySelectorAll('.container-error').forEach(error => error.remove());

        // Validar cada campo
        fields.forEach(field => {
            const input = document.querySelector(field.id);
            const value = input.value.trim();
            let isValid = value !== '';

            // Si hay una función de validación personalizada, usarla
            if (isValid && field.validate) {
                isValid = field.validate(value);
            }

            // Mostrar mensaje de error si el campo no es válido
            if (!isValid) {
                isFormValid = false;
                showFieldError(input, field.errorMessage);
            }
        });

        // Si todo es válido, permitir que el formulario se envíe
        if (isFormValid) {
            form.submit();
        }
    });

    // Función para mostrar un mensaje de error debajo del campo específico
    function showFieldError(input, message) {
        const container = input.closest('.control');
        const error = document.createElement('div');
        error.classList.add('container-error');
        error.innerHTML = `<span class="label-error">${message}</span>`;
        container.appendChild(error);
    }

    // Función para validar el formato de un correo electrónico
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Función para validar que el teléfono sea numérico
    function validatePhoneNumber(phone) {
        const phonePattern = /^\d+$/;
        return phonePattern.test(phone);
    }
});
