const btnDarkMode = document.querySelector("#btn-dark-mode");
const themeSystem = window.localStorage.getItem("themeSystem") || "light";

btnDarkMode.addEventListener("click", () => {
    let oldTheme = window.localStorage.getItem("themeSystem") || "light";
    let newTheme = oldTheme == "light" ? "dark" : "light";
    window.localStorage.setItem("themeSystem", newTheme);
    toggleDarkMode(newTheme);
});

const toggleDarkMode = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
};

toggleDarkMode(themeSystem);