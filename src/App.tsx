import { useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Character from "./components/Character";
import Arrow from "./components/Arrow";
import InterestsPage from "./components/pages/InterestsPage";
import JourneyPage from "./components/pages/JourneyPage";
import Footprint from "./components/Footprint";
import { createGlobalStyle } from "styled-components";
import LightDarkToggle from "./components/LightDarkToggle";
import Instructions from "./components/Instructions";

const App = () => {
  const screens = {
    home: {
      // North, East, South, West
      name: "home",
      exits: [false, true, true, true],
    },
    interests: {
      name: "interests",
      exits: [false, false, false, true],
    },
    journey: {
      name: "journey",
      exits: [true, false, false, false],
    },
    about: {
      name: "about",
      exits: [false, true, false, false],
    },
  };

  const charHeight = 93;
  const charWidth = 69;
  const slowThreshold = 120;
  const startPos = {
    x: Math.floor(window.innerWidth / 2 - charWidth / 2 + 60),
    y: Math.floor(window.innerHeight / 2 + charHeight / 2 + 60),
  };

  const [isDark, setIsDark] = useState(() => {
    if (localStorage.getItem("theme-preference"))
      return localStorage.getItem("theme-preference") === "dark";
    else return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [interrupt, setInterrupt] = useState(false);
  const [journeyScroll, setJourneyScroll] = useState(0);
  const [switchingScreens, setSwitchingScreens] = useState(false);
  const [footprints, setFootprints] = useState([]);
  const [collidedDOM, setCollidedDOM] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [position, setPosition] = useState(startPos);
  const [horizontalTranslation, setHorizontalTranslation] = useState(0);
  const [verticalTranslation, setVerticalTranslation] = useState(0);
  const [portfolioType, setPortfolioType] = useState("iconic figure");
  const [stepCounter, setStepCounter] = useState(0);

  useEffect(() => {
    setPortfolioType(
      new URL(window.location.href).searchParams.get("type") ?? "iconic figure"
    );
  }, []);

  const headerRefs = useRef(null);

  const updateCollision = (element) => {
    setCollidedDOM(element);
  };

  const restartPage = () => {
    if (currentScreen === "home") {
      setInterrupt(true);
    } else if (currentScreen === "interests") {
      moveScreenAction("left");
    } else if (currentScreen === "journey") {
      moveScreenAction("up");
    } else if (currentScreen === "about") {
      moveScreenAction("right");
    }

    setJourneyScroll(0);
    document.getElementById("journey-screen").scrollTo(0, 0);
  };

  const moveScreenAction = async (
    direction: "left" | "right" | "up" | "down",
    moveChar = true
  ) => {
    let newPosition;
    let moved = false;
    switch (direction) {
      case "left":
        newPosition = {
          x: window.innerWidth - slowThreshold - charWidth - 1,
          y: position.y,
        };
        if (currentScreen === "interests") {
          setCurrentScreen("home");
          moved = true;
        } else if (currentScreen === "home") {
          setCurrentScreen("about");
          moved = true;
        }
        break;
      case "right":
        newPosition = { x: slowThreshold + 1, y: position.y };
        if (currentScreen === "home") {
          setCurrentScreen("interests");
          moved = true;
        } else if (currentScreen === "about") {
          setCurrentScreen("home");
          moved = true;
        }
        break;
      case "up":
        newPosition = {
          x: position.x,
          y: window.innerHeight - slowThreshold - charHeight - 1,
        };
        if (currentScreen === "journey") {
          setCurrentScreen("home");
          moved = true;
        }
        break;
      case "down":
        newPosition = {
          x: position.x,
          y: slowThreshold + 1,
        };
        if (currentScreen === "home") {
          setCurrentScreen("journey");
          moved = true;
        }
        break;
    }

    if (moved) {
      setInterrupt(true);
      setSwitchingScreens(true);
      setTimeout(() => {
        translateScreen(0, 0);
        setSwitchingScreens(false);
      }, 300);
      if (moveChar) setPosition(newPosition);
      setFootprints([]);
    }
  };

  const translateScreen = (x, y) => {
    setHorizontalTranslation(x);
    setVerticalTranslation(y);
  };

  console.log(isDark);
  const GlobalStyles = createGlobalStyle`
  :root {
    ${
      isDark
        ? `--main-bg-color: #262626;
        --main-text-color: rgba(255, 255, 255, 0.9);
        --title-dash-color: #c66b2a;
        --icon-color: rgba(255, 255, 255, 0.65);
        --footstep-color: rgba(255, 255, 255, 0.1);
        --intruction-color: rgba(255, 255, 255, 0.2)`
        : `--main-bg-color: #fefefe;
    --main-text-color: rgba(0, 0, 0, 0.9);
    --title-dash-color: #c3eaff;
    --icon-color: rgba(0, 0, 0, 0.65);
    --footstep-color: rgba(0, 0, 0, 0.1);
    --intruction-color: rgba(0, 0, 0, 0.2)`
    }
  }
`;

  return (
    <div className="frame">
      <GlobalStyles />
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
        canMove={!switchingScreens}
        setJourneyScroll={setJourneyScroll}
        journeyScroll={journeyScroll}
        charWidth={charWidth}
        charHeight={charHeight}
        restartPage={restartPage}
        isDark={isDark}
        interrupt={interrupt}
        setInterrupt={setInterrupt}
        slowThreshold={slowThreshold}
        stepCounter={stepCounter}
        setStepCounter={setStepCounter}
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
              : currentScreen === "about"
              ? "right"
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
          <LightDarkToggle setIsDark={setIsDark} collidedDOM={collidedDOM} />

          <div className="bordered-frame">
            <Header
              collidedDOM={collidedDOM}
              subtitle={portfolioType.toUpperCase()}
            />
            <div className="content-container">
              <Instructions stepsTaken={stepCounter} />
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
          <div
            id="journey-screen"
            className="bordered-frame"
            style={{
              margin: "0px",
              padding: "71px",
              overflowY: "scroll",
              overflowX: "hidden",
              scrollBehavior: "smooth",
            }}
          >
            <JourneyPage
              collidedDOM={collidedDOM}
              moveScreenAction={moveScreenAction}
              type="software developer"
              footprints={footprints}
              currentScreen={currentScreen}
              scroll={journeyScroll}
            />
          </div>
        </div>
        <div className={`screen ${currentScreen === "about" ? "" : "left"}`}>
          <div className="bordered-frame"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
