import { useState, useEffect } from "react";
import Icons from "./Svg";

const Footprint = ({
  position,
  side,
  facing,
}: {
  position: { x: number; y: number };
  side: "left" | "right";
  facing: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
}) => {
  const [visible, setVisible] = useState(true);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // Set the visibility duration (2 seconds in this example)

    const fade = setTimeout(() => {
      setFaded(true);
    }, 1);

    return () => {
      clearTimeout(timer);
      clearTimeout(fade);
    };
  }, []);

  let rotation = 0;
  switch (facing) {
    case "N":
      rotation = 0;
      break;
    case "NE":
      rotation = 45;
      break;
    case "E":
      rotation = 90;
      break;
    case "SE":
      rotation = 135;
      break;
    case "S":
      rotation = 180;
      break;
    case "SW":
      rotation = 225;
      break;
    case "W":
      rotation = 270;
      break;
    case "NW":
      rotation = 315;
      break;
  }

  return visible ? (
    <div
      className="footprint"
      style={{
        position: "absolute",
        left: `${position.x}px`, // Adjust positioning as needed
        top: `${position.y}px`, // Adjust positioning as needed
        transform: `rotate(${rotation}deg) translateX(${
          side === "left" ? "-5px" : "5px"
        })`,
        opacity: faded ? "0" : "1",
        transition: "opacity 2s ease",
      }}
    >
      {side === "left" ? <Icons.LeftShoeOutline /> : <Icons.RightShoeOutline />}
    </div>
  ) : null;
};

export default Footprint;
