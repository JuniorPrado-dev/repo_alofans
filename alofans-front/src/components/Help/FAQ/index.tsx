// src/components/Help/FAQ/index.tsx

import { useState } from "react";
import * as S from "./styles";
import ICONS from "@/assets/icons";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme


const HelpFaqs = () => {
  const [activeTab, setActiveTab] = useState("FAQ");
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const { theme } = useTheme(); // Acesse o tema atual

  const tabs = ["FAQ", "Entre em Contato"];
  const faqs = [
    {
      question: "Eu sou Cliente, Interlocutor ou Produtor?",
      answer:
        'Cliente: É a pessoa que compra o "Alô", ou seja, a mensagem que será lida, cantada, executada ou divulgada pelo Produtor.\nInterlocutor: É quem atua como intermediário nas vendas, sendo indicado ou autorizado pelo Produtor. O Interlocutor recebe um percentual sobre cada venda, configurado diretamente no aplicativo.\nProdutor: É o profissional que realiza o serviço. Pode ser um cantor, humorista, palestrante ou qualquer artista que executa a mensagem, música ou propaganda adquirida pelo Cliente.',
    },
    {
      question: "Como funciona a venda de Alôs?",
      answer:
        'O Produtor cadastra o evento no app, incluindo a quantidade de "Alôs" disponíveis para venda e seus respectivos valores. Por exemplo:\nEvento: Show de humor na cidade de Fanolândia, em 15/03/2025, na casa de shows Alô’s Fest.\nDisponibilidade: 4 Alôs, cada um custando R$ 50,00.\nOs Alôs ficam disponíveis para compra uma hora antes do início do evento e também durante o evento, em tempo real. Após a compra, o Alô será executado pelo Produtor conforme o combinado.',
    },
    {
      question:
        "Eu, como Produtor, pago algum valor para cadastrar meu evento no aplicativo?",
      answer:
        "Sim, há uma taxa simbólica de R$ 5 por Alô anunciado. Porém, se os Alôs forem vendidos, essa taxa é dispensada e o valor é reembolsado ao Produtor.",
    },
    {
      question: "O evento foi cancelado. Quais as consequências?",
      answer:
        "Para o Cliente: Caso o evento seja cancelado durante o período de venda dos Alôs, o valor pago será reembolsado. Basta entrar em contato com nossos canais de atendimento.\nPara o Produtor: O Produtor pode cancelar o evento até 24 horas antes de seu início sem penalidades. Se o cancelamento ocorrer após esse prazo, será aplicada uma multa equivalente a 20 vezes o valor de um Alô anunciado para o evento.",
    },
    {
      question:
        "Como sei que meu Alô foi lido, cantado, executado ou realizado?",
      answer:
        "Conforme descrito no Termo de Compromisso, o Produtor se compromete a gravar o momento da execução do Alô e disponibilizá-lo em plataformas acessíveis ao Cliente, como YouTube, TikTok, Instagram, Google Drive, entre outras.",
    },
    {
      question: "Qual é a forma de pagamento para a compra de Alôs?",
      answer:
        "Todas as compras de Alôs são realizadas exclusivamente via PIX, garantindo rapidez e segurança na transação.",
    },
    {
      question: "Por que eu compraria um Alô?",
      answer:
        "Os Alôs oferecem uma forma única e personalizada de interação e engajamento. Algumas razões para adquirir um Alô incluem:\nComemoração de aniversários, felicitações ou declarações de amor e amizade.\nPropaganda de produtos ou serviços para o público presente no evento.\nReceber uma mensagem personalizada de um ídolo ou artista.\nSurpreender alguém com um pedido de namoro, noivado ou casamento em um evento especial.",
    },
    {
      question: "O que acontece se o Produtor não realizar o Alô comprado?",
      answer:
        "Se o Produtor não cumprir a entrega do Alô sem justificativa válida, o Cliente terá direito ao reembolso integral e o Produtor poderá ser penalizado no aplicativo, incluindo multa e suspensão de novas vendas.",
    },
    {
      question: "O Interlocutor precisa pagar alguma taxa para atuar?",
      answer:
        "Não. O Interlocutor é remunerado com base no percentual de vendas autorizado pelo Produtor no aplicativo, sem custos adicionais para atuar.",
    },
    {
      question: "Posso comprar mais de um Alô no mesmo evento?",
      answer:
        "Sim, desde que a quantidade de Alôs disponíveis ainda não tenha sido esgotada. O Cliente pode adquirir quantos Alôs desejar e personalizá-los de acordo com suas necessidades.",
    },
    {
      question:
        "Existe um suporte para esclarecer dúvidas ou resolver problemas?",
      answer:
        "Sim. O app Alô Fans oferece um canal de atendimento exclusivo para suporte técnico, dúvidas sobre o funcionamento da plataforma e questões relacionadas às compras ou eventos cadastrados.\nEsse conjunto de perguntas e respostas foi elaborado para garantir transparência e clareza sobre o funcionamento do Alô Fans, fortalecendo a confiança de Clientes, Interlocutores e Produtores no uso do aplicativo.",
    },
  ];

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter((i) => i !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  return (
    <S.SafeArea theme={theme}> {/* Passe o tema como prop */}
      <S.ScrollView theme={theme}> {/* Passe o tema como prop */}
        <S.StickyHeader theme={theme}> {/* Passe o tema como prop */}
          <S.Subtitle theme={theme}>Como Podemos Ajudar?</S.Subtitle> {/* Passe o tema como prop */}
          <S.Tabs>
            {tabs.map((tab) => (
              <S.Tab
                key={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                theme={theme} // Passe o tema como prop
              >
                <S.TabText active={activeTab === tab} theme={theme}>
                  {tab}
                </S.TabText>
              </S.Tab>
            ))}
          </S.Tabs>
        </S.StickyHeader>

        <S.Content theme={theme}> {/* Passe o tema como prop */}
          {activeTab === "FAQ" ? (
            <>
              {faqs.map((faq, index) => (
                <S.FaqItem key={index} theme={theme}> {/* Passe o tema como prop */}
                  <S.FaqQuestion onClick={() => toggleFaq(index)} theme={theme}> {/* Passe o tema como prop */}
                    <S.QuestionText theme={theme}>{faq.question}</S.QuestionText> {/* Passe o tema como prop */}
                    <img
                      src={openFaqs.includes(index) ? ICONS.vu : ICONS.vd}
                      alt={openFaqs.includes(index) ? "Collapse" : "Expand"}
                      width={24}
                      height={24}
                    />
                  </S.FaqQuestion>
                  {openFaqs.includes(index) && (
                    <S.AnswerText theme={theme}>{faq.answer}</S.AnswerText>
                  )}
                </S.FaqItem>
              ))}
            </>
          ) : (
            <S.ContactInfo theme={theme}> {/* Passe o tema como prop */}
              <S.ContactTitle theme={theme}>E-mail:</S.ContactTitle> {/* Passe o tema como prop */}
              <S.ContactEmail theme={theme}>andalloficial@gmail.com</S.ContactEmail> {/* Passe o tema como prop */}
            </S.ContactInfo>
          )}
        </S.Content>
      </S.ScrollView>
    </S.SafeArea>
  );
};

export default HelpFaqs;