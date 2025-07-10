// src/pages/EventsPage/EventDetailPage/index.tsx

import EventDetailMobile from "@/components/EventDetailMobile";
// import EventDetailDesktop from "@/components/EventDetailDesktop";
import { useMediaQuery } from "react-responsive";
import HeaderSimple from "@/components/HeaderSimple";
import EventDetailDesktop from "@/components/EventDetailDesktop";

const EventDetailPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 }); // Define o breakpoint para desktop

  return (
    <div>
      {isDesktop ? (
        <>
          <HeaderSimple />
          <EventDetailDesktop />
        </>
      ) : (
        <EventDetailMobile />
      )}
    </div>
  );
};

export default EventDetailPage;