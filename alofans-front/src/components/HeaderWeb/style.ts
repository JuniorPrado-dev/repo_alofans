// servup-web/src/components/Header/index.tsx

import styled from "styled-components";
import COLORS from "@/constants/colors";

export const Container = styled.header`
  width: 20%;
  padding: 20px 0;
  background-color: ${COLORS.background}; // Fundo branco
  display: flex;
  justify-content: left;
  align-items: center;
  overflow-y: scroll;
  max-height: 100vh;
  margin-top: 8vh;
  margin-left: 2vh;
  margin-bottom: -3vh;
`;

export const Logo = styled.img`
  width: 100px;

`;