//src/components/HeaderStyled/index.tsx

import { JSX, useEffect, useState  } from "react";
import Services from '@/components/Services';
import * as S from "./styles";
import { getToken } from "@/storage/tokenCach";
import { STATE, CITY } from "@/constants/localStorage";
import { setLocate } from '@/redux/slices/locateSlice';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Location from "@/components/Location";
import { userLogout } from "@/services/users";
import { goToAlos, goToLogin, goToProfile } from "@/routers/Coordinator"; // Adicione goToSendAlos
import { useNavigate } from "react-router-dom";
import IMAGES from "@/assets/images";
import ThemeToggleButton from "../ThemeToggleButton";
import { useTheme } from "@/contexts/ThemeContext";
import { FaBullhorn } from "react-icons/fa";

const HeaderStyled = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isScrolled, setIsScrolled] = useState(false);

    const local = useAppSelector((state) => state.local.value);
    const user = useAppSelector((state) => state.user.value);
    const { theme } = useTheme(); // Acesse o tema atual

    useEffect(() => {
        async function checkLocation() {
            const localState = await getToken(STATE);
            const localCity = await getToken(CITY);

            if (localState && localCity) {
                if (localState !== local.state || localCity !== local.city) {
                    dispatch(setLocate({ state: localState, city: localCity }));
                }
            }
        }
        // refreshUserData(dispatch);//

        checkLocation();
    }, [dispatch, local.state, local.city]);

    const handleLogout = () => {
        userLogout(dispatch);
    };

    const handleGoToProfile = () => {
        goToProfile(navigate); // Redireciona para a página de perfil
    };

    const handleGoToAlos = () => {
        goToAlos(navigate); // Redireciona para a página de Alos
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) { // Ajuste o valor conforme necessário
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <S.Header id="HeaderStyled.Header" theme={theme}>
            {/* TopContainer para desktop 🖥️ */}
            <S.TopContainerDesktop id="HeaderStyled.TopContainerDesktop" theme={theme} isScrolled={isScrolled}>
                <S.LogoContainer>
                    <S.Logo id="HeaderStyled.Logo" src={IMAGES.logoText} alt="Logo do App" theme={theme} />
                </S.LogoContainer>

                <S.RightContainer>
                    <ThemeToggleButton />
                    <S.LocationContainer id="HeaderStyled.LocationContainer">
                        <Location />
                    </S.LocationContainer>
                    <S.ProfileButtonTop onClick={handleGoToProfile} theme={theme}>Perfil</S.ProfileButtonTop>
                    <S.ProfileButtonTop onClick={handleGoToAlos} theme={theme}>
                        <FaBullhorn /> {/* Ícone de megafone */}
                        Gerênciar Alôs</S.ProfileButtonTop>
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

            {/* TopContainer para mobile 📱 */}
            <S.TopContainerMobile id="HeaderStyled.TopContainer" theme={theme}>
                {/* Logo no canto superior esquerdo */}
                <S.Logo id="HeaderStyled.Logo" src={IMAGES.logoText} alt="Logo do App" theme={theme} />

                {/* Location no canto superior direito */}
                <S.LocationContainer id="HeaderStyled.LocationContainer">
                    <Location />
                </S.LocationContainer>
            </S.TopContainerMobile>

            {/* Container original */}
            <S.Container id="HeaderStyled.Container" theme={theme}>

                <ThemeToggleButton />

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
            </S.Container>

            <S.ContainerSpace theme={theme}></S.ContainerSpace>

            <Services />
        </S.Header>
    );
};

export default HeaderStyled;