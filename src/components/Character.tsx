import React, { useState, useEffect } from "react";

const Character = ({ moveScreenAction, setPosition, position }) => {
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

      // Determine the movement direction based on pressed keys
      if (keysPressed.ArrowUp) {
        y -= moveSpeed;
      }
      if (keysPressed.ArrowDown) {
        y += moveSpeed;
      }
      if (keysPressed.ArrowLeft) {
        x -= moveSpeed;
      }
      if (keysPressed.ArrowRight) {
        x += moveSpeed;
      }

      // Adjust the position for diagonal movement
      if (
        (keysPressed.ArrowUp || keysPressed.ArrowDown) &&
        (keysPressed.ArrowLeft || keysPressed.ArrowRight)
      ) {
        x += x > position.x ? -diagonalSpeed : diagonalSpeed;
        y += y > position.y ? -diagonalSpeed : diagonalSpeed;
      }

      // Logic to check proximity to the edge of the screen
      const nearLeftEdge = x <= edgeThreshold;
      const nearRightEdge = x + charWidth >= window.innerWidth - edgeThreshold;
      const nearTopEdge = y <= edgeThreshold;
      const nearBottomEdge =
        y + charHeight >= window.innerHeight - edgeThreshold;

      if (nearLeftEdge) {
        moveScreenAction("left", {
          x: window.innerWidth - edgeThreshold - charWidth - 1,
          y: y,
        });
        return;
      }

      if (nearRightEdge) {
        moveScreenAction("right", { x: edgeThreshold + 1, y: y });
        return;
      }

      if (nearTopEdge) y = edgeThreshold + 1;

      if (nearBottomEdge)
        y = window.innerHeight - edgeThreshold - charHeight - 1;

      setPosition({ x, y });
    };

    const interval = setInterval(handleMovement, 1000 / 60); // Adjust the interval for smooth movement

    return () => clearInterval(interval);
  }, [keysPressed, position]);

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
