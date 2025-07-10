//src/pages/EventsPage/EventEditPage/index.tsx

import EventEditDesktop from "@/components/EventEditDesktop";
import { useMediaQuery } from "react-responsive";
import HeaderSimple from "@/components/HeaderSimple";
import EventEditMobile from "@/components/EventEditMobile";

const EventEditPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 }); // Define o breakpoint para desktop

  return (
    <div>
      {isDesktop ? (
        <>
          <HeaderSimple />
          <EventEditDesktop />
        </>
      ) : (
        <EventEditMobile />
      )}
    </div>
  );
};

export default EventEditPage;
