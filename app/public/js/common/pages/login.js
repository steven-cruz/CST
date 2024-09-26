document.addEventListener('DOMContentLoaded', function () {
    const toastData = JSON.parse(localStorage.getItem('toastMsg'));
    if (toastData) {
        showToast(toastData.message, toastData.type);
        localStorage.removeItem('toastMsg');
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showToast(data.error, 'error');
        } else {
            localStorage.setItem('toastMsg', JSON.stringify({ message: '¡Inicio de sesión exitoso!', type: 'success' }));
            window.location.href = '/dashboard';
        }
    })
    .catch(error => console.error('Error:', error));
});
