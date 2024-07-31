import { useState, useEffect, useRef } from "react";

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
  interrupt,
  setInterrupt,
  slowThreshold,
  stepCounter,
  setStepCounter,
  popup,
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

  const [facing, setFacing] = useState("S");

  const baseMoveSpeed = 10; // Adjust the base speed as needed
  const sprintMultiplier = 3; // Adjust the sprint multiplier

  const edgeThreshold = 40;

  const journeyScrollThreshold = window.innerHeight / 3;

  const spriteRef = useRef(null);

  const visible = window.innerWidth > 1100 && window.innerHeight > 700;

  const clickRef = useRef(null);
  const positionRef = useRef(position);
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    const sprites = [
      "E-0",
      "E-1",
      "E-2",
      "N-0",
      "N-1",
      "N-2",
      "W-0",
      "W-1",
      "W-2",
      "S-0",
      "S-1",
      "S-2",
      "E-0-Dark",
      "E-1-Dark",
      "E-2-Dark",
      "N-0-Dark",
      "N-1-Dark",
      "N-2-Dark",
      "W-0-Dark",
      "W-1-Dark",
      "W-2-Dark",
      "S-0-Dark",
      "S-1-Dark",
      "S-2-Dark",
    ];

    sprites.forEach((image) => {
      new Image().src = `${process.env.PUBLIC_URL}/images/character/${image}.png`;
    });
  }, []);

  const clearCurrentClick = () => {
    if (clickRef.current !== undefined) {
      clearInterval(clickRef.current);
      clickRef.current = undefined;
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
    }
  };

  useEffect(() => {
    if (interrupt) {
      clearCurrentClick();
      setInterrupt(false);
    }
  }, [interrupt, setInterrupt]);

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
      if (!visible || popup !== "") return;

      if (event.clientX === 0 && event.clientY === 0) return;

      // TODO: Fix character continue walking when switching screens
      // TODO: Fix character trying to walk into impossible area
      // TODO: Fix character walking scrolling the entire way down the screen

      if (event.target.classList.contains("prevent-click-move")) return;

      const clickX =
        event.clientX || (event.touches ? event.touches[0].clientX : 0);
      const clickY =
        event.clientY || (event.touches ? event.touches[0].clientX : 0);

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

      clearCurrentClick();

      // Initiate the movement animation
      startMovementAnimation(targetX, targetY);
    };

    const startMovementAnimation = (targetX, targetY) => {
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
            clearInterval(clickRef.current);
            clickRef.current = undefined;
          } else {
            setKeysPressed({
              arrowup: targetY - currentPos.y <= -11,
              arrowdown: targetY - currentPos.y > 11,
              arrowleft: targetX - currentPos.x <= -11,
              arrowright: targetX - currentPos.x > 11,
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
      // TODO: Figure out what to do with this
      if (!visible || popup !== "") return;
      // event.preventDefault();
      clearCurrentClick();
      // const deltaY = event.deltaY;
      // move(deltaY <= 0, deltaY > 0, false, false, true, true);
    };

    const createFootPrint = () => {
      const sprinting = keysPressed.control || keysPressed.shift;

      setStepCounter((count) => count + 1);
      if (stepCounter % (sprinting ? 2 : 6) === 0) {
        const offsetX =
          screenInfo.name === "journey" ? -charWidth / 2 : charWidth / 2;
        const offsetY =
          screenInfo.name === "journey"
            ? document.getElementById("journey-screen").scrollTop
            : charHeight - 15;

        setFootprints((prevFootprints) => [
          ...prevFootprints.slice(-10),
          {
            key: stepCounter,
            x: position.x + offsetX,
            y: position.y + offsetY,
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
        if (journeyScreenDOM.scrollTop > 10) {
          setJourneyScroll(journeyScreenDOM.scrollTop);
          // !! SMOOTH DOESN'T WORK ON A LOT OF BROWERS
          journeyScreenDOM.scrollBy(0, -moveSpeed * (scroll ? 2.4 : 1.7));
          movingUp = false;
          handled = true;

          if (!movingLeft && !movingRight && !movingDown) createFootPrint();
        } else {
          journeyScreenDOM.scrollBy(
            0,
            Math.min(-journeyScreenDOM.scrollTop, 0)
          );
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
          journeyScreenDOM.scrollHeight - journeyScreenDOM.clientHeight - 10
        ) {
          // !! SMOOTH DOESN'T WORK ON A LOT OF BROWERS
          journeyScreenDOM.scrollBy(0, moveSpeed * (scroll ? 2.4 : 1.7));
          movingDown = false;
          handled = true;

          if (!movingLeft && !movingRight && !movingUp) createFootPrint();
          // return;
        } else {
          // TODO: FIX THIS
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
      const atBottomEdge =
        y + charHeight >=
        window.innerHeight -
          (screenInfo.name === "journey" ? edgeThreshold + 50 : edgeThreshold);

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
    slowThreshold,
    setStepCounter,
    visible,
    popup,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!visible || popup !== "") return;

      event.preventDefault();
      clearCurrentClick();
      setKeysPressed((prevState) => ({
        ...prevState,
        [event.key.toLowerCase()]: true,
      }));
    };

    const handleKeyUp = ({ key }) => {
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
  }, [keysPressed, collidedDOM, restartPage, visible, popup]);

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
        width: `${charWidth}px`,
        height: `${charHeight}px`,
        transition: canMove ? "" : "left 0.5s ease, top 0.5s ease",
        imageRendering: "crisp-edges",
        display: visible ? "flex" : "none",
        objectFit: "fill",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    />
  );
};

export default Character;
