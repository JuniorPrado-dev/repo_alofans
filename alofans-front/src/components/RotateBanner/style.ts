// src/components/RotateBanner/style.ts

import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import COLORS from '@/constants/colors';

// To accept props
interface ContainerProps {
  $op?: number;
  theme: Theme; // Adicione o tema como prop
}

export const Container = styled.div<ContainerProps>`
    position: static;
    z-index: 1;
    opacity: ${(props) => props.$op};
    width: 100%;
    height: fit-content;
    transition-duration: 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
    margin-top: 0;

    @media (min-width: 768px) {
      display: "none";
    }
`;

export const ContainerBanner = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 150px;

    @media (min-width: 768px) {
      display: "none";
    }
`;

// To accept props
interface InternalContainerBannerProps {
  $p?: number;
}

export const InternalContainerBanner = styled.div<InternalContainerBannerProps>`
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0 auto;
    transition-duration: 2s;
    position: relative;
    left: ${(props) => props.$p}vw;

    @media (min-width: 768px) {
      display: "none";
    }
  
`;

export const ImageB = styled.img`
    display: flex;
    min-width: 100vw;
    height: 240px;
    transition-duration: 0.4s;
    padding-inline: 10vw;
    height: 150px;
    padding-inline: 4vw;
  
    @media (min-width: 768px) {
      display: "none";
    }
`;

export const ContSeta = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    height: 33vw;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    justify-items: center;
    height: 25vw;

    @media (min-width: 768px) {
      display: "none";
    }
`;

// To accept props
interface ImageSetaProps {
  $left?: number;
  $top?: number;
  $right?: number;
  theme: Theme; // Adicione o tema como prop
}

export const ImageSeta = styled.img<ImageSetaProps>`
    display: flex;
    height: 6vw;
    margin-left: ${(props) => props.$left}vw;
    margin-right: ${(props) => props.$right}vw;

    &:hover {
      height: 4.5vw;
      cursor: pointer;
    }
    &:active {
      height: 3.8vw;
    }
  
    @media (min-width: 768px) {
      display: "none";
    }
`;