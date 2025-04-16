const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

const setDarkScrollbar = () => {
  document.documentElement.style.setProperty('--scroll-track', '#121212');
  document.documentElement.style.setProperty('--scroll-thumb', '#e91e63');
  document.documentElement.style.setProperty('--scroll-thumb-hover', '#c2185b');
};

const setLightScrollbar = () => {
  document.documentElement.style.setProperty('--scroll-track', '#f1f1f1');
  document.documentElement.style.setProperty('--scroll-thumb', '#e91e63');
  document.documentElement.style.setProperty('--scroll-thumb-hover', '#c2185b');
};

if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  setDarkScrollbar();
} else {
  setLightScrollbar();
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    setDarkScrollbar();
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    setLightScrollbar();
  }
});
