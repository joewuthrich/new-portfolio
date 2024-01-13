import { useEffect, useState } from "react";

import "./AboutPage.css";
import Arrow from "../Arrow";
import Title from "../Title";

const AboutPage = ({ collidedDOM, moveScreenAction }) => {
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/abouts/2023-12-06.txt`)
      .then((response) => response.text())
      .then((data) => {
        const paragraphArray = data.split("\n");
        setParagraphs(paragraphArray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="content-container about-content-container">
      <Arrow
        title={"Back to Main"}
        align={"right"}
        onClick={() => moveScreenAction("right")}
        collidedDOM={collidedDOM}
      />
      {/* <div className="about-title-container">
        <Title
          title="ABOUT ME"
          width={`${window.innerHeight - 71 * 2}px`}
          size="70px"
        />
      </div> */}
      <div className="about-text-container">
        {paragraphs.map((paragraph, index) => (
          <p className="about-text" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
