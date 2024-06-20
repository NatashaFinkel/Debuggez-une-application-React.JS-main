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
      id={`slide-numéro-${slideIndex}-${_event.title}`}
    />
  ));

  return (
    <div className="SlideCardList">
      {byDateDesc && byDateDesc.length > 0 && (
        <>
          <div
            key={byDateDesc[index].slide} id={byDateDesc[index].slide}
            className="SlideCard SlideCard--display"
          >
            <img src={byDateDesc[index].cover} key={byDateDesc[index].cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3 key={byDateDesc[index].title}>{byDateDesc[index].title}</h3>
                <p key={byDateDesc[index].description}>{byDateDesc[index].description}</p>
                <div key={byDateDesc[index].date}>{getMonth(new Date(byDateDesc[index].date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">{sliderDots}</div>
          </div>
        </>
      )}
    </div >
  );
};

export default Slider;
