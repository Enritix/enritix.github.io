const projects = ["Portfolio", "ReCuedle", "LegoLads", "ArdaCraft Map"];

const currentProject = document.querySelector("#current-project");

let currentIndex = 0;

function updateProject() {
    currentProject.textContent = projects[currentIndex];
    currentIndex = (currentIndex + 1) % projects.length;
}

setInterval(updateProject, 2000);

updateProject();

const hamburgerMenu = document.querySelector("#hamburger-menu");
const mobileNav = document.querySelector("#mobile-nav-container");
const contactIcons = document.querySelector("#contact-icons-container");

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    mobileNav.classList.toggle("hidden");
});