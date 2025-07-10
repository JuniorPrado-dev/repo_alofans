import COLORS from "@/constants/colors";
import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  margin-top: 2px;
  background-color:${COLORS.buttonEnableBackground};
  color: #fff;
  border: none;
  border-radius: 6px;
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: #357abd;
    transform: scale(1.03);
  }
  
  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #b0c4de;
    color: #e0e0e0;
    cursor: not-allowed;
    transform: none;
  }
  `;
export const Label = styled.p`
  font-size: 20px;
  font-weight: bold;
  font-size: 20px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Montserrat', sans-serif;
  appearance: none;
  `;

export const GoogleStyled = styled.img`
  height: 90%;
`;



export const LogoGoogle = styled.img`
  margin-left: 10px;
  height:30px;
`