document.addEventListener('DOMContentLoaded', function () {
    const toastData = JSON.parse(localStorage.getItem('toastMsg'));
    if (toastData) {
        showToast(toastData.message, toastData.type);
        localStorage.removeItem('toastMsg');
    }
});
