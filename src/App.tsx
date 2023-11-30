import { useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Character from "./components/Character";
import Arrow from "./components/Arrow";
import InterestsPage from "./components/pages/InterestsPage";
import JourneyPage from "./components/pages/JourneyPage";
import Footprint from "./components/Footprint";

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

  const charHeight = 132;
  const charWidth = 69;

  const [footprints, setFootprints] = useState([]);
  const [collidedDOM, setCollidedDOM] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [position, setPosition] = useState({
    x: Math.floor(window.innerWidth / 2 - charWidth / 2),
    y: Math.floor(window.innerHeight / 2 + charHeight / 2),
  });
  const [horizontalTranslation, setHorizontalTranslation] = useState(0);
  const [verticalTranslation, setVerticalTranslation] = useState(0);
  const [portfolioType, setPortfolioType] = useState("iconic figure");

  useEffect(() => {
    setPortfolioType(
      new URL(window.location.href).searchParams.get("type") ?? "iconic figure"
    );
  }, []);

  const headerRefs = useRef(null);

  const updateCollision = (element) => {
    setCollidedDOM(element);
  };

  const moveScreenAction = async (
    direction: "left" | "right" | "up" | "down"
  ) => {
    // TODO: Pass these to Character.tsx
    const slowThreshold = 120;

    let newPosition;
    switch (direction) {
      case "left":
        newPosition = {
          x: window.innerWidth - slowThreshold - charWidth - 1,
          y: position.y,
        };
        if (currentScreen === "interests") {
          setCurrentScreen("home");
          setPosition(newPosition);
          setTimeout(() => translateScreen(0, 0), 250);
        }
        break;
      case "right":
        newPosition = { x: slowThreshold + 1, y: position.y };
        if (currentScreen === "home") {
          setCurrentScreen("interests");
          setPosition(newPosition);
          setTimeout(() => translateScreen(0, 0), 250);
        }
        break;
      case "up":
        newPosition = {
          x: position.x,
          y: window.innerHeight - slowThreshold - charHeight - 1,
        };
        if (currentScreen === "journey") {
          setCurrentScreen("home");
          setPosition(newPosition);
          setTimeout(() => translateScreen(0, 0), 250);
        }
        break;
      case "down":
        newPosition = {
          x: position.x,
          y: slowThreshold + 1,
        };
        if (currentScreen === "home") {
          setCurrentScreen("journey");
          setPosition(newPosition);
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
        setFootprints={setFootprints}
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
          {currentScreen === "home"
            ? footprints.map((fp, _) => (
                <Footprint
                  key={fp.key}
                  position={{ x: fp.x, y: fp.y }}
                  side={fp.side}
                  facing={fp.facing}
                />
              ))
            : null}
          <div className="bordered-frame">
            <Header
              collidedDOM={collidedDOM}
              subtitle={portfolioType.toUpperCase()}
            />
            <div className="content-container">
              <Arrow
                title={"My Interests"}
                align={"right"}
                onClick={() => moveScreenAction("right")}
                collidedDOM={collidedDOM}
              />
              <Arrow
                title={"My Journey"}
                align={"bottom"}
                onClick={() => moveScreenAction("down")}
                collidedDOM={collidedDOM}
              />
              <Arrow
                title={"About Me"}
                align={"left"}
                onClick={() => moveScreenAction("left")}
                collidedDOM={collidedDOM}
              />
            </div>
          </div>
        </div>
        <div
          className={`screen ${currentScreen === "interests" ? "" : "right"}`}
        >
          {currentScreen === "interests"
            ? footprints.map((fp, _) => (
                <Footprint
                  key={fp.key}
                  position={{ x: fp.x, y: fp.y }}
                  side={fp.side}
                  facing={fp.facing}
                />
              ))
            : null}
          <div className="bordered-frame">
            <InterestsPage
              collidedDOM={collidedDOM}
              moveScreenAction={moveScreenAction}
            />
          </div>
        </div>
        <div
          className={`screen ${currentScreen === "journey" ? "" : "bottom"}`}
        >
          {currentScreen === "journey"
            ? footprints.map((fp, _) => (
                <Footprint
                  key={fp.key}
                  position={{ x: fp.x, y: fp.y }}
                  side={fp.side}
                  facing={fp.facing}
                />
              ))
            : null}
          <div className="bordered-frame">
            <JourneyPage
              collidedDOM={collidedDOM}
              moveScreenAction={moveScreenAction}
              type="software developer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
