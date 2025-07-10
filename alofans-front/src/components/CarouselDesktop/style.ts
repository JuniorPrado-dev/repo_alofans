// src/components/CarouselDesktop/style.ts

import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import COLORS from "@/constants/colors";

interface DotProps {
  $active: boolean;
}

interface ArrowProps {
  theme: Theme;
}

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div`
  flex: 1;
  width: 85%;
  max-width: 1120px;
  height: auto;
  margin: 60px auto;
  position: relative;
`;

export const CarouselWrapper = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const CarouselContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px; /* Altura fixa para o carrossel */
  position: relative;
  overflow: hidden;
`;

export const Slide = styled.div`
  position: absolute;
  width: 70%; /* Largura do slide principal */
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const ArrowLeft = styled.div<ArrowProps>`
  position: absolute;
  left: -50px;
  cursor: pointer;
  z-index: 3;

  img {
    width: 25px;
    height: 25px;
  }

  &:hover {
    transform: scale(1.4); /* Aumenta o tamanho da seta ao passar o mouse */
  }

  &:active {
    opacity: 0.2; /* Reduz a opacidade ao clicar */
  }
`;

export const ArrowRight = styled.div<ArrowProps>`
  position: absolute;
  right: -50px;
  cursor: pointer;
  z-index: 3;

  img {
    width: 25px;
    height: 25px;
  }

  &:hover {
    transform: scale(1.4); /* Aumenta o tamanho da seta ao passar o mouse */
  }

  &:active {
    opacity: 0.2; /* Reduz a opacidade ao clicar */
  }
`;

export const DotsContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Dot = styled.div<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? COLORS.primary : "#ccc")};
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;