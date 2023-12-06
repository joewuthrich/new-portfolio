import Icons from "./Svg";
import "../App.css";

const Instructions = ({ stepsTaken }) => {
  // TODO: Change instructions for mobile
  return (
    <div
      className="instruction-container"
      // style={{ opacity: Math.max(1 - stepsTaken / 100, 0) }}
    >
      <div className="instruction-side"></div>
      <div className="instruction-side"></div>

      <div className="instruction-line" style={{ alignItems: "flex-end" }}>
        <div className="instruction-side left">
          <text className="instruction-text">use</text>
          <Icons.ArrowKeys />
        </div>
        <div className="instruction-side right">
          <text className="instruction-text">to move</text>
        </div>
      </div>
      <div className="instruction-line">
        <div className="instruction-side left">
          <Icons.CtrlKey />
        </div>
        <div className="instruction-side right">
          <text className="instruction-text">to sprint</text>
        </div>
      </div>
      <div className="instruction-line">
        <div className="instruction-side left">
          <Icons.EnterKey />
        </div>
        <div className="instruction-side right">
          <text className="instruction-text">to interact</text>
        </div>
      </div>
      <div className="instruction-line">
        <div className="instruction-side left">
          <Icons.SpaceKey />
        </div>
        <div className="instruction-side right">
          <text className="instruction-text">to return here</text>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
