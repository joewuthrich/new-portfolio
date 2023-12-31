import "./Header.css";

function Title({
  title,
  width,
  size,
}: {
  title: string;
  width?: string;
  size?: string;
}) {
  return (
    <div className="name-container">
      <div
        className="background-box"
        style={width ? { width: width } : {}}
      ></div>
      <text className="name-header" style={size ? { fontSize: size } : {}}>
        {title}
      </text>
    </div>
  );
}

export default Title;
