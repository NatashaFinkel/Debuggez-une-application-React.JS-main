import "./style.scss";

// eslint-disable-next-line react/prop-types
const PeopleCard = ({ imageSrc, imageAlt = "", position, name }) => (
    <div className="PeopleCard">
      <div className="PeopleCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      </div>
      <div className="PeopleCard__descriptionContainer">
        <div className="PeopleCard__name">{name}</div>
        <div className="PeopleCard__position">{position}</div>
      </div>
    </div>
  );
export default PeopleCard;
