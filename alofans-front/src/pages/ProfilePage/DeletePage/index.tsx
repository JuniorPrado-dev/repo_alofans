// src/pages/ProfilePage/DeletePage/index.tsx
import { useState } from 'react';
import * as S from "./styles";
import Button from '@/components/Button';
import COLORS from '@/constants/colors';
import { FormFieldInput } from "@/components/FormField/FormFieldInput"
import { userDeleteAccount } from '@/services/users';
import { useAppDispatch } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { goToHome } from '@/routers/Coordinator';
import { useTheme } from "@/contexts/ThemeContext";

const DeletePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { theme } = useTheme(); // Acesse o tema atual

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsModalVisible(false);

    const result = await userDeleteAccount(dispatch);

    if (result.status != "error") {
      alert('Conta deletada. Sua conta foi deletada com sucesso.');
      goToHome(navigate);
    } else {
      alert('Ocorreu um erro ao tentar deletar a conta. Verifique a senha e tente novamente.');
    }
  };

  const handleUpdatePassword = (password: string) => {
    setPassword(password);
    if (password.length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  return (
    <div>
      <S.Header theme={theme}>Deletar Conta</S.Header>
      <S.Container theme={theme}>
        <S.Content theme={theme}>
          <S.Text style={{ fontWeight: 'bold' }} theme={theme}>
            Você tem certeza que quer deletar sua conta?
          </S.Text>
          <S.Text style={{ textAlign: 'justify' }} theme={theme}>
            Excluir sua conta é uma ação permanente e não pode ser desfeita. Todas as suas informações, incluindo seus dados pessoais, eventos e mensagens, serão permanentemente removidas.
          </S.Text>
          <S.Text style={{ fontWeight: 'bold' }} theme={theme}>
            Por favor, entre com sua senha para deletar a conta.
          </S.Text>

          <S.ButtonContainer>
            <S.FormFieldContainer>
              <FormFieldInput
                label=""
                keyboardType="password"
                placeholder="Senha"
                value={password}
                onChangeText={handleUpdatePassword}
                onBlur={() => { }}
                theme={theme} // Passe o tema como prop
              />
            </S.FormFieldContainer>
            <Button
              text="Deletar Conta"
              backgroundColor={COLORS.red[300]}
              textColor="#FFFF"
              onClick={() => setIsModalVisible(true)}
              disabled={!isButtonEnabled}
            />
            <S.Separator theme={theme} />
          </S.ButtonContainer>
          <S.Separator theme={theme} />

          {isModalVisible && (
            <S.ModalOverlay>
              <S.ModalContent theme={theme}> {/* Passe o tema como prop */}
                <S.ModalText theme={theme}>Tem certeza que deseja deletar sua conta?</S.ModalText>
                <S.ModalButtonContainer>
                  <Button
                    text="Cancelar"
                    backgroundColor={COLORS.gray[300]}
                    textColor="#FFFF"
                    onClick={() => setIsModalVisible(false)}
                  />
                  <Button
                    text="Confirmar"
                    backgroundColor={COLORS.red[300]}
                    textColor="#FFFF"
                    onClick={handleDeleteAccount}
                  />
                  
                </S.ModalButtonContainer>
              </S.ModalContent>
            </S.ModalOverlay>
          )}
        </S.Content>
      </S.Container>
    </div>
  );
};

export default DeletePage;