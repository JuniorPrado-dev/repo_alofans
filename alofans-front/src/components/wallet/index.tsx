// src/components/wallet/index.tsx

import { getWallet } from "@/services/payment";
import * as S from "./styles";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme

const Wallet = () => {
  const dispatch = useDispatch();
  const subAccount = useAppSelector((state) => state.subAccount.value);
  const user = useAppSelector((state) => state.user.value);
  const { theme } = useTheme(); // Acesse o tema atual

  useEffect(() => {
    if (user.pix_key && user.pix_key_type) {
      getWallet(dispatch);
    }
  }, []);

  return (
    <S.Container theme={theme}> {/* Passe o tema como prop */}
      <S.Balance theme={theme}>R$ {subAccount.balance.toFixed(2).replace('.', ',')}</S.Balance>
      <S.pix_key theme={theme}>Chave Pix: {subAccount.pix_key}</S.pix_key>
      <S.Name theme={theme}>Nome: {user.name}</S.Name>
    </S.Container>
  );
};

export default Wallet;