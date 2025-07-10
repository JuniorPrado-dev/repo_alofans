
import ScrollView from "@/components/ScrollView";
import * as S from "./styles";
import { useTheme } from "@/contexts/ThemeContext";


const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <S.Container theme={theme}>
      <ScrollView showScrollbar={false}>
        <S.Content theme={theme}>
          <S.Header theme={theme}>QUEM SOMOS</S.Header>
          <S.Text theme={theme}>
            A And All é uma startup brasileira que nasceu com o propósito de transformar a maneira como eventos, marcas e pessoas se conectam. Somos movidos pela inovação e pela busca de soluções que criem experiências marcantes e gerem resultados reais para nossos parceiros e clientes. Especializados na prestação de serviços de mensagens personalizadas, propagandas criativas e gravações em tempo real, trabalhamos para oferecer ferramentas que elevem a qualidade e o alcance de interações em shows, lives, comemorações, eventos corporativos e muito mais.
          </S.Text>
          <S.Text theme={theme}>
            Para ampliar ainda mais esse impacto, lançamos o Alô Fans, um aplicativo revolucionário que conecta clientes, produtores e interlocutores, criando um ecossistema vibrante e altamente eficaz. O Alô Fans é muito mais do que uma plataforma: é a ponte que une artistas, marcas e seus públicos, oferecendo serviços de mensagens personalizadas e gravações em tempo real para maximizar o engajamento e as oportunidades de negócios.
          </S.Text>
          <S.Text theme={theme}>
            Nosso modelo operacional foi pensado para atender às necessidades de todos os envolvidos:
          </S.Text>
          <S.SubHeader theme={theme}>Para os Clientes:</S.SubHeader>
          <S.Text theme={theme}>
            Garantimos a entrega de mensagens e interações de alta qualidade, que fortalecem a conexão emocional entre marcas ou artistas e seu público. Cada serviço oferecido pelo Alô Fans é desenvolvido com atenção aos detalhes, assegurando credibilidade, profissionalismo e impacto positivo.
          </S.Text>
          <S.SubHeader theme={theme}>Para os Interlocutores:</S.SubHeader>
          <S.Text theme={theme}>
            Fornecemos uma plataforma intuitiva e segura, onde podem explorar oportunidades de renda ao intermediar serviços. Valorizamos a parceria com profissionais que compartilham nosso compromisso com a excelência e oferecemos suporte contínuo para garantir o sucesso de suas operações.
          </S.Text>
          <S.SubHeader theme={theme}>Para os Produtores:</S.SubHeader>
          <S.Text theme={theme}>
            Criamos um ambiente confiável e transparente para a comercialização de serviços de mensagens e interações em eventos. Nossa infraestrutura digital facilita a gestão e a entrega dos serviços, contribuindo para que produtores foquem no que realmente importa: criar experiências únicas para seus clientes.
          </S.Text>
          <S.Text theme={theme}>
            Na And All, acreditamos que a comunicação não deve ser apenas funcional, mas emocionante e transformadora. Por isso, investimos em tecnologia de ponta e em uma equipe dedicada para proporcionar segurança, credibilidade e eficiência em todas as etapas de nosso trabalho.
          </S.Text>
          <S.Text theme={theme}>
            Nosso compromisso é com a excelência e a confiança. Queremos ser mais do que uma solução tecnológica; buscamos ser parceiros estratégicos no sucesso de cada cliente, interlocutor e produtor que decide caminhar conosco. Com o Alô Fans, temos orgulho de oferecer um serviço que une inovação, profissionalismo e a capacidade de transformar simples interações em momentos memoráveis.
          </S.Text>
          <S.Text theme={theme}>
            Junte-se a nós e descubra como o Alô Fans e a And All podem fazer a diferença no mundo dos eventos e da comunicação.
          </S.Text>
          <S.Text theme={theme}>
            Contamos com uma equipe talentosa e dedicada, composta por profissionais experientes e apaixonados pelo que fazem.
          </S.Text>
          <S.Separator theme={theme} />
        </S.Content>
      </ScrollView>
    </S.Container>
  );
};

export default AboutPage;

