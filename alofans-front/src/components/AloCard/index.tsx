//src/components/Alocard/index.tsx
import COLORS from "@/constants/colors";
import * as S from "./styles";
import { updateStatusAlo } from "@/services/alos";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { EnumAloStatus } from "@/enums/alo";
import { Campaign } from "@mui/icons-material";

interface Props {
  alo: TypeAloResponse;
  aloList: TypeAloResponse[];
  isFromClient: boolean;
}

const AloCard = ({ alo, isFromClient = false }: Props) => {
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Acesse o tema atual
  const [self, setSelf] = useState<TypeAloResponse>(alo);

  useEffect(() => {
    setSelf(alo);
  }, [alo]);

  const handleColorSelector = () => {
    switch (alo.status) {
      case EnumAloStatus.WAITING:
        return theme === "dark" ? COLORS.yellow[500] : COLORS.yellow[500];
      case EnumAloStatus.APPROVED:
        return theme === "dark" ? COLORS.green[500] : COLORS.green[500];
      case EnumAloStatus.REJECTED:
        return theme === "dark" ? COLORS.red[500] : COLORS.red[500];
      case EnumAloStatus.FINISHED:
        return theme === "dark" ? COLORS.blue[500] : COLORS.blue[400];
      default:
        return theme === "dark" ? COLORS.black[900] : COLORS.black[800];
    }
  };

  const handleStatusChange = (status: string) => {
    updateStatusAlo(self.id, status, dispatch);
    setSelf({ ...self, status: status });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case EnumAloStatus.WAITING:
        return "Aguardando";
      case EnumAloStatus.APPROVED:
        return "Aprovado";
      case EnumAloStatus.REJECTED:
        return "Recusado";
      case EnumAloStatus.FINISHED:
        return "Finalizado";
      default:
        return status;
    }
  };

  const handleButtonSelector = (status: string) => {
    if (isFromClient) {
      return null;
    }
    switch (status) {
      case EnumAloStatus.WAITING:
        return (
          <S.ButtonsContainerTwo id="AloCard.ButtonsContainerTwo">
            <S.Button
              id="AloCard.Button.Rejected"
              style={{ backgroundColor: COLORS.red[500] }}
              onClick={() => handleStatusChange(EnumAloStatus.REJECTED)}
            >
              Recusar
            </S.Button>
            <S.Button
              id="AloCard.Button.Approved"
              style={{ backgroundColor: COLORS.green[500] }}
              onClick={() => handleStatusChange(EnumAloStatus.APPROVED)}
            >
              Aprovar
            </S.Button>
          </S.ButtonsContainerTwo>
        );
      case EnumAloStatus.APPROVED:
        return (
          <S.ButtonsContainerOne id="AloCard.ButtonsContainerOne">
            <S.Button
              id="AloCard.Button.Finished"
              style={{ backgroundColor: COLORS.blue[500] }}
              onClick={() => handleStatusChange(EnumAloStatus.FINISHED)}
            >
              Finalizar Alô
            </S.Button>
          </S.ButtonsContainerOne>
        );
      case EnumAloStatus.REJECTED:
        return null;
      case EnumAloStatus.FINISHED:
        return null;
      default:
        return null;
    }
  };

  return (
    <S.Container id="AloCard.Container" theme={theme}>
      <S.Title id="AloCard.Title" theme={theme}>
        {self.event_name}
      </S.Title>
      <S.MessageContainer>
        <Campaign style={{ fontSize: 25, color: theme === 'dark' ? COLORS.white[100] : COLORS.black[800], opacity: 0.9 }} />
        <S.Message id="AloCard.Message" theme={theme}>
          {self.text_message}
        </S.Message>
      </S.MessageContainer>
      <S.StatusContainer id="AloCard.StatusContainer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <S.StatusColor
            id="AloCard.StatusColor"
            style={{ backgroundColor: handleColorSelector() }}
          />
          <S.StatusText id="AloCard.StatusText" theme={theme}>
            {getStatusText(self.status)}
          </S.StatusText>
        </div>
      </S.StatusContainer>
      {handleButtonSelector(self.status)}
    </S.Container>
  );
};

export default AloCard;
