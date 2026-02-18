function toggleHamburger() {
    const menu = document.getElementById('hamburgerMenu');
    menu.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('hamburgerMenu');
    const hamburger = document.querySelector('.hamburger');

    if (menu.classList.contains('active')) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove('active');
        }
    }
});