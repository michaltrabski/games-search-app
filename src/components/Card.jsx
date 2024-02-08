const Card = ({ title, platforms, image }) => {
  return (
    <div className="bg-dark">
      <div className="card-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="p-3">
        <p>{title}</p>

        {platforms?.map((platform, i) => (
          <span className="text-small" key={i}>
            {platform?.platform?.name} {i < platforms.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
