import styled from "styled-components";
import { device } from "../../utils/sizeDevices";
import COLORS from "@/constants/colors";

export const Container = styled.header`
  width: 100%;
  height:4% ;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #070d19;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  @media ${device.mobile} {
    width: 100%;
    padding-top: 1.5vw;
    padding-bottom: 10px;
    background-color: #070d19;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Logo = styled.img`
  width: 12%;
  margin-left: 30px;
  &:hover{
    cursor: pointer;
  }
  @media ${device.mobile} {
      width:110px;
      margin:10px 0px;
  }

`;

export const Credentials = styled.div`
  margin-right: 30px;
  //background-color: aqua;
  height: 3.5vw;
  display: flex;
  align-items: center;
  width: max-content;
  @media ${device.mobile} {
      display: none;
  }
  //justify-content: space-between;
`;
export const CredentialsMobile = styled.div`
  display: none;
  @media ${device.mobile} {
      margin-right: 0;
      margin: 10px 0px;
      background-color: #070d19;
      height: 10vw;
      width: 100%;
      display: flex;
      justify-content: start;
      align-items:center;
      gap: 10px;

  }
  //justify-content: space-between;
`;

export const UserIcon = styled.img`
  height: 50px;
  @media ${device.mobile} {
    display: none;
  }
`;


export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const UserImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border:2px solid white;
  @media ${device.mobile} {
    height: 50px;
    width: 50px;
    border:1px solid white;
    border-radius: 50%;
    margin-bottom: 10PX;
    margin-right: 10px;
  }
`;

export const UserName = styled.span`
  font-weight: 500;
  font-size: 30px;
  color: white;
  font-family: 'Montserrat', sans-serif; 
  margin: 0px 30px;
  padding-left: 30px;
  border-left: 1px solid white;
  
  @media ${device.mobile} {
    font-size: 20px;
    font-weight: 500;
    color: white;
    font-family: 'Montserrat', sans-serif; 
    margin: 0px 0px;
    padding-left: 10px;
    border-left: 1px solid white;
    margin-right: 0vw;
  }
`;

interface ButtonProps{
  register?: boolean;
}

export const Button = styled.button<ButtonProps>`
  /* font-family: 'Kanit', sans-serif;
  font-family: "Urbanist", sans-serif;
  */
  font-family: 'Montserrat', sans-serif; 
  font-weight: 500;
  color: black;
  padding: 5px 15px;
  font-size: 25px;
  margin-right: 1vw;
  border: 0.15vw solid white;
  border-radius: 15px;
  background-color: white ;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    font-weight: 500;
    transform: scale(1.1);
    color: white;
    background-color: ${(props) => {
      if (props.register) {
        return "#99bd3a";
      } else {
        return "#123057";
      }
    }};
  }
  
  @media ${device.mobile} {
    /* font-family: 'Kanit', sans-serif;
    font-family: 'Montserrat', sans-serif; */
    font-family: "Urbanist", sans-serif;
    font-weight: 500;
    color: white;
    font-size: 6vw;
    width: 50%;
    border: 0.15vw solid white;
    border-radius: 2vw;
    padding:5px 0px;
    background-color: ${COLORS.darkBlue};
    &:hover {
      font-weight: 500;
      transform: scale(1.1);
      color: white;
      background-color: ${(props) => {
        if (props.register) {
          return "#99bd3a";
        } else {
          return "#123057";
        }
      }};
    }
    
  }
  `;
export const MenuButton = styled.img`
display: none;
@media ${device.mobile} {
  display: block;
  background-color: #0f1119;
  position: relative;
  color: white;
  border: none;
  width: 35px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #1a1c27;
  }
}
`;


