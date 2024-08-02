export const load = () => {
  setTimeout(() => {
    show();
  }, 4000);

  if (document.readyState === "complete") {
    setTimeout(() => {
      show();
    }, 1000);
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
