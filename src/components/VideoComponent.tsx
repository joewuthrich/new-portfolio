import React, { useEffect, useRef } from "react";
import "./Interest.css";

const VideoComponent = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // Margin around the root
      threshold: 0.5, // When 50% of the video is in view
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const video = videoRef.current;

        if (entry.isIntersecting) {
          // If video is in view, play it
          if (video) {
            video.play().catch((error) => {
              // Handle play error
              console.error("Video play error:", error);
            });
          }
        } else {
          // If video is out of view, pause it
          if (video) {
            video.pause();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe the video element
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      // Disconnect the observer when component unmounts
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video ref={videoRef} muted loop height="150" className={`interest-image`}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;
