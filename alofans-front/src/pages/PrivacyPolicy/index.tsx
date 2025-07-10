import React from "react";
import styled from "styled-components";
import IMAGES from "@/assets/images";
import { device } from "@/utils/sizeDevices";

const Body = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  background-color: #f9f9f9;
  color: #333;
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
`;


const Header = styled.header`
  background-color: #bb86fc;
  color: white;
  padding: 2rem 1rem;
  text-align: center;
`;

const Logo = styled.img`
  height: 10vh;
  width: auto;
  
  @media ${device.mobile} {
    height: 10vh;
  }
`;
const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: #fff;
`;

const H1 = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const H2 = styled.h2`
  margin-top: 2rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #555be9;
  padding-bottom: 0.5rem;
  color: #333;
`;

const P = styled.p`
  margin: 0.5rem 0 1rem;
`;

const Ul = styled.ul`
  margin: 0 0 1rem 1.5rem;
`;

const A = styled.a`
  color: #555be9;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


const Footer = styled.footer`
  text-align: center;
  padding: 2rem 1rem;
  background-color: #f2f2f2;
  font-size: 0.9rem;
`;

const PrivacyPolicy: React.FC = () => (
  <Body>
    <Header>
      <Logo id="HeaderStyled.Logo" src={IMAGES.logoText} alt="Logo do App" />
      <H1>Política de Privacidade</H1>
      <P>Última atualização: 24 de Janeiro de 2025</P>
    </Header>
    <Main>
      <P>
        Esta Política de Privacidade descreve nossas políticas e procedimentos sobre a coleta, uso e divulgação de suas informações ao usar o serviço e informa sobre seus direitos de privacidade e como a lei protege você.
      </P>
      <P>
        Usamos seus dados pessoais para fornecer e melhorar o serviço. Ao utilizar o serviço, você concorda com a coleta e uso de informações de acordo com esta política.
      </P>

      <H2>Definições</H2>
      <P>Para os fins desta Política:</P>
      <Ul>
        <li><strong>Conta</strong>: conta única criada para você acessar nosso serviço.</li>
        <li><strong>Aplicativo</strong>: AlôFans, software fornecido pela empresa.</li>
        <li><strong>Empresa</strong>: AndAll, Rua do Atacado, 701 - Cidade Gerardo Cristino de Menezes, Sobral - CE, 62050-243.</li>
        <li><strong>Dados Pessoais</strong>: qualquer informação relacionada a uma pessoa identificada ou identificável.</li>
        <li><strong>Serviço</strong>: o aplicativo AlôFans.</li>
        <li><strong>Você</strong>: o indivíduo que usa o serviço, ou a entidade representada.</li>
      </Ul>

      <H2>Coleta e uso de dados</H2>
      <P>Podemos coletar os seguintes dados:</P>
      <Ul>
        <li>Nome completo</li>
        <li>Endereço de e-mail</li>
        <li>Número de telefone</li>
        <li>Endereço completo</li>
        <li>Dados de uso e navegação</li>
        <li>Fotos e mídia do dispositivo (com permissão)</li>
      </Ul>

      <H2>Uso dos Dados Pessoais</H2>
      <P>Utilizamos os dados para:</P>
      <Ul>
        <li>Fornecer e manter nosso serviço</li>
        <li>Gerenciar sua conta</li>
        <li>Realizar contratos de compra</li>
        <li>Entrar em contato com você</li>
        <li>Enviar novidades e promoções (com seu consentimento)</li>
        <li>Realizar análises de uso e melhorias</li>
      </Ul>

      <H2>Compartilhamento de Dados</H2>
      <P>Seus dados podem ser compartilhados com:</P>
      <Ul>
        <li>Prestadores de serviço</li>
        <li>Afiliadas e parceiros</li>
        <li>Outros usuários (quando você interage publicamente)</li>
        <li>Com sua autorização</li>
      </Ul>

      <H2>Retenção e Exclusão</H2>
      <P>Seus dados serão mantidos apenas pelo tempo necessário. Você pode solicitar a exclusão a qualquer momento através da conta ou por contato direto.</P>

      <H2>Transferência Internacional</H2>
      <P>Seus dados podem ser processados fora do seu estado ou país. Tomamos todas as medidas para garantir a segurança das informações.</P>

      <H2>Segurança</H2>
      <P>Adotamos práticas adequadas para proteger seus dados, mas nenhum método é 100% seguro.</P>

      <H2>Privacidade de Crianças</H2>
      <P>Não coletamos dados intencionalmente de menores de 13 anos.</P>

      <H2>Links para Terceiros</H2>
      <P>Nosso serviço pode conter links externos. Recomendamos revisar as políticas de privacidade desses sites.</P>

      <H2>Alterações nesta Política</H2>
      <P>Podemos atualizar esta Política periodicamente. Notificações serão feitas por e-mail ou em nosso site.</P>

      <H2>Contato</H2>
      <P>Se tiver dúvidas, entre em contato:</P>
      <Ul>
        <li>
          <strong>Email:</strong>{" "}
          <A href="mailto:andalloficial@gmail.com">andalloficial@gmail.com</A>
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <A href="https://alofans.com.br" target="_blank" rel="noopener noreferrer">
            https://alofans.com.br
          </A>
        </li>
      </Ul>
    </Main>
    <Footer>
      &copy; 2025 AlôFans - Todos os direitos reservados.
    </Footer>
  </Body>
);

export default PrivacyPolicy;