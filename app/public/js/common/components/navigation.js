const toggle = document.getElementById('toggle');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    document.querySelector('body').classList.toggle('navigation-active');
});
