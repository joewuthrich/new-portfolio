import React, { useState, useEffect, useRef, useImperativeHandle } from "react";

const Character = ({
  moveScreenAction,
  setPosition,
  position,
  translateScreen,
  screenInfo,
  reactiveElements,
  updateCollision,
  collidedDOM,
}) => {
  const [keysPressed, setKeysPressed] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Control: false,
    Enter: false,
  });

  const [facing, setFacing] = useState("S");
  const [canMove, setCanMove] = useState(true);

  const baseMoveSpeed = 10; // Adjust the base speed as needed
  const sprintMultiplier = 3; // Adjust the sprint multiplier

  const charWidth = 69;
  const charHeight = 132;

  const edgeThreshold = 40;
  const slowThreshold = 120;

  const spriteRef = useRef(null);

  const handleKeyDown = ({ key }) => {
    console.log(keysPressed);
    setKeysPressed((prevState) => ({
      ...prevState,
      [key]: true,
    }));
  };

  const handleKeyUp = ({ key }) => {
    setKeysPressed((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };

  useEffect(() => {
    if (keysPressed.Enter) {
      if (collidedDOM != null) document.getElementById(collidedDOM)?.click();
      handleKeyUp({ key: "Enter" });
    }
  }, [keysPressed]);

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

      spriteRef.current.innerHTML =
        facing +
        (!keysPressed.ArrowUp &&
        !keysPressed.ArrowDown &&
        !keysPressed.ArrowLeft &&
        !keysPressed.ArrowRight
          ? ""
          : "(M)");

      setFacing(facing);
    };

    const handleMovement = () => {
      let x = position.x;
      let y = position.y;

      // Calculate the actual move speed considering sprint
      const moveSpeed = keysPressed.Control
        ? baseMoveSpeed * sprintMultiplier
        : baseMoveSpeed;

      // Calculate the speed for diagonal movement
      const diagonalSpeed = moveSpeed / 2.8;

      // Logic to check proximity to the edge of the screen
      const nearLeftEdge = x <= slowThreshold && screenInfo.exits[3];
      const nearRightEdge =
        x + charWidth >= window.innerWidth - slowThreshold &&
        screenInfo.exits[1];
      const nearTopEdge = y <= slowThreshold && screenInfo.exits[0];
      const nearBottomEdge =
        y + charHeight >= window.innerHeight - slowThreshold &&
        screenInfo.exits[2];
      let finalMoveSpeed = moveSpeed;
      let finalDiagonalSpeed = diagonalSpeed;
      if (nearLeftEdge || nearRightEdge || nearTopEdge || nearBottomEdge) {
        const maxDist = Math.max(window.innerWidth, window.innerHeight);

        const minDistance = Math.min(
          nearLeftEdge ? x : maxDist,
          nearRightEdge ? window.innerWidth - (x + charWidth) : maxDist,
          nearTopEdge ? y : maxDist,
          nearBottomEdge ? window.innerHeight - (y + charHeight) : maxDist
        );

        const translateX =
          (nearRightEdge ? -1.01 : 1.01) ^
          ((nearLeftEdge ? slowThreshold - x : 0) +
            (nearRightEdge
              ? slowThreshold - (window.innerWidth - (x + charWidth))
              : 0));

        const translateY =
          (nearTopEdge ? 1.01 : 1.01) ^
          ((nearTopEdge ? slowThreshold - y : 0) +
            (nearBottomEdge
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
      } else translateScreen(0, 0);

      // @ts-ignore
      let newFacing: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW" = facing;

      const movingUp = keysPressed.ArrowUp && !keysPressed.ArrowDown;
      const movingDown = keysPressed.ArrowDown && !keysPressed.ArrowUp;
      const movingLeft = keysPressed.ArrowLeft && !keysPressed.ArrowRight;
      const movingRight = keysPressed.ArrowRight && !keysPressed.ArrowLeft;

      // Determine the movement direction based on pressed keys
      if (movingUp) {
        y -= finalMoveSpeed;
        newFacing = "N";
      }
      if (movingDown) {
        y += finalMoveSpeed;
        newFacing = "S";
      }
      if (movingLeft) {
        x -= finalMoveSpeed;
        newFacing = "W";
      }
      if (movingRight) {
        x += finalMoveSpeed;
        newFacing = "E";
      }

      // Adjust the position for diagonal movement
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
              y: y + charHeight / 2,
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
        closestElement !== collidedDOM
      ) {
        console.log(
          closestElement?.id === undefined ? null : closestElement.id
        );
        updateCollision(
          closestElement?.id === undefined ? null : closestElement.id
        );
      }

      if (!canMove) return;

      // TODO: Modify this so that the sprite can't be moved while the screens are transitioning
      modifySprite(newFacing);

      // Logic for translating between screens
      if (atLeftEdge) {
        moveScreenAction("left", {
          x: window.innerWidth - slowThreshold - charWidth - 1,
          y: y,
        });
        return;
      }

      if (atRightEdge) {
        moveScreenAction("right", { x: slowThreshold + 1, y: y });
        return;
      }

      if (atTopEdge) {
        moveScreenAction("up", {
          x: x,
          y: window.innerHeight - slowThreshold - charHeight - 1,
        });
        return;
      }

      if (atBottomEdge) {
        moveScreenAction("down", {
          x: x,
          y: slowThreshold + 1,
        });
        return;
      }

      setPosition({ x, y });
    };

    const interval = setInterval(handleMovement, 1000 / 60); // Adjust the interval for smooth movement

    return () => clearInterval(interval);
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
  ]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Logic to check if the character moves off-screen and trigger screen transition

  return (
    <div
      className="character"
      ref={spriteRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: "#C66B2A",
        width: `${charWidth}px`,
        height: `${charHeight}px`,
        transition: "left 0.2s ease-out, top 0.2s ease-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Your character's visual representation */}
    </div>
  );
};

export default Character;
