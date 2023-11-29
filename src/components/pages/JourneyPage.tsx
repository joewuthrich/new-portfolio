import "../Interest.css";
import "./JourneyPage.css";
import Arrow from "../Arrow";
import Title from "../Title";
import Icons from "../Svg";

const JourneyPage = ({ collidedDOM, moveScreenAction, type }) => {
  const journeyData: {
    title: string;
    desc: string;
    skills: string;
    images: string[];
    start: string;
    end: string;
  }[] = require(`../../journeys/journey-${type.replace(" ", "-")}.json`);

  const leftJourneys = [];
  for (let idx = 0; idx < journeyData.length; idx += 2) {
    const journey: {
      title: string;
      desc: string;
      skills: string;
      images: string[];
      start: string;
      end: string;
    } = journeyData[idx];

    const images = [];
    for (const srcIdx in journey.images) {
      const src = journey.images[srcIdx];
      images.push(
        <img
          id={src}
          className={`interest-image interactable ${
            collidedDOM === src ? "hover" : ""
          }`}
          src={process.env.PUBLIC_URL + src}
          alt=""
          width="150"
          height="150"
        />
      );
    }

    leftJourneys.push(
      <div className="journey-full-item-container left">
        <text className="journey-item-duration left">
          {journey.start + " - " + journey.end}
        </text>
        <div className="journey-item-duration-space" />
        <div className="vertical-divider left" />
        <div className="journey-item-container left">
          <div className="journey-item-title">{journey.title}</div>
          <div className="journey-item-desc">{journey.desc}</div>
          <div className="horizontal-divider" />
          <div className="journey-item-skills">{journey.skills}</div>
          <div className="journey-item-image-container left">{images}</div>
        </div>
      </div>
    );
  }

  const rightJourneys = [];
  for (let idx = 1; idx < journeyData.length; idx += 2) {
    const journey: {
      title: string;
      desc: string;
      skills: string;
      images: string[];
      start: string;
      end: string;
    } = journeyData[idx];

    const images = [];
    for (const srcIdx in journey.images) {
      const src = journey.images[srcIdx];
      images.push(
        <img
          id={src}
          className={`interest-image interactable ${
            collidedDOM === src ? "hover" : ""
          }`}
          src={process.env.PUBLIC_URL + src}
          alt=""
          width="150"
          height="150"
        />
      );
    }

    rightJourneys.push(
      <div className="journey-full-item-container right">
        <text className="journey-item-duration right">
          {journey.start + " - " + journey.end}
        </text>
        <div className="journey-item-duration-space" />
        <div className="vertical-divider right" />
        <div className="journey-item-container right">
          <div className="journey-item-title">{journey.title}</div>
          <div className="journey-item-desc">{journey.desc}</div>
          <div className="horizontal-divider" />
          <div className="journey-item-skills">{journey.skills}</div>
          <div className="journey-item-image-container right">{images}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <Arrow
        title={"Back to Main"}
        align={"top"}
        onClick={() => moveScreenAction("up")}
        collidedDOM={collidedDOM}
      />
      <div className="full-journey-container">
        <div className="column-journey-container left">{leftJourneys}</div>
        <div className="center-divider">
          <Icons.RightShoeOutline />
          <Icons.LeftShoeOutline />
        </div>
        <div className="column-journey-container right">{rightJourneys}</div>
      </div>
    </div>
  );
};

export default JourneyPage;
