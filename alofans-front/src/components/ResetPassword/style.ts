//src/components/ResetPassword/style.ts

import COLORS from "@/constants/colors";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import FONTS from "@/constants/fonts";

interface ThemeProps {
    theme: Theme;
}

export const Container = styled.div<ThemeProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
    transition: background-color 0.3s ease; /* Transição suave para o tema */
    min-height: 100vh;
    min-width: 100vw;
    justify-content: start;
    margin-top: -10px;


`;

export const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;   
    width: 100%;
    padding-inline: 20px;
`;

export const MainTopic = styled.p<ThemeProps>`
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])}; /* Texto branco no modo escuro, preto no modo claro */
    font-family: ${FONTS.montSerrat};
    font-weight: 600;
    font-size: 22px;
    transition: color 0.3s ease; /* Transição suave para o tema */
    margin-top: 20px;
    text-align: center;
`;

export const Info = styled.p<ThemeProps>`
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.black[900])}; /* Texto cinza claro no modo escuro, cinza escuro no modo claro */
    font-family: ${FONTS.montSerrat};
    font-size: 16px;
    transition: color 0.3s ease; /* Transição suave para o tema */
    margin-top: 20px;
    text-align: start;
    font-weight: 500;
`;

export const EmailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;

    gap: 10px;
    margin-top: 20px;
    
    width: 100%;
    padding-inline: 20px;
`;

export const SubTopic = styled.p<ThemeProps>`
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])}; /* Texto branco no modo escuro, preto no modo claro */
    font-size: 20px;
    transition: color 0.3s ease; /* Transição suave para o tema */
    margin-top: 40px;
    text-align: start;
    align-items: start;

`;

export const Input = styled.input<ThemeProps>`
    
    font-size: 18px;
    border-radius: 8px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])}; /* Fundo escuro ou claro */
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    border: 1px;
    padding: 6px;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
    transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave para o tema */
    text-align: start;
    width: 100%;
    

    &:focus {
        border-color: ${({ theme }) => (theme === 'dark' ? COLORS.secondary : COLORS.secondary)};
        box-shadow: 0px 0px 5px rgba(246, 151, 112, 0.5);
        outline: none;
    }
`;

export const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-top: 40px;    
    width: 100%;
    padding-inline: 20px;
`;

export const Button = styled.button<{ $isActive: boolean; theme: Theme }>`
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.primary)}; /* Cor roxa no modo escuro, roxo no modo claro */
    color: ${COLORS.white[100]};
    border-radius: 8px;
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    padding: 6px;
    opacity: ${(props) => (props.$isActive ? 1 : 0.57)};
    cursor: ${(props) => (props.$isActive ? 'pointer' : 'not-allowed')};
    pointer-events: ${(props) => (props.$isActive ? 'auto' : 'none')}; /* Desabilita o clique */
    transition: background-color 0.3s ease, opacity 0.3s ease; /* Transição suave para o tema */
    margin-top: 20px;
    text-align: center;

`;