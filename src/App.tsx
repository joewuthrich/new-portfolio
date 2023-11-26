import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Character from "./components/Character";
import Arrow from "./components/Arrow";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [position, setPosition] = useState({
    x: Math.floor(window.innerWidth / 2),
    y: Math.floor(window.innerHeight / 2),
  });

  const moveScreenAction = (
    direction: "left" | "right" | "up" | "down",
    position
  ) => {
    switch (direction) {
      case "left":
        if (currentScreen === "interests") {
          setCurrentScreen("home");
          setPosition(position);
        }
        break;
      case "right":
        if (currentScreen === "home") {
          setCurrentScreen("interests");
          setPosition(position);
        }
        break;
      case "up":
        break;
      case "down":
        break;
    }
  };

  return (
    <div className="background">
      <Character
        moveScreenAction={moveScreenAction}
        position={position}
        setPosition={setPosition}
      />

      <div className={`screen ${currentScreen === "home" ? "" : "left"}`}>
        <div className="bordered-frame">
          <Header />
          <div className="content-container">
            <Arrow title={"My Interests"} align={"right"} />
            <Arrow title={"My Journey"} align={"bottom"} />
            <Arrow title={"About Me"} align={"left"} />
          </div>
        </div>
      </div>
      <div className={`screen ${currentScreen === "interests" ? "" : "right"}`}>
        gasdas
      </div>
    </div>
  );
};

export default App;
