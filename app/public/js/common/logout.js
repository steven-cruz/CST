document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('toastMsg', JSON.stringify({ message: '¡La sesión se cerró exitosamente!', type: 'success' }));
                window.location.href = '/';
            })
            .catch(error => console.error('Error al cerrar sesión:', error));
        });
    }
});
