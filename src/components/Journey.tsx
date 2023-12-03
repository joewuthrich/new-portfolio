import { useState, useEffect, useRef } from "react";
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
  const [isLarge, setLarge] = useState(false);
  const journeyRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: `30% 0px 30% 0px`, // Margin around the root
      threshold: 0.9,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("entering " + title);

          if (!isLarge) setLarge(true);
        } else {
          console.log("leaving " + title);
          if (isLarge) setLarge(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe the video element
    if (journeyRef.current) {
      observer.observe(journeyRef.current);
    }

    return () => {
      // Disconnect the observer when component unmounts
      if (journeyRef.current) {
        observer.unobserve(journeyRef.current);
      }
    };
  }, [isLarge, title]);

  return (
    <div
      id={`${title}-${end}-${align}`}
      className={`journey-full-item-container ${align} ${
        isLarge ? "hover" : ""
      }`}
      ref={journeyRef}
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
