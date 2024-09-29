function showToast(message, type) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.classList = 'toast-message'
    toast.style.backgroundColor = type === 'success' ? 'green' : 'red';
    document.body.appendChild(toast);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 5000);
}
