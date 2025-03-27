const projects = ["Portfolio", "ReCuedle", "LegoLads", "ArdaCraft Map"];

const currentProject = document.querySelector("#current-project");

let currentIndex = 0;

function updateProject() {
    currentProject.textContent = projects[currentIndex];
    currentIndex = (currentIndex + 1) % projects.length;
}

setInterval(updateProject, 2000);

updateProject();