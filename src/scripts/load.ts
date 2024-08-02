export const load = () => {
  setTimeout(() => {
    show();
  }, 3000);

  if (document.readyState === "complete") {
    show();
  } else {
    window.addEventListener("load", () => {
      show();
    });
  }
};

const show = () => {
  document.getElementById("loader-container").style.display = "none";
  document.getElementById("journey-screen").style.display = "";
};
