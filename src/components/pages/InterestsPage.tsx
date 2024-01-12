import "../Interest.css";
import Arrow from "../Arrow";
import Title from "../Title";
import Interest from "../Interest";

const InterestsPage = ({ collidedDOM, moveScreenAction }) => {
  return (
    <div className="content-container">
      <Arrow
        title={"Back to Main"}
        align={"left"}
        onClick={() => moveScreenAction("left")}
        collidedDOM={collidedDOM}
      />
      <div className="interest-list-container">
        <Interest
          collidedDOM={collidedDOM}
          title={"PHOTOGRAPHY"}
          description="I started photography in order to get better photos to practice editing, and it's grown into one of my passions. Ask me anything about photography, Photoshop, or Lightroom!"
          imageSrcs={[
            "/images/interests-photography-tongariro.jpg",
            "/images/interests-photography-bajo.jpg",
            "/images/interests-photography-pinnacles.jpg",
          ]}
          align="left"
          offset={"-27%"}
        />
        <Interest
          collidedDOM={collidedDOM}
          title={"INNOVATION"}
          description="I've always loved creating new things, and this love has only grown. I've won a few awards for my own projects, such as the University of Auckland Velocity Innovation Challenge."
          align="right"
          offset={"300px"}
        />
        <Interest
          collidedDOM={collidedDOM}
          title={"TRAVEL"}
          description="I was lucky enough to travel a lot as a child, and especially during my time at university. I've gone everywhere from Singapore to Switzerland to Australia, and hope to continue travelling long into the future!"
          imageSrcs={[
            "/images/interests-travel-singapore.jpg",
            "/images/interests-travel-pinnacles.jpg",
            "/images/interests-travel-london.jpg",
          ]}
          align="left"
          offset={"14%"}
        />
      </div>
      <div className="interests-title-container">
        <Title
          title="INTERESTS"
          width={`${window.innerHeight - 71 * 2}px`}
          size="70px"
        />
      </div>
    </div>
  );
};

export default InterestsPage;
