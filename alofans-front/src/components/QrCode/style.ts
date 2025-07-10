import styled from "styled-components";
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import { FONTSIZES } from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";



export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1200px;
    max-height: 100%;
    background-color: ${COLORS.lightGrey};
    font-family: ${FONTS.montSerrat};
    @media ${device.mobile} {        
       width: 100%;
       max-height: 100%; 
    }  
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    @media ${device.mobile} {        
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }   
`;

export const Header = styled.p`
    font-size: ${FONTSIZES.title}px;
    font-weight: 600;
    @media ${device.mobile} {        
      font-size: 22px;
      max-width: 80%;
      padding: 20px;
      font-weight: 600;
    }
    `;

export const Body = styled.p`
    font-size: ${FONTSIZES.label}px;    
    @media ${device.mobile} {        
      font-size: 20px;
      max-width: 80%;
      padding:10px 20px;
      font-weight: 600;
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 2%;
    @media ${device.mobile} {        
    }
    `;


export const Image = styled.img`
    width: 30%;
    @media ${device.mobile} {        
        width: 80%;
    
    }
    
`;

export const CodeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;
    gap: 10px;
    margin-top: 2%;
    @media ${device.mobile} {        
        margin-top: 10px;
        max-width:100% ;
        margin-bottom: 10px;
        height: fit-content;
    }
`;

export const Code = styled.p`
    border: 1px solid ${COLORS.black};
    white-space: nowrap;       /* Garante que o texto fique em uma única linha */
    overflow: hidden;          /* Esconde o texto que ultrapassa o contêiner */
    text-overflow: ellipsis;   /* Adiciona reticências (...) ao texto que ultrapassa o contêiner */
    color: ${COLORS.black};
    background-color: ${COLORS.white};
    width: 50%;
    padding: 5px;
    border-radius: 6px;
    @media ${device.mobile} {
        border: 1px solid ${COLORS.black};
        white-space: nowrap;       /* Garante que o texto fique em uma única linha */
        overflow: scroll;          /* Esconde o texto que ultrapassa o contêiner */
        text-overflow: ellipsis;   /* Adiciona reticências (...) ao texto que ultrapassa o contêiner */
        color: ${COLORS.black};
        background-color: ${COLORS.white};
        width: 80%;
        padding: 5px;
        border-radius: 6px;
        word-wrap: break-word; /* Habilita a quebra de palavras longas */
        overflow-wrap: break-word; /* Suporte adicional para navegadores modernos */
        word-break: break-all;
    }
`;

export const Button = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: None;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`;

interface ButtonProps{
    $isDisabledd: boolean;
}
export const ButtonConfirm = styled.button<ButtonProps>`

    width: 50%;
    padding: 12px 20px;
    margin-top: 2px;
    background-color:${(props)=>props.$isDisabledd?COLORS.buttonDisableBackground: COLORS.buttonEnableBackground};
    color:${(props)=>props.$isDisabledd?COLORS.buttonDisableColor: COLORS.buttonEnableColor};
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s;
    
    &:hover {
        background-color:${(props)=>props.$isDisabledd?COLORS.buttonDisableBackground: "#357abd"};
        transform:${(props)=>props.$isDisabledd?1: 1.03};
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
    @media ${device.mobile} {
        padding: 1px 10px;
        margin-top: 0px;
        border: none;
        border-radius: 6px;
        font-size: 20px;
        transition: background-color 0.3s, transform 0.2s;
    }
    `;

export const ButtonCancel = styled.button`
    background-color: ${COLORS.red};
    color: ${COLORS.white};
    font-family: ${FONTS.montSerrat};
    font-size: ${FONTSIZES.button}px;
    min-width: 50%;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s;
    @media ${device.mobile} {
        width: 40%;
        padding: 1px 10px;
        margin-top: 0px;
        border: none;
        border-radius: 6px;
        font-size: 20px;
        transition: background-color 0.3s, transform 0.2s;
    }
`;
export const ErrorText = styled.span`
  color: ${COLORS.red};
  font-size: 15px;
  margin-bottom: 8px;
  display: block;
`;
