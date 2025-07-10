// src/components/Services/index.tsx

import ServiceIcon from "./ServiceIcon";
import IMAGES from "@/assets/images";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { goToAddEvent, goToAdvertisePage, goToEvents } from "@/routers/Coordinator";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme

const Services = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Acesse o tema atual

  return (
    <div>

      {/* TopContainer para desktop 🖥️ */}
      <S.ContainerDesktop id="Services.ContainerDesktop" theme={theme}>
        <S.PrimText id="Services.PrimText" theme={theme}>
          Encontre, explore, viva! Seu próximo "ALÔ" te espera.
        </S.PrimText>
        <S.SecText id="Services.SecText" theme={theme}>
          Mais do que eventos, momentos inesquecíveis!
        </S.SecText>
        <S.Content id="Services.Content" theme={theme}>
          <S.Section id="Services.Section.MandeSeuAlo" onClick={() => goToEvents(navigate)} theme={theme}>
            <S.Icon id="Services.Icon.MandeSeuAlo" src={IMAGES.sendAlo} alt="Mande seu Alô" theme={theme} />
            <S.Text id="Services.Text.MandeSeuAlo" theme={theme}>Mande seu Alô</S.Text>
          </S.Section>

          <S.Section id="Services.Section.AddEvent" onClick={() => goToEvents(navigate)} theme={theme}>
            <S.Icon id="Services.Icon.MandeSeuAlo" src={IMAGES.searchEvent} alt="Mande seu Alô" theme={theme} />
            <S.Text id="Services.Text.MandeSeuAlo" theme={theme}>Pesquisar Eventos</S.Text>
          </S.Section>
          
          <S.Section id="Services.Section.AnuncieAqui" onClick={() => goToAdvertisePage(navigate)} theme={theme}>
            <S.Icon id="Services.Icon.AnuncieAqui" src={IMAGES.ads} alt="Divulgue sua Marca" theme={theme} />
            <S.Text id="Services.Text.AnuncieAqui" theme={theme}>Divulgue sua Marca</S.Text>
          </S.Section>

          <S.Section id="Services.Section.CodastrarEventos" onClick={() => goToAddEvent(navigate)} theme={theme}>
            <S.Icon id="Services.Icon.CodastrarEventos" src={IMAGES.addEvent} alt="Codastrar Eventos" theme={theme} />
            <S.Text id="Services.Text.CodastrarEventos" theme={theme}>Cadastrar Eventos</S.Text>
          </S.Section>
        </S.Content>
        {/* <S.GirlImage id="Services.GirlImage" src={IMAGES.girl} alt="Girl" theme={theme} /> */}
      </S.ContainerDesktop>

      {/* TopContainer para mobile 📱 */}
      <S.ContainerMobile id="Services.Container" theme={theme}>
        <S.StyledLink id="Services.StyledLink.sendAlo" onClick={() => goToEvents(navigate)} theme={theme}>
          <ServiceIcon
            icon={theme === 'dark' ? IMAGES.sendAlo : IMAGES.sendAlo} // Ícone com base no tema
            text="Mande seu Alô"
            theme={theme} // Passe o tema como prop
          />
        </S.StyledLink>
        <S.StyledLink id="Services.StyledLink.ads" onClick={() => goToAdvertisePage(navigate)} theme={theme}>
          <ServiceIcon
            icon={theme === 'dark' ? IMAGES.ads : IMAGES.ads} // Ícone com base no tema
            text="Divulgue sua Marca"
            theme={theme} // Passe o tema como prop
          />
        </S.StyledLink>
        <S.StyledLink id="Services.StyledLink.addEvent" onClick={() => goToAddEvent(navigate)} theme={theme}>
          <ServiceIcon
            icon={theme === 'dark' ? IMAGES.addEvent : IMAGES.addEvent} // Ícone com base no tema
            text="Adicionar Evento"
            theme={theme} // Passe o tema como prop
          />
        </S.StyledLink>
      </S.ContainerMobile>
    </div>
  );
};

export default Services;