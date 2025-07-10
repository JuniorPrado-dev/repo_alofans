//src/components/EventsMobile/index.tsx

import * as S from "./style";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Location from "@/components/Location";
import CardEvent from "@/components/CardEvent";
import SearchComponent from "@/components/SearchComponent";
import { useEffect, useState } from "react";
import { refreshEventList } from "@/services/events"; // ✅ Importação correta
import { getEventsByLocate } from "@/utils/event";
import LoadingSpinner from "@/components/LoadingSpinner";
import FloatingActionButton from "@/components/FloatingActionButton";
import { goToAddEvent } from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import IMAGES from "@/assets/images";
import { useTheme } from "@/contexts/ThemeContext";
import NoEvent from "../NoEvent";

interface Props {
  events: TypeEventResponse[]
}
const EventsMobile = ({ events }: Props) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [eventsShow, setEventsShow] = useState<TypeEventResponse[] | null>(null);
  const local = useAppSelector((selector) => selector.local.value);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("todos");

  useEffect(() => {
    (async () => await refreshEventList(dispatch))()
  }, [dispatch]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {

        if (events.length === 0 && loading) {
          setEventsShow(events);
        } else {
          const filteredEvents = getEventsByLocate(local.state, local.city, events);
          if (eventType !== "todos") {
            if (eventType.toLowerCase() === "online") {
              setEventsShow(filteredEvents.filter((event) => event.is_online));
            } else {
              setEventsShow(filteredEvents.filter((event) => !event.is_online));
            }
          } else {
            setEventsShow(filteredEvents);
          }
          setLoading(false);
        }
      } catch {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [events, local, eventType]);

  return (
    <S.Container id="EventsPage.Container" theme={theme}>
      <S.TopContainer id="EventsPage.TopContainer" theme={theme}>
        <S.Logo id="EventsPage.Logo" src={IMAGES.logoText} alt="Logo do App" theme={theme} />
        <S.LocationContainer id="EventsPage.LocationContainer">
          <Location />
        </S.LocationContainer>
      </S.TopContainer>

      <SearchComponent data={events} setFilter={setEventsShow} />

      <S.EventContainer id="EventsPage.EventContainer" theme={theme}>
        <S.TypeContainer id="EventsPage.TypeContainer">
          <S.ButtonTypeTodos id="EventsPage.ButtonTypeTodos.Todos" onClick={() => setEventType("todos")} $isActive={eventType === "todos"} theme={theme}>
            {"TODOS"}
          </S.ButtonTypeTodos>
          <S.ButtonTypeOnline id="EventsPage.ButtonTypeTodos.Online" onClick={() => setEventType("online")} $isActive={eventType === "online"} theme={theme}>
            {"ONLINE"}
          </S.ButtonTypeOnline>
          <S.ButtonTypePresencial id="EventsPage.ButtonTypeTodos.Presen" onClick={() => setEventType("presencial")} $isActive={eventType === "presencial"} theme={theme}>
            {"PRESENCIAL"}
          </S.ButtonTypePresencial>
        </S.TypeContainer>

        <S.EventText id="EventsPage.EventText" theme={theme}>{"Escolha o evento"}</S.EventText>

        <S.EventList id="EventsPage.EventList">
          {eventsShow ? eventsShow?.map((event, index) => (
            <CardEvent key={index} event={event} />
          )): loading ? <LoadingSpinner /> : <NoEvent />}
        </S.EventList>
        <S.Separator id="EventsPage.Separator" theme={theme}></S.Separator>
      </S.EventContainer>
      <FloatingActionButton onClick={() => goToAddEvent(navigate)} />
    </S.Container>
  );
};

export default EventsMobile;
