import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import styled from "styled-components";


export const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 10px;
    background-color: ${COLORS.purple.DEFAULT};
    border: 1px solid ${COLORS.white[300]};
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Message = styled.p`
  font-size: 18px;
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    background-color: transparent;
`;


export const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 400;
    font-family: ${FONTS.montSerrat};
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: ${COLORS.white[400]};
    color: ${COLORS.black[1000]};
`;

