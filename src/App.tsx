import { useState, useRef, forwardRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Character from "./components/Character";
import Arrow from "./components/Arrow";
import Title from "./components/Title";
import Interest from "./components/Interest";

const App = () => {
  const screens = {
    home: {
      // North, East, South, West
      exits: [false, true, true, true],
    },
    interests: {
      exits: [false, false, false, true],
    },
    journey: {
      exits: [true, false, false, false],
    },
  };

  const [collidedDOM, setCollidedDOM] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [position, setPosition] = useState({
    x: Math.floor(window.innerWidth / 2),
    y: Math.floor(window.innerHeight / 2),
  });
  const [horizontalTranslation, setHorizontalTranslation] = useState(0);
  const [verticalTranslation, setVerticalTranslation] = useState(0);

  const headerRefs = useRef(null);

  const updateCollision = (element) => {
    setCollidedDOM(element);
  };

  const moveScreenAction = async (
    direction: "left" | "right" | "up" | "down",
    position
  ) => {
    switch (direction) {
      case "left":
        if (currentScreen === "interests") {
          setCurrentScreen("home");
          setPosition(position);
          setTimeout(() => translateScreen(0, 0), 250);
        }
        break;
      case "right":
        if (currentScreen === "home") {
          setCurrentScreen("interests");
          setPosition(position);
          setTimeout(() => translateScreen(0, 0), 250);
        }
        break;
      case "up":
        if (currentScreen === "journey") {
          setCurrentScreen("home");
          setPosition(position);
          setTimeout(() => translateScreen(0, 0), 250);
        }
        break;
      case "down":
        if (currentScreen === "home") {
          setCurrentScreen("journey");
          setPosition(position);
          setTimeout(() => translateScreen(0, 0), 250);
        }
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
        screenInfo={screens[currentScreen]}
        reactiveElements={[
          headerRefs?.current?.emailRef,
          headerRefs?.current?.linkedInRef,
        ]}
        updateCollision={updateCollision}
        collidedDOM={collidedDOM}
      />

      <div
        className="background"
        style={{
          transform: `translateX(${horizontalTranslation}px) translateY(${verticalTranslation}px)`,
        }}
      >
        <div
          className={`screen ${
            currentScreen === "home"
              ? ""
              : currentScreen === "journey"
              ? "top"
              : "left"
          }`}
        >
          <div className="bordered-frame">
            <Header collidedDOM={collidedDOM} />
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
              {/* //TODO: Add the way images are displayed (maybe list with left,right,left,right,etc) */}
              <Interest
                collidedDOM={collidedDOM}
                title={"PHOTOGRAPHY"}
                description="I started photography in order to get better photos to practice editing, and it's grown into one of my passions. Ask me anything about photography, Photoshop, or Lightroom!"
                imageSrcs={[
                  "/images/interests-photography-tongariro.jpg",
                  "/images/interests-photography-bajo.jpg",
                  "/images/interests-photography-pinnacles.jpg",
                ]}
              />
              <Interest
                collidedDOM={collidedDOM}
                title={"INNOVATION"}
                description="I've always loved creating new things, and this love has only grown. I've won a few awards for my own projects, such as the University of Auckland Velocity Innovation Challenge."
              />
              <Interest
                collidedDOM={collidedDOM}
                title={"TRAVEL"}
                description="I was lucky enough to travel a lot as a child, and especially during my time at university. I've gone everywhere from Singapore to Switzerland to Australia, and hope to continue travelling long into the future!"
                imageSrcs={[
                  "/images/interests-travel-singapore.jpg",
                  "/images/interests-travel-pinnacles.jpg",
                  "/images/interests-travel-london.jpg",
                ]}
              />
              <div className="interests-title-container">
                <Title
                  title="MY INTERESTS"
                  width={`${window.innerHeight - 71 * 2}px`}
                  size="70px"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`screen ${currentScreen === "journey" ? "" : "bottom"}`}
        >
          <div className="bordered-frame">
            <div className="content-container">
              <Arrow title={"Back to Main"} align={"top"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
