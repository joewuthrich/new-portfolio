import "./Arrow.css";
import Icons from "./Svg";

type ArrowProps = {
  title: string;
  align: "top" | "bottom" | "left" | "right";
};

const Arrow = (props: ArrowProps) => {
  let rotation = 0;

  const alignment: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } = {};

  switch (props.align) {
    case "bottom":
      alignment.bottom = 0;
      break;
    case "top":
      rotation = 180;
      alignment.top = 0;
      break;
    case "left":
      alignment.left = 0;
      rotation = 90;
      break;
    case "right":
      alignment.right = 0;
      rotation = -90;
      break;
  }

  return (
    <div
      className="arrow-container"
      style={{
        transform: "rotate(" + rotation + "deg)",
        ...alignment,
      }}
    >
      <text className="">{props.title}</text>
      <div className="icon-container">
        <Icons.ArrowIcon />
      </div>
    </div>
  );
};

export default Arrow;
