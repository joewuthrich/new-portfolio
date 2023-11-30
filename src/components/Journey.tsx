import "./Interest.css";
import "./pages/JourneyPage.css";

type JourneyProps = {
  title: string;
  desc: string;
  skills: string;
  start?: string;
  end: string;
  images: string[];
  align: "left" | "right";
  collidedDOM: string;
};

const Journey = ({
  title,
  desc,
  skills,
  start,
  end,
  images,
  align,
  collidedDOM,
}: JourneyProps) => {
  return (
    <div
      id={`${title}-${end}-${align}`}
      className={`journey-full-item-container interactable ${align} ${
        collidedDOM === `${title}-${end}-${align}` ? "hover" : ""
      }`}
    >
      <text className={`journey-item-duration ${align}`}>
        {(start ? start + " - " : "") + end}
      </text>
      <div className={`journey-item-duration-space`} />
      <div className={`vertical-divider ${align}`} />
      <div className={`journey-item-container ${align}`}>
        <div className="journey-item-title">{title}</div>
        <div className="journey-item-desc">{desc}</div>
        <div className="horizontal-divider" />
        <div className="journey-item-skills">{skills}</div>
        <div className={`journey-item-image-container ${align}`}>{images}</div>
      </div>
    </div>
  );
};

export default Journey;
