import "../Interest.css";
import "./JourneyPage.css";
import Arrow from "../Arrow";
import Title from "../Title";
import Icons from "../Svg";
import Journey from "../Journey";

const JourneyPage = ({ collidedDOM, moveScreenAction, type }) => {
  const journeyData: {
    title: string;
    desc: string;
    skills: string;
    images: string[];
    start?: string;
    end: string;
  }[] = require(`../../journeys/journey-${type.replace(" ", "-")}.json`);

  const getImages = (imageSrcs) => {
    const images = [];
    for (const srcIdx in imageSrcs) {
      const src = "/images/" + imageSrcs[srcIdx];
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
    return images;
  };

  const leftJourneys = [];
  for (let idx = 0; idx < journeyData.length; idx += 2) {
    const journey: {
      title: string;
      desc: string;
      skills: string;
      images: string[];
      start?: string;
      end: string;
    } = journeyData[idx];

    const images = getImages(journey.images);

    leftJourneys.push(
      <Journey
        title={journey.title}
        desc={journey.desc}
        skills={journey.skills}
        start={journey.start}
        end={journey.end}
        images={images}
        align={"left"}
      />
    );
  }

  const rightJourneys = [];
  for (let idx = 1; idx < journeyData.length; idx += 2) {
    const journey: {
      title: string;
      desc: string;
      skills: string;
      images: string[];
      start?: string;
      end: string;
    } = journeyData[idx];

    const images = getImages(journey.images);

    rightJourneys.push(
      <Journey
        title={journey.title}
        desc={journey.desc}
        skills={journey.skills}
        start={journey.start}
        end={journey.end}
        images={images}
        align={"right"}
      />
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
