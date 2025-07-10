//src/pages/EventsPage/index.tsx

import EventsMobile from "@/components/EventsMobile";
import { useMediaQuery } from "react-responsive";
import HeaderComplete from "@/components/HeaderComplete";
import EventsDesktop from "@/components/EventsDesktop";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useChargeVerify from "@/hooks/useChargeVerify";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const dispatch = useAppDispatch()
  const isDesktop = useMediaQuery({ minWidth: 768 }); // Define o breakpoint para desktop
  const eventList = useAppSelector((selector) => selector.eventList.value);
  const [events,setEvents]=useState<TypeEventResponse[]>(eventList)
  const navigate = useNavigate()

  useChargeVerify(dispatch,navigate)
  
  useEffect(() => {
      //(async()=>await refreshEventList(dispatch))();
      setEvents(eventList)
    }, [dispatch]);

  useEffect(() => {
      setEvents(eventList)
    }, [eventList]);
    
  return (
    <div>
      {isDesktop ? (
        <>
          <HeaderComplete 
           eventsList={eventList}
           setEventsShow={setEvents}
          />
          <EventsDesktop events={events} />
        </>
      ) : (
        <EventsMobile events={eventList}/>
      )}
    </div>
  );
};

export default EventsPage;