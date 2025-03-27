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

hamburgerMenu.addEventListener("click", () => {
    // Toggle the active class for the hamburger menu
    hamburgerMenu.classList.toggle("active");

    // Toggle the hidden class for the mobile navigation
    mobileNav.classList.toggle("hidden");
});