export const load = () => {
  setTimeout(() => {
    show();
  }, 5000);

  if (document.readyState === "complete") {
    window.addEventListener("load", () => {
      show();
    });
  } else {
    window.addEventListener("load", () => {
      show();
    });
  }
};

const show = () => {
  document.getElementById("loader-container").style.display = "none";
};
