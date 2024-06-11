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

    return (
      <div className="SlideCardList">
        {byDateDesc?.map((event, idx) => (
          <>
            <div key={`SlideCard_${event.title}`}
              className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
                }`}
            >
              <img src={event.cover} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div key={`SliderPaginationContainer_${event.id}`} className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination" name="pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    type="radio"
                    name="radio-button"
                    value={radioIdx}
                   /*  ici : peut-être changer la nature des inputs ??    */
                  />
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    );
  };

  export default Slider;
