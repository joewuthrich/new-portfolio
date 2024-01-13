import { useEffect } from "react";
import "./NotesPopup.css";
import Icons from "./Svg";

const Popup = ({ setPopup }) => {
  useEffect(() => {
    const overlay = document.getElementById("popup-overlay");
    const exit = document.getElementById("popup-exit-box");
    overlay.addEventListener("pointerdown", () => {
      setPopup("");
    });
    exit.addEventListener("pointerdown", () => {
      setPopup("");
    });
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [setPopup]);

  return (
    <div className="popup-overlay">
      <div id="popup-overlay" className="popup-overlay popup-opacity"></div>
      <div className="popup-box">
        <div className="popup-exit-box" id="popup-exit-box">
          <Icons.Cross />
        </div>
        <p className="popup-text popup-text-top">
          It looks like you're looking for Joe's Notes!
        </p>
        <p className="popup-text">
          Unfortunately,{" "}
          <span className="bold-popup-text">
            Joe's notes has been taken down
          </span>{" "}
          - As I've now graduated, I'm losing access to the account used to host
          it (my university account), and I don't want to have to host it or
          manage it as I move on to jobs and other commitments.
        </p>
        <p className="popup-text">
          I want to thank everyone who contributed to it, and in particular,
          Bryn and Nathan for doing a fantastic job with their sections!
          Hopefully someone else will fill the gap and create an "Emily's Notes"
          or "Zac's Notes", and the tradition can continue.
        </p>
        <p className="popup-text">
          That being said, If anyone wants to stay in contact with me (or just
          needs more connections), my LinkedIn can be found on this page, and
          you can reach me there.
        </p>
        <p className="popup-text popup-text-bottom">
          For those of you still in university, good luck with the rest of your
          journey, and I hope you enjoy it as much as I did. For those who are
          graduating, I look forward to seeing some of you in the workplace -
          either way, stay in touch!
        </p>
      </div>
    </div>
  );
};

export default Popup;
