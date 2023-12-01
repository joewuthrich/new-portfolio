import "../Interest.css";
import "./JourneyPage.css";
import Arrow from "../Arrow";
import Title from "../Title";
import Journey from "../Journey";
import Footprint from "../Footprint";

const JourneyPage = ({
  collidedDOM,
  moveScreenAction,
  type,
  footprints,
  currentScreen,
}) => {
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
        src.includes(".mp4") ? (
          <video
            className={`interest-image`}
            autoPlay
            muted
            src={process.env.PUBLIC_URL + src}
            // width="150"
            height="150"
            loop
          />
        ) : (
          <img
            className={`interest-image`}
            src={process.env.PUBLIC_URL + src}
            alt=""
            // width="150"
            height="150"
          />
        )
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
        collidedDOM={collidedDOM}
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
        collidedDOM={collidedDOM}
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
    <div
      className="content-container"
      style={{
        flexDirection: "column",
      }}
    >
      <div
        className="journey-arrow-container"
        style={{
          top: 0 + "px",
        }}
      >
        <Arrow
          title={"Back to Main"}
          align={"top"}
          onClick={() => moveScreenAction("up")}
          collidedDOM={collidedDOM}
        />
      </div>
      <div className="full-journey-container">
        {currentScreen === "journey"
          ? footprints.map((fp, _) => (
              <Footprint
                key={fp.key}
                position={{ x: fp.x, y: fp.y }}
                side={fp.side}
                facing={fp.facing}
              />
            ))
          : null}
        <div className="column-journey-container left">{leftJourneys}</div>
        <div className="center-divider" />
        <div className="column-journey-container right">{rightJourneys}</div>
      </div>
      <div className="top-fog" />
      <div className="bottom-fog" />
      <Title title="MY JOURNEY" width="calc(100% - 71px - 71px)" size="80px" />
    </div>
  );
};

export default JourneyPage;
