// src/components/Footer/index.tsx

import styled from "styled-components";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/contexts/ThemeContext";
import IMAGES from "@/assets/images";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer<{ theme: Theme }>`
  display: none;

  @media (min-width: 768px) {
    background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#f0f0f0")};
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
    padding: 20px;
    border-top: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ddd")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const Logo = styled.img<{ theme: Theme }>`
  width: 70px; /* Ajuste o tamanho da logo conforme necessário */
  height: auto;
  filter: ${({ theme }) =>
    theme === "dark"
      ? "brightness(0) saturate(100%) invert(10%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(10%)" // Logo branca no modo escuro
      : "brightness(0) saturate(100%) invert(10%) sepia(0%) saturate(0%) hue-rotate(100deg) brightness(100%) contrast(80%)"}; /* Logo original no modo claro */
`;

const CompanyInfo = styled.div`
  font-size: 0.9rem;
  text-align: center;
  flex: 1; /* Ocupa o espaço central */
  margin: 0 20px; /* Espaçamento entre a logo e os ícones */
`;

const ContactInfo = styled.div<{ theme: Theme }>`
  font-size: 0.8rem;
  color: ${({ theme }) => (theme === "dark" ? "#ccc" : "#667")};
`;

const SocialIcons = styled.div<{ theme: Theme }>`
  display: flex;
  gap: 15px; /* Espaçamento entre os ícones */
  align-items: center;

  a {
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};

    &:hover {
      color: ${({ theme }) => (theme === "dark" ? "#ccc" : "#667")};
    }
  }
`;

const Footer = () => {
  const { theme } = useTheme(); // Acesse o tema atual

  return (
    <FooterContainer theme={theme}>
      <Logo
        id="HeaderStyled.Logo"
        src={IMAGES.logoText}
        alt="Logo do App"
        theme={theme}
      />
      <CompanyInfo>
        <p>AND ALL TECHNOLOGY INOVA SIMPLES (I.S.)</p>
        <p>CNPJ 55.716.493/0001-52</p>
        <p>
          Rua do Atacado, 701 Sala 2, Bairro Gerardo Cristino, Sobral-CE, CEP:
          62050-243
        </p>
        <p>andalloficial@gmail.com</p>
        <Link to={"/privacy-policy"}>política de privacidade</Link>
        <br></br>
        <Link to={"/terms"}>termos de uso</Link>
        <ContactInfo>
          <p>
            {" "}
            <i>ICETEL-bewave Internet Soluções S.A. © Copyright 2025</i>
          </p>
        </ContactInfo>
      </CompanyInfo>

      <SocialIcons theme={theme}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
