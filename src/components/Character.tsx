import { useState, useEffect, useRef } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const Character = ({
  moveScreenAction,
  setPosition,
  position,
  translateScreen,
  screenInfo,
  reactiveElements,
  updateCollision,
  collidedDOM,
  setFootprints,
  canMove,
  setJourneyScroll,
  journeyScroll,
  charWidth,
  charHeight,
  restartPage,
  isDark,
}) => {
  const [keysPressed, setKeysPressed] = useState({
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
    control: false,
    shift: false,
    enter: false,
    " ": false,
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const [allowInput, setAllowInput] = useState(true);
  const [facing, setFacing] = useState("S");
  const [stepCounter, setStepCounter] = useState(0);

  const baseMoveSpeed = 10; // Adjust the base speed as needed
  const sprintMultiplier = 3; // Adjust the sprint multiplier

  const edgeThreshold = 40;
  const slowThreshold = 120;

  const journeyScrollThreshold = window.innerHeight / 3;

  const spriteRef = useRef(null);

  const clickRef = useRef(null);
  const positionRef = useRef(position);
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    const modifySprite = (
      facing: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
    ) => {
      switch (facing) {
        case "N":
          break;
        case "NE":
          break;
        case "E":
          break;
        case "SE":
          break;
        case "S":
          break;
        case "SW":
          break;
        case "W":
          break;
        case "NW":
          break;
      }

      setFacing(facing);
    };

    const handleScreenClick = (event) => {
      // TODO: Fix character continue walking when switching screens
      // TODO: Fix character trying to walk into impossible area
      // TODO: Fix character walking scrolling the entire way down the screen

      // if (!allowInput) return;

      if (event.target.classList.contains("prevent-click-move")) return;

      const clickX = event.clientX || event.touches[0].clientX;
      const clickY = event.clientY || event.touches[0].clientY;

      // Calculate the target position
      const targetX = clickX - charWidth / 2;
      const targetY = clickY - charHeight / 2;

      const atLeftEdge = targetX <= edgeThreshold;
      const atRightEdge =
        targetX + charWidth >= window.innerWidth - edgeThreshold;
      const atTopEdge = targetY <= edgeThreshold;
      const atBottomEdge =
        targetY + charHeight >= window.innerHeight - edgeThreshold;

      if (atLeftEdge || atRightEdge || atTopEdge || atBottomEdge) return;

      if (clickRef.current !== undefined) {
        clearInterval(clickRef.current);
        clickRef.current = undefined;
      }

      // Initiate the movement animation
      startMovementAnimation(targetX, targetY);
    };

    const startMovementAnimation = (targetX, targetY) => {
      console.log(targetX + " " + targetY);
      console.log(targetX - position.x + " " + (targetY - position.y));

      setAllowInput(false);

      clickRef.current =
        !clickRef.current &&
        setInterval(() => {
          const currentPos = positionRef.current;

          if (
            Math.abs(targetY - currentPos.y) < 10 &&
            Math.abs(targetX - currentPos.x) < 10
          ) {
            setPosition({ x: targetX, y: targetY });
            setKeysPressed({
              arrowup: false,
              arrowdown: false,
              arrowleft: false,
              arrowright: false,
              control: false,
              shift: false,
              enter: false,
              " ": false,
              w: false,
              a: false,
              s: false,
              d: false,
            });
            setAllowInput(true);
            clearInterval(clickRef.current);
            clickRef.current = undefined;
          } else {
            setKeysPressed({
              arrowup: targetY - currentPos.y <= -8,
              arrowdown: targetY - currentPos.y > 8,
              arrowleft: targetX - currentPos.x <= -8,
              arrowright: targetX - currentPos.x > 8,
              control: false,
              shift: false,
              enter: false,
              " ": false,
              w: false,
              a: false,
              s: false,
              d: false,
            });
          }
        }, 1000 / 20);
    };

    const handleMovement = () => {
      const movingUp =
        (keysPressed.arrowup || keysPressed.w) &&
        !(keysPressed.arrowdown || keysPressed.s);
      const movingDown =
        (keysPressed.arrowdown || keysPressed.s) &&
        !(keysPressed.arrowup || keysPressed.w);
      const movingLeft =
        (keysPressed.arrowleft || keysPressed.a) &&
        !(keysPressed.arrowright || keysPressed.d);
      const movingRight =
        (keysPressed.arrowright || keysPressed.d) &&
        !(keysPressed.arrowleft || keysPressed.a);

      move(
        movingUp,
        movingDown,
        movingLeft,
        movingRight,
        keysPressed.control || keysPressed.shift
      );
    };

    const handleWheel = (event) => {
      event.preventDefault();
      if (!allowInput) return;
      const deltaY = event.deltaY;
      move(deltaY <= 0, deltaY > 0, false, false, true, true);
    };

    const createFootPrint = () => {
      const sprinting = keysPressed.control || keysPressed.shift;

      setStepCounter(stepCounter + 1);
      if (stepCounter % (sprinting ? 2 : 6) === 0) {
        setFootprints((prevFootprints) => [
          ...prevFootprints.slice(-10),
          {
            key: stepCounter,
            x: position.x + charWidth / 2,
            y:
              position.y +
              charHeight -
              15 +
              (screenInfo.name === "journey"
                ? document.getElementById("journey-screen").scrollTop
                : 0),
            side: stepCounter % (sprinting ? 4 : 12) === 0 ? "left" : "right",
            facing: facing,
          },
        ]);
      }
    };

    const move = (
      movingUp,
      movingDown,
      movingLeft,
      movingRight,
      sprinting,
      scroll = false
    ) => {
      let x = position.x;
      let y = position.y;

      // Calculate the actual move speed considering sprint
      const moveSpeed = sprinting
        ? baseMoveSpeed * sprintMultiplier
        : baseMoveSpeed;

      // Calculate the speed for diagonal movement
      const diagonalSpeed = moveSpeed / 2.8;

      // Logic to check proximity to the edge of the screen
      const nearLeftEdge = x <= slowThreshold;
      const nearRightEdge = x + charWidth >= window.innerWidth - slowThreshold;
      const nearTopEdge = y <= slowThreshold;
      const nearBottomEdge =
        y + charHeight >= window.innerHeight - slowThreshold;

      const nearLeftValid = nearLeftEdge && screenInfo.exits[3];
      const nearRightValid = nearRightEdge && screenInfo.exits[1];
      const nearTopValid = nearTopEdge && screenInfo.exits[0];
      const nearBottomValid = nearBottomEdge && screenInfo.exits[2];

      let finalMoveSpeed = moveSpeed;
      let finalDiagonalSpeed = diagonalSpeed;

      let handled = false;

      let journeyScreenDOM = document.getElementById("journey-screen");

      // @ts-ignore
      let newFacing: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW" = facing;

      // Determine the movement direction based on pressed keys
      if (movingUp) newFacing = "N";
      if (movingDown) newFacing = "S";
      if (movingLeft) newFacing = "W";
      if (movingRight) newFacing = "E";

      if ((movingUp || movingDown) && (movingLeft || movingRight)) {
        if (movingUp && movingLeft) {
          newFacing = "NW";
        } else if (movingUp && movingRight) {
          newFacing = "NE";
        } else if (movingDown && movingLeft) {
          newFacing = "SW";
        } else if (movingDown && movingRight) {
          newFacing = "SE";
        }
      }

      // !! DOM MANUPULATION BAD?
      if (
        y <= journeyScrollThreshold &&
        screenInfo.name === "journey" &&
        movingUp &&
        journeyScreenDOM.scrollTop !== 0
      ) {
        if (journeyScreenDOM.scrollTop > 70) {
          setJourneyScroll(journeyScreenDOM.scrollTop);
          journeyScreenDOM.scrollBy(0, -moveSpeed * (scroll ? 14 : 8));
          movingUp = false;
          handled = true;

          if (!movingLeft && !movingRight && !movingDown) createFootPrint();
        } else {
          setJourneyScroll(0);
          journeyScreenDOM.scrollTo(0, 0);
        }
      }

      if (
        y + charHeight >= window.innerHeight - journeyScrollThreshold &&
        screenInfo.name === "journey" &&
        movingDown &&
        journeyScreenDOM.scrollTop !==
          journeyScreenDOM.scrollHeight - journeyScreenDOM.clientHeight
      ) {
        if (
          journeyScreenDOM.scrollTop <
          journeyScreenDOM.scrollHeight - journeyScreenDOM.clientHeight - 70
        ) {
          setJourneyScroll(journeyScreenDOM.scrollTop + 71);
          journeyScreenDOM.scrollBy(0, moveSpeed * (scroll ? 14 : 8));
          movingDown = false;
          handled = true;

          if (!movingLeft && !movingRight && !movingUp) createFootPrint();
          // return;
        } else {
          setJourneyScroll(
            journeyScreenDOM.scrollHeight - journeyScreenDOM.clientHeight
          );
          journeyScreenDOM.scrollTo(
            0,
            journeyScreenDOM.scrollHeight - journeyScreenDOM.clientHeight
          );
        }
      }

      if (
        (nearLeftValid || nearRightValid || nearTopValid || nearBottomValid) &&
        !handled
      ) {
        const maxDist = Math.max(window.innerWidth, window.innerHeight);

        const minDistance = Math.min(
          nearLeftValid ? x : maxDist,
          nearRightValid ? window.innerWidth - (x + charWidth) : maxDist,
          nearTopValid ? y : maxDist,
          nearBottomValid ? window.innerHeight - (y + charHeight) : maxDist
        );

        const translateX =
          (nearRightValid ? -1.01 : 1.01) ^
          ((nearLeftValid ? slowThreshold - x : 0) +
            (nearRightValid
              ? slowThreshold - (window.innerWidth - (x + charWidth))
              : 0));

        const translateY =
          (nearTopValid ? 1.01 : 1.01) ^
          ((nearTopValid ? slowThreshold - y : 0) +
            (nearBottomValid
              ? -(slowThreshold - (window.innerHeight - (y + charHeight)))
              : 0));

        translateScreen(
          translateX !== 1 ? translateX : 0,
          translateY !== 1 ? translateY : 0
        );

        if (minDistance > 0) {
          finalMoveSpeed *= minDistance / slowThreshold / 2;
          finalDiagonalSpeed *= minDistance / slowThreshold / 2;
        }
      } else if (!handled) translateScreen(0, 0);

      // Determine the movement direction based on pressed keys
      if (movingUp) {
        y -= finalMoveSpeed;
      }
      if (movingDown) {
        y += finalMoveSpeed;
      }
      if (movingLeft) {
        x -= finalMoveSpeed;
      }
      if (movingRight) {
        x += finalMoveSpeed;
      }

      // Adjust the position for diagonal movement
      // TODO: Adjust diagonal speed when scrolling
      if ((movingUp || movingDown) && (movingLeft || movingRight)) {
        x += x > position.x ? -finalDiagonalSpeed : finalDiagonalSpeed;
        y += y > position.y ? -finalDiagonalSpeed : finalDiagonalSpeed;
      }

      // Logic to check proximity to the edge of the screen
      const atLeftEdge = x <= edgeThreshold;
      const atRightEdge = x + charWidth >= window.innerWidth - edgeThreshold;
      const atTopEdge = y <= edgeThreshold;
      const atBottomEdge = y + charHeight >= window.innerHeight - edgeThreshold;

      let closestElement = null;
      let closestDistance = Infinity;

      // Iterate through reactiveElements to check for collisions
      Array.from(document.getElementsByClassName("interactable")).forEach(
        (current) => {
          if (current !== undefined) {
            const elementRect = current.getBoundingClientRect(); // Get bounding rectangle of the element
            // Calculate center of the character and the element
            const characterCenter = {
              x: x + charWidth / 2,
              y:
                y +
                charHeight / 2 +
                (screenInfo.name === "journey"
                  ? document.getElementById("journey-screen").scrollTop
                  : 0),
            };
            const elementCenter = {
              x: elementRect.left + elementRect.width / 2,
              y: elementRect.top + elementRect.height / 2,
            };

            // Calculate the distance between the character and the element's center
            const distance = Math.sqrt(
              (characterCenter.x - elementCenter.x) ** 2 +
                (characterCenter.y - elementCenter.y) ** 2
            );

            // Check for collision between character and element
            if (
              x < elementRect.right &&
              x + charWidth > elementRect.x &&
              y < elementRect.bottom &&
              y + charHeight > elementRect.y
            ) {
              // Collision detected

              // Check if it's the closest collision
              if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = current;
              }
            }
          }
        }
      );

      if (
        (closestElement == null && collidedDOM != null) ||
        (closestElement != null && collidedDOM == null) ||
        (closestElement != null &&
          collidedDOM != null &&
          closestElement.id !== collidedDOM.id)
      ) {
        updateCollision(
          closestElement?.id === undefined ? null : closestElement.id
        );
      }

      if (!canMove) return;

      if (x !== position.x || y !== position.y) createFootPrint();

      modifySprite(newFacing);

      // Logic for translating between screens
      if (atLeftEdge) {
        moveScreenAction("left");
        return;
      }

      if (atRightEdge) {
        moveScreenAction("right");
        return;
      }

      if (atTopEdge) {
        moveScreenAction("up");
        return;
      }

      if (atBottomEdge) {
        moveScreenAction("down");
        return;
      }

      setPosition({ x, y });
    };

    const interval = setInterval(handleMovement, 1000 / 60);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("click", handleScreenClick);
    window.addEventListener("touchstart", handleScreenClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("click", handleScreenClick);
      window.removeEventListener("touchstart", handleScreenClick);
    };
  }, [
    keysPressed,
    position,
    moveScreenAction,
    setPosition,
    translateScreen,
    facing,
    screenInfo,
    canMove,
    reactiveElements,
    collidedDOM,
    updateCollision,
    stepCounter,
    setFootprints,
    journeyScroll,
    setJourneyScroll,
    journeyScrollThreshold,
    charHeight,
    charWidth,
    allowInput,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (!allowInput) return;
      setKeysPressed((prevState) => ({
        ...prevState,
        [event.key.toLowerCase()]: true,
      }));
    };

    const handleKeyUp = ({ key }) => {
      if (!allowInput) return;
      setKeysPressed((prevState) => ({
        ...prevState,
        [key.toLowerCase()]: false,
      }));
    };

    if (keysPressed.enter) {
      if (collidedDOM != null) document.getElementById(collidedDOM)?.click();
      handleKeyUp({ key: "enter" });
    } else if (keysPressed[" "]) {
      restartPage();
      handleKeyUp({ key: "Space" });
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed, allowInput, collidedDOM, restartPage]);

  const getSpriteURL = () => {
    const mainFace = facing.split("")[0];

    const image =
      mainFace +
      "-" +
      (Math.round(stepCounter / 5) % 4 === 2
        ? 0
        : Math.round(stepCounter / 5) % 4 === 3
        ? 2
        : Math.round(stepCounter / 5) % 4) +
      (isDark ? "-Dark" : "");

    return `${process.env.PUBLIC_URL}/images/character/${image}.png`;
  };

  return (
    <div
      id={"character"}
      className="character"
      ref={spriteRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: `url(${getSpriteURL()}) no-repeat`,
        // backgroundSize: ``,
        width: `${charWidth}px`,
        height: `${charHeight}px`,
        transition: canMove ? "" : "left 0.5s ease, top 0.5s ease",
        imageRendering: "crisp-edges",
        display: "flex",
        objectFit: "fill",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
      }}
    />
  );
};

export default Character;
