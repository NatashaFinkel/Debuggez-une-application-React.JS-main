import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [byDateDesc]);

  const sliderDots = byDateDesc?.map((_event, slideIndex) => (
    <div
      // eslint-disable-next-line react/no-array-index-key
      key={slideIndex}
      className={`dot ${index === slideIndex ? 'active' : ''}`}
      id={`slide-numéro-${slideIndex}`}
    />
  ));

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div key={event.id} id={event.title} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} key={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3 key={event.title}>{event.title}</h3>
                <p key={event.description}>{event.description}</p>
                <div key={event.date}>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div key={`pagination_${event.slideIndex}`} className="SlideCard__pagination">{sliderDots}</div>
          </div>
        </>
      ))}
    </div >
  );
};

export default Slider;
