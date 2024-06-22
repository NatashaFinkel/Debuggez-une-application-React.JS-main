import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEvents = (data?.events || []).filter(event => !type || event.type === type);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  function CreatePagination(events, maxPerPage) {
    return Math.ceil((events?.length || 0) / maxPerPage);
  }

  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));
  const pageNumber = CreatePagination(filteredEvents, PER_PAGE);
  
  filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  const paginatedFilteredEvents = filteredEvents.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedFilteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}
                className={currentPage === n + 1 ? 'active' : ''}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
