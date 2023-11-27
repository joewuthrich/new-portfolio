import "./Interest.css";

type InterestProps = {
  title: string;
  description: string;
  imageSrcs?: string[];
  collidedDOM: string | null;
};

const Arrow = (props: InterestProps) => {
  const imagesProp = props.imageSrcs ?? [];

  const images = [];
  for (const srcIdx in imagesProp) {
    const src = imagesProp[srcIdx];
    images.push(
      <img
        id={src}
        className={`interest-image interactable ${
          props.collidedDOM === src ? "hover" : ""
        }`}
        src={process.env.PUBLIC_URL + src}
        alt=""
        width="150"
        height="150"
      />
    );
  }

  return (
    <div className={`interest-container`}>
      <text className={"interest-title"}>{props.title}</text>
      <text className={"interest-description"}>{props.description}</text>
      <div className="interest-image-container">{images}</div>
    </div>
  );
};

export default Arrow;
