import "./Header.css";
import Icons from "./Svg";
import Title from "./Title";

function Name() {
  return (
    <div className="header">
      <Title title="JOE WUTHRICH" width="1298px" size="115px" />
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
