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
/*       key={slideIndex} */
      className={`dot ${index === slideIndex ? 'active' : ''}`}
      id={`slide-numéro-${slideIndex}-${_event.title}`} 
    />
  ));

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div /* key={event.slide} */ id={event.slide} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} /* key={event.cover}  */alt="forum" />
            <div className="SlideCard__descriptionContainer" /* key="PPP" */>
              <div className="SlideCard__description" /*  key="LLL" */>
                <h3 /* key={event.title} */>{event.title}</h3>
                <p /*  key={event.description} */>{event.description}</p>
                <div /*  key={event.date} */>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer" /* key={`pagination_${event.WWW}`} */ >
          
            <div /* key={`pagination_${event.WWW}`}  */className="SlideCard__pagination">{sliderDots}</div>
          </div>
        </>
      ))}
    </div >
  );
};

export default Slider;
