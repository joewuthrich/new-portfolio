export const load = () => {
  window.addEventListener("load", () => {
    document.getElementById("container").style.display = "";
    document.getElementById("page-loader").style.display = "none";
  });
};
