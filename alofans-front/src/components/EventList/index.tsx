// src/components/EventList/index.tsx

import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { RootState } from "@/redux/store";
import { getEventsByLocate } from "@/utils/event";
import * as S from "./styles";
import { useAppSelector } from "@/redux/hooks";
import CardEvent from "../CardEvent";
import { useTheme } from "@/contexts/ThemeContext";
import NoEvent from "../NoEvent";

const EventList = () => {
  const events = useAppSelector((state: RootState) => state.eventList.value);
  const local = useAppSelector((state: RootState) => state.local.value);
  const [loading, setLoading] = useState(true);
  const [eventsToShow, setEventsToShow] = useState<TypeEventResponse[] | null>(
    null
  );
  const { theme } = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!eventsToShow && loading) {
       // return await refreshEventList(dispatch);
      } else {
        const filteredEvents = getEventsByLocate(
          local.state,
          local.city,
          events
        );
        setEventsToShow(filteredEvents);
        setLoading(false);
      }
    };
    try {
      fetchEvents();
    } catch {
    } finally {
      setLoading(false);
    }
  }, [events, local]);

  if (loading) {
    return (
      <S.LoadingContainer>
        <LoadingSpinner />
      </S.LoadingContainer>
    );
  }

  
  return (
    <S.Container id="EventList.Container" theme={theme}>
      <S.EventsContainer id="EventList.EventsContainer" theme={theme}>
        {eventsToShow && eventsToShow.length ? (
          eventsToShow.map((event, index) => (
            <CardEvent key={index} event={event} />
          ))
        ) : (
          <S.NoEventWrapper>
            <NoEvent />
          </S.NoEventWrapper>
        )}
      </S.EventsContainer>
      <S.Separator id="EventList.Separator" theme={theme}></S.Separator>
    </S.Container>
  );
};

export default EventList;