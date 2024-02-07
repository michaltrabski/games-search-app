const Card = ({ title, platforms, image }) => {
  return (
    <div className="border rounded">
      <div
        className="w-100 bg-cover"
        style={{ backgroundImage: `url(${image})`, height: 100, backgroundPosition: "center" }}
      ></div>
      <div className="p-3">
        <p>{title}</p>
        {/* <p className="small">{JSON.stringify(platforms, null, 2)}</p> */}

        {platforms.map((platform, i) => (
          <span className="small" key={i}>
            {platform?.platform?.name} {i < platforms.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
