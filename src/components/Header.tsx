import "./Header.css";
import Icons from "./Svg";
import Title from "./Title";

type HeaderProps = {
  collidedDOM: string | null;
};

const Name = (props: HeaderProps) => {
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
        <a
          id={"emailLink"}
          className={`link-container interactable ${
            props.collidedDOM === "emailLink" ? "hover" : ""
          }`}
          href="mailto:joerwuthrich@gmail.com?body=Hi Joe,%0D%0A%0D%0A%0D%0A"
        >
          <Icons.EmailIcon />
          <text className="link-item">joerwuthrich@gmail.com</text>
        </a>
        <a
          id={"linkedInLink"}
          className={`link-container interactable ${
            props.collidedDOM === "linkedInLink" ? "hover" : ""
          }`}
          href="https://www.linkedin.com/in/joewuthrich/"
        >
          <Icons.LinkedInIcon />
          <text className="link-item">/joewuthrich</text>
        </a>
      </div>
    </div>
  );
};

export default Name;
