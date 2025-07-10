// src/pages/ProfilePage/WalletPage/index.tsx

import Wallet from "@/components/wallet";
import * as S from "./styles";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { makeWithDraw } from "@/services/payment";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme

const WalletPage = () => {
  const subAccount = useAppSelector((state) => state.subAccount.value);
  const producer = useAppSelector((state) => state.user.value);
  const [isActive, setIsActive] = useState(subAccount.balance > 0);
  const { theme } = useTheme(); // Acesse o tema atual

  const handleWithdraw = async () => {
    const confirmWithDraw = confirm("Deseja realmente sacar?");
    if (confirmWithDraw) {
      if (producer.pix_key === "" || producer.pix_key_type === "") {
        alert("Você precisa ser um produtor ou interlocutor para realizar o saque");
      } else {
        const response = await makeWithDraw()
        alert(response?.detail);
      }
    } else {
      alert("Saque cancelado!");
    }
  };

  useEffect(() => {
    setIsActive(subAccount.balance > 0);
  }, [subAccount.balance]);

  return (
    <div>
      <S.ContainerUp id="WalletPage.ContainerUp" theme={theme}>
        <S.Text id="WalletPage.Text" theme={theme}>Gerenciando sua Conta no AlôFans</S.Text> {/* Passe o tema como prop */}
        <S.Container id="WalletPage.Container" theme={theme}> {/* Passe o tema como prop */}
          <S.TextContainer id="WalletPage.TextContainer"></S.TextContainer>
          <Wallet />
          <S.Button
            id="WalletPage.Button"
            $isActive={isActive}
            onClick={handleWithdraw}
            theme={theme} // Passe o tema como prop
          >
            Sacar
          </S.Button>
        </S.Container>
      </S.ContainerUp>
    </div>
  );
};

export default WalletPage;