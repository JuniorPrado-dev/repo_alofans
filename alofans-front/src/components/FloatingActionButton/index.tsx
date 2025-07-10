import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import COLORS from "@/constants/colors";
import { device } from "@/utils/sizeDevices";


const FloatingButton = styled.button`
  position: fixed;
  bottom: 12vh;
  right: 100px;
  width: 80px;
  height: 80px;
  background-color: ${COLORS.purple.DEFAULT};
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.purple[500]};
    transform: scale(1.1);
  }

  @media ${device.mobile} {
    position: fixed;
    bottom: 14vh;
    right: 20px;
    width: 70px;
    height: 70px;
    background-color: ${COLORS.purple.DEFAULT};
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
      background-color: ${COLORS.purple[500]};
      transform: scale(1.1);
    }
  }
`;

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <FloatingButton onClick={onClick}>
      <FiPlus size={35} />
    </FloatingButton>
  );
};

export default FloatingActionButton;
