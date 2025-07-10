// src/pages/AdvertisePage/index.tsx
import HeaderSimple from "@/components/HeaderSimple";
import * as S from "./styles";
import { useTheme } from "@/contexts/ThemeContext";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import { sendAdvertisingProposal } from "@/services/marketing";
import { useState } from "react";
import { formatPhoneNumber } from "@/utils/formatedFunctions";

const AdvertisePage = () => {
  const { theme } = useTheme(); // Acesse o tema atual

  const [formData, setFormData] = useState<TypeNegotiateRequest>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: formatPhoneNumber(value)
      }));
    }
    else{
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Preencha todos os campos");
    }
    else{

      const request:TypeNegotiateRequest = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      }
  
  
      const response = await sendAdvertisingProposal(request)
  
  
      alert(response)
    }
  }

  return (
    <>
      <HeaderSimple />

      <S.ContainerBack id="AdvertisePage.ContainerBack" theme={theme}>
        <S.HeaderBack id="AdvertisePage.HeaderBack" theme={theme}>
          <HeaderWithBackButton />
        </S.HeaderBack>
      </S.ContainerBack>

      <S.Container id="AdvertisePage.Container" theme={theme}>
        {" "}
        {/* Passe o tema como prop */}
        <S.Header id="AdvertisePage.Header" theme={theme}>
          {" "}
          {/* Passe o tema como prop */}
          <S.Title id="AdvertisePage.Title" theme={theme}>BORA ANUNCIAR COM A GENTE?</S.Title>
          <S.ContactInfo id="AdvertisePage.ContactInfo">
            <S.Phone id="AdvertisePage.Phone" theme={theme}>(85) 9 8817-9786</S.Phone>
            <S.Email id="AdvertisePage.Email" theme={theme} href="andalloficial@gmail.com">
              andalloficial@gmail.com
            </S.Email>
          </S.ContactInfo>
        </S.Header>
        <S.FormContainer id="AdvertisePage.ContainerBack" theme={theme}>
          {" "}
          {/* Passe o tema como prop */}
          <S.FormTitle id="AdvertisePage.ContainerBack" theme={theme}>
            Entre em contato com a <strong>Alô Fans</strong> e agende um
            bate-papo sem compromisso com um de nossos consultores.
          </S.FormTitle>
          <S.Form id="AdvertisePage.ContainerBack">
            <S.InputGroup id="AdvertisePage.ContainerBack">
              <S.Label id="AdvertisePage.ContainerBack" theme={theme}>Nome</S.Label>
              <S.Input
                id="AdvertisePage.ContainerBack" 
                theme={theme} 
                type="text" 
                name="name"
                placeholder="Seu nome" 
                value={formData.name}
                onChange={handleChange}
              />
            </S.InputGroup>

            <S.InputGroup id="AdvertisePage.ContainerBack">
              <S.Label id="AdvertisePage.ContainerBack" theme={theme}>Email</S.Label>
              <S.Input
                id="AdvertisePage.ContainerBack" 
                theme={theme} 
                type="email" 
                name="email"
                placeholder="Seu email" 
                value={formData.email}
                onChange={handleChange} 
              />
            </S.InputGroup>

            <S.InputGroup id="AdvertisePage.ContainerBack">
              <S.Label id="AdvertisePage.ContainerBack" theme={theme}>Telefone</S.Label>
              <S.Input 
                id="AdvertisePage.ContainerBack"
                theme={theme} 
                type="tel"
                name="phone"
                placeholder="Seu telefone"
                value={formData.phone}
                onChange={handleChange}
                />
            </S.InputGroup>

            <S.InputGroup id="AdvertisePage.ContainerBack">
              <S.Label theme={theme}>Sua mensagem aqui</S.Label>
              <S.TextArea 
                theme={theme}
                name="message"
                placeholder="Digite sua mensagem..."  
                value={formData.message}
                onChange={handleChange}/>
            </S.InputGroup>

            <S.SubmitButton theme={theme} type="submit" onClick={handleSubmit}>
              Quero um Orçamento
            </S.SubmitButton>
          </S.Form>
        </S.FormContainer>
      </S.Container>
    </>
  );
};

export default AdvertisePage;
