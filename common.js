
/* this will be applied throughout the website for handling hamburger iin the navbar , fabContainer and dark-light mode through javascript*/ 

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
