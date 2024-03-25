const showSidebar = document.querySelector(".toggle-btn");

showSidebar.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});