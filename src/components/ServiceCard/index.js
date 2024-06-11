import "./style.scss";

// eslint-disable-next-line react/prop-types
const ServiceCard = ({ imageSrc, imageAlt = "image", children }) => (
    <div className="ServiceCard">
      <div className="ServiceCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      </div>
      <div className="ServiceCard__textContainer">{children}</div>
    </div>
  );
export default ServiceCard;
