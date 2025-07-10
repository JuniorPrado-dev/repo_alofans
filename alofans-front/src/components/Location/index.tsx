// src/components/Location/index.tsx

import * as S from "./style";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import ICONS from "@/assets/icons";
import Modal from "../Modal";
import SelectLocation from "./SelectLocation";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme

interface LocationProps {
  isHome?: boolean;
}

export default function Location({ isHome = false }: LocationProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const local = useAppSelector((state) => state.local.value);
  const { theme } = useTheme(); // Acesse o tema atual

  const render = <SelectLocation setModalVisible={setModalVisible} />;

  return (
    <>
      <Modal
        setVisible={setModalVisible}
        visible={modalVisible}
        children={render}
        theme={theme}
      />
      <S.Container id="Location.Container" onClick={() => setModalVisible(true)} theme={theme}> 
        <S.LocalIcon
          id="Location.LocalIcon"
          src={theme === 'dark' ? ICONS.locationWhite : ICONS.locationBlack} 
          theme={theme}
        />
        <S.LocalInfo  id="Location.LocalInfo" $isHome={isHome} theme={theme}>{`${local.city} - ${local.state}`}</S.LocalInfo>
        <S.Arrow
          id="Location.Arrow"
          src={theme === 'dark' ? ICONS.arrowDownWhite : ICONS.arrowDownBlack}
          theme={theme}
        />
      </S.Container>
    </>
  );
}