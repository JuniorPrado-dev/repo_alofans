// components/UserForm/style.ts
import styled from "styled-components";
import { Form } from "formik";
import { device } from "@/utils/sizeDevices";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 85%;
  margin: 0px auto; 
  padding: 50px; 
  @media ${device.mobile} {
    padding: 5px;
    max-width: 95%;
    }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  font-family: "Montserrat", sans-serif;
`;


export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  border: 2px solid white;
  box-shadow:1px 1px 20px lightgrey;
  border-radius: 15px;
  padding: 10px;
  @media ${device.mobile} {
    
  }
`

export const LabelSectionTitle = styled.p`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  font-family: "Montserrat", sans-serif;
`;

export const FormStyled = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ErrorText = styled.div`
  color: #d9534f;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-family: "Montserrat", sans-serif;
`;

export const Link = styled.span`
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  &:hover{
    cursor:pointer ;
    text-decoration: underline;
  }
`;
