import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import * as S from "./style";
import ResetPassword from '@/components/ResetPassword';
import styled from "styled-components";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/contexts/ThemeContext";
import COLORS from "@/constants/colors";


export default function ResetPasswordPage() {

    const { theme } = useTheme();

    const Header = styled.header<{ theme: Theme }>`
        display: flex;
        justify-content: space-between; /* Alinha os itens nas extremidades */
        align-items: center; /* Centraliza verticalmente */
        width: 100%;
        margin-top: 1px;
        padding-bottom: 8px; /* Adiciona um padding para espaçamento */
        background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
        transition: background-color 0.3s ease; /* Transição suave para o tema */
  `;

    return (
        <S.Container id="ResetPasswordPage.Container" theme={theme}>

            <Header id="ResetPasswordPage.Header" theme={theme}>
                <HeaderWithBackButton />
            </Header>

            <S.MainContent id="ResetPasswordPage.MainContent">

                <ResetPassword />

            </S.MainContent>


        </S.Container>
    );
}