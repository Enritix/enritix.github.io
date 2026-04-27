const projects = ["Portfolio", "ReCuedle", "LegoLads", "ArdaCraft Map"];
const currentProject = document.querySelector("#current-project");

let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = projects[currentIndex];
    if (isDeleting) {
        currentProject.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % projects.length;
        }
    } else {
        currentProject.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

const hamburgerMenu = document.querySelector("#hamburger-menu");
const mobileNav = document.querySelector("#mobile-nav-container");
const contactIcons = document.querySelector("#contact-icons-container");

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    mobileNav.classList.toggle("hidden");
});