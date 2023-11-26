import "./Header.css";
import Icons from "./Svg";

function Name() {
  return (
    <div className="header">
      <div className="name-container">
        <div className="background-box"></div>
        <text className="name-header">JOE WUTHRICH</text>
      </div>
      <text className="job-subtitle">ICONIC FIGURE</text>
      <text className="description">
        I'm a recent graduate, with a BSc in Computer Science and IT Management.
        I'm interested in anything from recent software solutions, to
        photography, to basketball.
      </text>
      <div className="outer-link-container">
        <div className="link-container">
          <Icons.EmailIcon />
          <text className="link-item">joerwuthrich@gmail.com</text>
        </div>
        <div className="link-container">
          <Icons.LinkedInIcon />
          <text className="link-item">/joewuthrich</text>
        </div>
      </div>
    </div>
  );
}

export default Name;
