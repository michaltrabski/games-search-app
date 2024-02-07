const Card = ({ title, description }) => {
  return (
    <div className="border p-5">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};