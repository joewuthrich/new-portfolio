import React, { useState, useEffect } from "react";

const Character = ({
  moveScreenAction,
  setPosition,
  position,
  translateScreen,
}) => {
  const [keysPressed, setKeysPressed] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Control: false,
  });

  const baseMoveSpeed = 10; // Adjust the base speed as needed
  const sprintMultiplier = 3; // Adjust the sprint multiplier

  const charWidth = 69;
  const charHeight = 132;

  const edgeThreshold = 40;
  const slowThreshold = 120;

  const handleKeyDown = (event) => {
    setKeysPressed((prevState) => ({
      ...prevState,
      [event.key]: true,
    }));
  };

  const handleKeyUp = (event) => {
    setKeysPressed((prevState) => ({
      ...prevState,
      [event.key]: false,
    }));
  };

  useEffect(() => {
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
      const nearLeftEdge = x <= slowThreshold;
      const nearRightEdge = x + charWidth >= window.innerWidth - slowThreshold;
      const nearTopEdge = y <= slowThreshold;
      const nearBottomEdge =
        y + charHeight >= window.innerHeight - slowThreshold;

      let finalMoveSpeed = moveSpeed;
      let finalDiagonalSpeed = diagonalSpeed;
      // TODO: Only do this if they can actually move across the edge
      if (nearLeftEdge || nearRightEdge || nearTopEdge || nearBottomEdge) {
        const maxDist = Math.max(window.innerWidth, window.innerHeight);

        const minDistance = Math.min(
          nearLeftEdge ? x : maxDist,
          nearRightEdge ? window.innerWidth - (x + charWidth) : maxDist,
          nearTopEdge ? y : maxDist,
          nearBottomEdge ? window.innerHeight - (y + charHeight) : maxDist
        );

        translateScreen(
          (nearRightEdge ? -1.01 : 1.01) ^
            ((nearLeftEdge ? slowThreshold - x : 0) +
              (nearRightEdge
                ? slowThreshold - (window.innerWidth - (x + charWidth))
                : 0)),
          (nearTopEdge ? 1.01 : 1.01) ^
            ((nearTopEdge ? slowThreshold - y : 0) +
              (nearBottomEdge
                ? -(slowThreshold - (window.innerHeight - (y + charHeight)))
                : 0))
        );

        if (minDistance > 0) {
          finalMoveSpeed *= minDistance / slowThreshold / 2;
          finalDiagonalSpeed *= minDistance / slowThreshold / 2;
        }
      } else translateScreen(0, 0);

      // Determine the movement direction based on pressed keys
      if (keysPressed.ArrowUp) {
        y -= finalMoveSpeed;
      }
      if (keysPressed.ArrowDown) {
        y += finalMoveSpeed;
      }
      if (keysPressed.ArrowLeft) {
        x -= finalMoveSpeed;
      }
      if (keysPressed.ArrowRight) {
        x += finalMoveSpeed;
      }

      // Adjust the position for diagonal movement
      if (
        (keysPressed.ArrowUp || keysPressed.ArrowDown) &&
        (keysPressed.ArrowLeft || keysPressed.ArrowRight)
      ) {
        x += x > position.x ? -finalDiagonalSpeed : finalDiagonalSpeed;
        y += y > position.y ? -finalDiagonalSpeed : finalDiagonalSpeed;
      }

      // Logic to check proximity to the edge of the screen
      const atLeftEdge = x <= edgeThreshold;
      const atRightEdge = x + charWidth >= window.innerWidth - edgeThreshold;
      const atTopEdge = y <= edgeThreshold;
      const atBottomEdge = y + charHeight >= window.innerHeight - edgeThreshold;

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

      if (atTopEdge) y = slowThreshold + 1;

      if (atBottomEdge) y = window.innerHeight - slowThreshold - charHeight - 1;

      setPosition({ x, y });
    };

    const interval = setInterval(handleMovement, 1000 / 60); // Adjust the interval for smooth movement

    return () => clearInterval(interval);
  }, [keysPressed, position, moveScreenAction, setPosition, translateScreen]);

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
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: "#C66B2A",
        width: `${charWidth}px`,
        height: `${charHeight}px`,
        transition: "left 0.2s ease, top 0.2s ease",
      }}
    >
      {/* Your character's visual representation */}
    </div>
  );
};

export default Character;
