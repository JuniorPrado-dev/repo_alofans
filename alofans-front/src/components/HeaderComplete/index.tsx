//src/components/HeaderComplete/index.tsx

import { JSX} from "react";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLogout } from "@/services/users";
import { goToHome, goToLogin } from "@/routers/Coordinator"; // Adicione goToSendAlos
import { useNavigate } from "react-router-dom";
import IMAGES from "@/assets/images";
import { useTheme } from "@/contexts/ThemeContext";
import SearchComponent from "../SearchComponent";
import Location from "@/components/Location";

interface Props {
    eventsList:TypeEventResponse[],
    setEventsShow:(e:TypeEventResponse[])=>void
}
const HeaderComplete = ({
    eventsList,
    setEventsShow
}:Props): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.value);
    const { theme } = useTheme(); 
    
    const handleLogout = () => {
        userLogout(dispatch);
    };

    return (
        <S.Header id="HeaderStyled.Header" theme={theme}>
            {/* TopContainer para desktop 🖥️ */}
            <S.TopContainerDesktop id="HeaderStyled.TopContainerDesktop" theme={theme}>
                <S.LogoContainer onClick={() => goToHome(navigate)}>
                    <S.Logo id="HeaderStyled.Logo" src={IMAGES.logoText} alt="Logo do App" theme={theme} />
                </S.LogoContainer>

                <S.RightContainer>
                    <SearchComponent data={eventsList} setFilter={setEventsShow} />
                        <S.LocationContainer id="HeaderStyled.LocationContainer">
                            <Location />
                        </S.LocationContainer>
                    <S.ProfileContainer id="HeaderStyled.ProfileContainer" theme={theme}>
                        {user.name ? (
                            <>
                                <p>{user.name.split(" ")[0]}</p>
                                <S.ProfileButton onClick={handleLogout} theme={theme}>Sair</S.ProfileButton>
                            </>
                        ) : (
                            <div onClick={() => goToLogin(navigate)}>Login</div>
                        )}
                    </S.ProfileContainer>
                </S.RightContainer>
            </S.TopContainerDesktop>

        </S.Header>
    );
};

export default HeaderComplete;