import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Character from "./components/Character";
import Arrow from "./components/Arrow";
import Title from "./components/Title";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [position, setPosition] = useState({
    x: Math.floor(window.innerWidth / 2),
    y: Math.floor(window.innerHeight / 2),
  });
  const [horizontalTranslation, setHorizontalTranslation] = useState(0);
  const [verticalTranslation, setVerticalTranslation] = useState(0);

  const moveScreenAction = (
    direction: "left" | "right" | "up" | "down",
    position
  ) => {
    switch (direction) {
      case "left":
        if (currentScreen === "interests") {
          setCurrentScreen("home");
          setPosition(position);
          // translateScreen(0, 0);
        }
        break;
      case "right":
        if (currentScreen === "home") {
          setCurrentScreen("interests");
          setPosition(position);
          // translateScreen(0, 0);
        }
        break;
      case "up":
        break;
      case "down":
        break;
    }
  };

  const translateScreen = (x, y) => {
    setHorizontalTranslation(x);
    setVerticalTranslation(y);
  };

  return (
    <div className="frame">
      <Character
        moveScreenAction={moveScreenAction}
        position={position}
        setPosition={setPosition}
        translateScreen={translateScreen}
      />

      <div
        className="background"
        style={{
          transform: `translateX(${horizontalTranslation}px) translateY(${verticalTranslation}px)`,
        }}
      >
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
        <div
          className={`screen ${currentScreen === "interests" ? "" : "right"}`}
        >
          <div className="bordered-frame">
            <div className="content-container">
              <Arrow title={"Back to Main"} align={"left"} />
              <div className="interests-title-container">
                <Title
                  title="MY INTERESTS"
                  width={`${window.innerHeight - 71 * 2}px`}
                  size="80px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
