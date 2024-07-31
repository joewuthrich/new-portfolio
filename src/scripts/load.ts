export const load = () => {
  setTimeout(() => {
    show();
  }, 5000);

  if (document.readyState === "complete") {
    show();
  } else {
    window.addEventListener("load", () => {
      show();
    });
  }
};

const show = () => {
  document.getElementById("container").style.display = "";
  document.getElementById("page-loader").style.display = "none";
};
