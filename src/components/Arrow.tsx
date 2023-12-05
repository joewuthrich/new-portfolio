import "./Arrow.css";
import Icons from "./Svg";

type ArrowProps = {
  title: string;
  align: "top" | "bottom" | "left" | "right";
  onClick: () => void;
  collidedDOM: string;
};

const Arrow = (props: ArrowProps) => {
  return (
    <div
      id={props.title + props.align}
      className={`arrow-container interactable ${props.align} ${
        props.collidedDOM === props.title + props.align ? "hover" : ""
      }`}
      onClick={props.onClick}
    >
      <text className="">{props.title}</text>
      <div className="icon-container">
        <Icons.ArrowIcon />
      </div>
      <div
        className={`clickable-area prevent-click-move ${
          props.align === "top" || props.align === "bottom"
            ? "horizontal"
            : "vertical"
        }`}
      ></div>
    </div>
  );
};

export default Arrow;
