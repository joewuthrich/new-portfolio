import "../Interest.css";
import "./JourneyPage.css";
import Arrow from "../Arrow";
import Title from "../Title";
import Journey from "../Journey";
import Footprint from "../Footprint";
import { useEffect } from "react";
import VideoComponent from "../VideoComponent";

const JourneyPage = ({
  collidedDOM,
  moveScreenAction,
  type,
  footprints,
  currentScreen,
  scroll,
}) => {
  const journeyData: {
    title: string;
    desc: string;
    skills: string;
    images: string[];
    start?: string;
    end: string;
  }[] = require(`../../journeys/journey-${type.replace(" ", "-")}.json`);

  // TODO: Make this reactive later
  const isSmall = window.innerWidth < 1100;
  const singleImage =
    window.innerWidth < 700 ||
    (window.innerWidth < 1550 && window.innerWidth > 1100);

  useEffect(() => {}, [scroll]);

  const getImages = (imageSrcs) => {
    const images = [];
    for (const srcIdx in imageSrcs) {
      const src = "/images/" + imageSrcs[srcIdx];
      images.push(
        src.includes(".mp4") ? (
          <VideoComponent src={process.env.PUBLIC_URL + src} />
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

      // If the page is small only ever return one video (otherwise might not fit)
      if (singleImage) return images;
    }
    return images;
  };

  const leftJourneys = [];
  if (!isSmall) {
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
  }

  const rightJourneys = [];

  for (let idx = 1; idx < journeyData.length; idx += isSmall ? 1 : 2) {
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
      <text
        id="return-top-text"
        className={`return-top-text interactable prevent-click-move ${
          collidedDOM === "return-top-text" ? "hover" : ""
        }`}
        onClick={() =>
          document
            .getElementById("journey-screen")
            .scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        Back to Top
      </text>

      {/* <Title
        title="MY JOURNEY"
        width={
          isSmall ? "calc(100% - 41px - 41px)" : "calc(100% - 71px - 71px)"
        }
        size={isSmall ? "40px" : "80px"}
      /> */}
    </div>
  );
};

export default JourneyPage;
