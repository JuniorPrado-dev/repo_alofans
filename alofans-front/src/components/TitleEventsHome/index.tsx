//import ICONS from "@/assets/icons";
import { useTheme } from "@/contexts/ThemeContext";
import * as S from "./styles";


const TitleEventsHome = () => {
    const { theme } = useTheme();

    return (
        <S.SectionContainer id="EventList.SectionContainer" theme={theme}>
            {/* <img
                src={theme === "dark" ? ICONS.calendar : ICONS.calendar}
                alt="Calendário"
                width={18}
                height={18}
            /> */}
            <S.SectionText id="EventList.SectionText" theme={theme}
            style={{
                fontSize: 22,
                fontWeight: 500,
                marginLeft: 8,
                marginBottom: 0,
            }}
            >
                Eventos mais vistos
            </S.SectionText>
        </S.SectionContainer>
    );
};
export default TitleEventsHome;