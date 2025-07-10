// src/pages/ProfilePage/TermsPage/index.tsx
import ScrollView from "@/components/ScrollView";
import * as S from "./styles";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme


const TermsPage = () => {
  const { theme } = useTheme(); // Acesse o tema atual

  return (
    <S.Container theme={theme}> {/* Passe o tema como prop */}
      <ScrollView showScrollbar={false}>
        <S.Content theme={theme}> {/* Passe o tema como prop */}
          <S.Title theme={theme}> {/* Passe o tema como prop */}
            TERMOS DE USO
          </S.Title>
          <S.Text theme={theme}>
            Este documento descreve as responsabilidades e obrigações que todos os
            usuários ou empresas que optem por utilizar a plataforma ALÔFANS e
            suas soluções, como software, plugins, sites, manuais, documentos,
            relatórios, APIs e acessórios.
          </S.Text>
          <S.Text theme={theme}>
            Ao usar o ALÔFANS, leia atentamente os Termos de Uso ("Termos"). Fique
            ciente de que ao acessar ou utilizar a solução, ainda que na versão
            gratuita, você concorda em cumprir os termos. Caso não concorde, não
            utilize a plataforma.
          </S.Text>
          <S.Text theme={theme}>
            Se as condições e termos deste acordo não forem cumpridos, a ALOFANS
            tem o direito de cancelar, suspender, excluir ou desativar sua conta
            ou conteúdo enviado, temporária ou permanentemente, a seu critério.
            Isso pode ser feito sem aviso prévio e sem prejuízo das ações legais
            cabíveis.
          </S.Text>

          <S.StyledParagraph theme={theme}>
            1. Identificação da Empresa
          </S.StyledParagraph>
          <S.Text theme={theme}>
            {"Nome da Empresa:  AND ALL TECHNOLOGY INOVA SIMPLES (I.S.)"}
          </S.Text>
          <S.Text theme={theme}>{"CNPJ: 55.716.493/0001-52"}</S.Text>
          <S.Text theme={theme}>
            {
              "Endereço: Rua do Atacadão, 701, sala 2, Gerardo Cristino, Sobral - Ceará, CEP 62.050-243"
            }
          </S.Text>
          <S.Text theme={theme}>
            {"Contato: andalloficial@gmail.com "}
          </S.Text>

          <S.StyledParagraph theme={theme}>
            2. Descrição do Serviço
          </S.StyledParagraph>
          <S.Text theme={theme}>
            O aplicativo ALÔFANS oferece um serviço de intermediação de pagamentos
            para o envio de mensagens, denominadas “ALÔ”, por parte de produtores
            durante eventos específicos. O usuário seleciona o produtor, indica o
            evento disponível, a data de realização e demais detalhes, informa a
            mensagem desejada, a quantidade de veiculação e realiza o pagamento.
            Após a confirmação do pagamento, o produtor, através de seu
            interlocutor, é informado sobre a mensagem, que será veiculada
            conforme as condições do evento. Em seguida, o produtor recebe o
            pagamento pela mensagem veiculada.
          </S.Text>

          <S.StyledParagraph theme={theme}>
            3. Dos participantes e envolvidos
          </S.StyledParagraph>
          <S.Text theme={theme}>
            O ALÔFANS envolve de duas a quatro pessoas principais (usuários): o
            produtor, o cliente e o interlocutor.
          </S.Text>
          <S.Text theme={theme}>
            Cliente: é aquele que deseja enviar uma mensagem e paga por ela.
          </S.Text>
          <S.Text theme={theme}>
            Produtor: é a pessoa que irá produzir e veicular a mensagem contratada
            pelo cliente;
          </S.Text>
          <S.Text theme={theme}>
            Interlocutor: é quem faz a intermediação entre o cliente, a plataforma
            ALÔFANS e o Produtor. A participação do interlocutor não é
            obrigatória, pois poderá haver produtor que aceite pedidos de ALÔ
            diretamente dentro da plataforma.
          </S.Text>
          <S.Text theme={theme}>
            Terceiro: É aquela pessoa que a pedido do cliente, poderá ser
            referenciado na mensagem.
          </S.Text>
          <S.StyledParagraph theme={theme}>
            4. Uso da solução e responsabilidades
          </S.StyledParagraph>

          <S.StyledParagraph theme={theme}>
            Registro e acesso
          </S.StyledParagraph>
          <S.Text theme={theme}>
            Para se cadastrar no ALÔFANS, é necessário completar o processo de
            registro fornecendo informações atualizadas, completas e verdadeiras.
            A veracidade e atualização destas informações são de responsabilidade
            do usuário.
          </S.Text>
          <S.Text theme={theme}>
            Durante o cadastro, você criará uma senha de acesso, que deve ser
            mantida em sigilo e segurança, sem ser compartilhada com terceiros.
            Você é o único responsável por todas as atividades realizadas em sua
            conta. Ao se cadastrar, você concorda em notificar a ALÔFANS
            imediatamente se souber de qualquer uso não autorizado de sua conta ou
            de qualquer outra violação de segurança;
          </S.Text>
          <S.Text theme={theme}>
            O cadastro do interlocutor é realizado somente pelo produtor. O
            produtor é o único responsável pelas informações sobre o interlocutor
            e ambos são os únicos responsáveis pela elaboração e comunicação do
            “ALÔ”.
          </S.Text>

          <S.StyledParagraph theme={theme}>
            Condições de utilização
          </S.StyledParagraph>
          <S.Text theme={theme}>
            Para utilizar os serviços do ALÔFANS, você precisa nos autorizar a:
            enviar e-mails automatizados, notificações e alertas, acessar o
            navegador do seu dispositivo, compartilhar dados com o sistema
            financeiro nacional, localização e mecanismos antifraude, incluindo
            internacionais.
          </S.Text>
          <S.Text theme={theme}>
            Você também concorda em usar sempre a versão mais recente da
            plataforma e autoriza a instalação automática de melhorias,
            atualizações do sistema e de segurança. Deve estar ciente que não nos
            responsabilizamos pela conclusão da operação caso você não mantenha a
            aplicação atualizada. Qualquer usuário, cliente ou acesso via API que
            não atenda aos requisitos mínimos de segurança ou não suporte padrões
            de criptografia amplamente reconhecidos terá o acesso à plataforma
            restringido ou bloqueado.
          </S.Text>
          <S.Text theme={theme}>
            O cliente poderá inserir na plataforma dados pessoais sobre terceiros
            que serão destinatários da mensagem. Neste caso o cliente é
            responsável pelo conteúdo das informações pessoais, cabendo-lhe se
            abster ainda da prática de qualquer ato ilícito, criminoso ou
            atentatório à dignidade humana. Nem a plataforma, nem o
            operador/interlocutor terão qualquer poder sobre as informações
            pessoais de terceiros ou poderão alterar o conteúdo da mensagem.
          </S.Text>

          <S.StyledParagraph theme={theme}>
            Sites, soluções e links de terceiros
          </S.StyledParagraph>
          <S.Text theme={theme}>
            A plataforma ALÔFANS pode incluir links para sites de terceiros, sobre
            os quais não temos controle e não nos responsabilizamos pelo conteúdo.
            A presença desses links não implica aprovação ou associação. Ao
            acessar esses sites, você o faz por sua conta e risco.
          </S.Text>
          <S.Text theme={theme}>
            Nossa plataforma também pode ser usada como plugins ou integrada a
            outros sites e serviços de terceiros, sobre os quais não temos
            controle. Ao utilizar do ALÔFANS em ambientes não gerenciados por nós,
            a responsabilidade é do operador ou provedor do site. Revise as
            políticas de privacidade e termos de uso desses sites para entender
            como suas informações serão tratadas.
          </S.Text>

          <S.StyledParagraph theme={theme}>
            Contas de pagamento
          </S.StyledParagraph>
          <S.Text theme={theme}>
            Ao utilizar o ALÔFANS, sua empresa autoriza a criação de uma Conta de
            Pagamentos com nossos parceiros, que será usada para processar as
            transações na plataforma. Ao aceitar estes Termos, você permite que o
            ALÔFANS gerencie essa conta conforme as leis e regulamentos, incluindo
            as regras do Banco Central e normas antifraude.
          </S.Text>
          <S.Text theme={theme}>
            O usuário deve fornecer informações corretas e mantê-las atualizadas
            para a criação e operação desta conta. As atividades da conta seguem
            os termos do provedor de pagamentos e as leis aplicáveis. Essa conta é
            necessária para o uso da plataforma e o pagamento de taxas. Se não
            concordar com isso, não poderá usar a plataforma.
          </S.Text>
          <S.Text theme={theme}>
            Podemos suspender ou encerrar sua Conta de Pagamentos a qualquer
            momento, sem aviso prévio, se identificarmos violações destes Termos
            ou das políticas do provedor de pagamento, utilização da solução para
            fraudes, lavagem de dinheiro, financiamento ao terrorismo ou qualquer
            ato atentatório ao direito brasileiro, especialmente as garantias
            individuais e direitos sociais.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>
              Suspensão de Saldo em Circunstâncias Especiais:
            </S.Alert>
            Reembolsos, Conflitos e Mandados Judiciais
          </S.Text>
          <S.Text theme={theme}>
            O ALÔFANS preza pela segurança e integridade das transações realizadas
            em sua plataforma, cumprindo rigorosamente a legislação, especialmente
            as normas do Banco Central. Diante desse compromisso, o saldo em conta
            pode ser temporariamente suspenso em certas situações, como:
          </S.Text>
          <S.Text theme={theme}>
            • Reembolsos Especiais (MED's);
          </S.Text>
          <S.Text theme={theme}>
            • Conflitos gerados por denúncias de atividades suspeitas ou golpes;
          </S.Text>
          <S.Text theme={theme}>
            • Cumprimento de mandados judiciais ou outras obrigações legais.
          </S.Text>
          <S.Text theme={theme}>
            Essa suspensão é uma medida preventiva para proteger todas as partes
            envolvidas, assegurar o cumprimento das leis e decisões judiciais e
            garantir um ambiente de transações seguro e confiável. A suspensão
            será feita com critério e transparência, buscando sempre uma solução
            justa e eficiente.
          </S.Text>
          <S.Text theme={theme}>
            Caso seja necessário suspender o saldo, o ALÔFANS se compromete a
            notificar os usuários afetados de forma clara e ágil, explicando as
            razões da suspensão e os próximos passos para solucionar a questão.
          </S.Text>
          <S.StyledParagraph theme={theme}>
            4. Direitos e Deveres
          </S.StyledParagraph>

          <S.Text theme={theme}>
          • Ao se cadastrar ou usar a plataforma, você concorda em:
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Cumprir a Lei:</S.Alert> Não violar nenhuma
            lei ou regulamento aplicável, incluindo leis de exportação, contra
            discriminação ou de igualdade de oportunidades. Também concorda em não
            exportar materiais para países sob restrição conforme as leis de
            exportação do Brasil.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Respeitar Direitos:</S.Alert> Não infringir
            direitos de propriedade intelectual ou de privacidade, como patentes,
            direitos autorais, marcas ou segredos comerciais da plataforma, suas
            afiliadas ou terceiros.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}> • Conteúdo Apropriado:</S.Alert> Não
            publicar, transmitir ou armazenar materiais que sejam: Ilegais,
            ofensivos, difamatórios, fraudulentos, enganosos, ameaçadores,
            obscenos ou inaceitáveis. Que violem obrigações contratuais ou de
            confidencialidade. Que perturbem ou interfiram nas operações da
            plataforma, como vírus, spam ou arquivos excessivamente grandes.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Segurança:</S.Alert> Não tentar violar as
            medidas de segurança ou criptografia da plataforma, seus SDKs, APIs e
            sistemas de suporte.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Uso de Ferramentas:</S.Alert> Não usar
            dispositivos ou processos para monitorar, recuperar, pesquisar ou
            acessar dados do site ou da plataforma sem autorização prévia, como
            robôs ou "crawlers".
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Acesso Indevido:</S.Alert> Não acessar ou
            tentar acessar contas de terceiros na plataforma ou APIs.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Identidade:</S.Alert> Não se passar por
            outra pessoa ou organização.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Informações Verídicas:</S.Alert> Não
            adulterar informações em publicações ou mensagens eletrônicas, nem
            fornecer informações falsas, imprecisas ou incompletas sobre sua conta
            ou empresa.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Jogos de Azar:</S.Alert> Não operar ou
            promover jogos de azar sem autorização dos órgãos reguladores.
          </S.Text>
          <S.Text theme={theme}>
            <S.Alert theme={theme}>• Armas:</S.Alert> Não operar, vender,
            negociar ou anunciar armas de fogo, munição ou réplicas na plataforma.
            Essas atividades são estritamente proibidas e podem resultar na
            rescisão imediata da conta.
          </S.Text>

          <S.StyledParagraph theme={theme}>
            6. Propriedade Intelectual
          </S.StyledParagraph>
          <S.Text theme={theme}>
            O serviço, site, aplicativo, plugins, software, documentos e todos os
            Direitos de Propriedade Intelectual relacionados são de propriedade da
            ALÔFANS, suas controladas ou afiliadas. Todos os direitos sobre o
            software que não forem expressamente concedidos ao usuário neste termo
            permanecem reservados ao ALÔFANS e suas afiliadas, incluindo o direito
            exclusivo de propriedade.
          </S.Text>
          <S.Text theme={theme}>
            O usuário concorda em não realizar, nem permitir que terceiros
            realizem as seguintes ações:
          </S.Text>
          <S.Text theme={theme}>
            • Sublicenciar, distribuir ou usar o serviço ou software fora do
            escopo permitido por este termo;
          </S.Text>
          <S.Text theme={theme}>
            • Copiar, modificar, adaptar, traduzir, criar obras derivadas, fazer
            engenharia reversa, desmontar ou descompilar o software, ou tentar
            descobrir qualquer código fonte ou segredo comercial relacionado ao
            serviço;
          </S.Text>
          <S.Text theme={theme}>
            • Alugar, vender, ceder ou transferir de qualquer forma os direitos
            sobre o software ou serviço;
          </S.Text>
          <S.Text theme={theme}>
            • Usar ou introduzir qualquer dispositivo, software ou rotina que
            interfira ou tente interferir com a operação do serviço, plataforma ou
            software;
          </S.Text>
          <S.Text theme={theme}>
            • Usar marcas, nomes comerciais, logotipos, nomes de domínio, e outros
            sinais distintivos ou direitos autorais relacionados ao serviço sem o
            consentimento por escrito do ALÔFANS;
          </S.Text>
          <S.Text theme={theme}>
            • Registrar ou ajudar alguém a registrar qualquer marca, nome
            comercial, logotipo ou outro direito proprietário associado à ALÔFANS;
          </S.Text>
          <S.Text theme={theme}>
            • Remover, alterar ou omitir qualquer aviso de direito autoral, marcas
            ou outros direitos proprietários exibidos em qualquer item do serviço.
          </S.Text>

          <S.StyledParagraph>
            7. Limitação de Responsabilidade
          </S.StyledParagraph>
          <S.Text theme={theme}>
            O ALÔFANS não se responsabiliza por atrasos, cancelamentos ou falhas
            na veiculação das mensagens “ALÔ” causadas por terceiros ou eventos
            fora de seu controle.
          </S.Text>

          <S.StyledParagraph>
            8. Modificações nos Termos
          </S.StyledParagraph>
          <S.Text theme={theme}>
            O ALÔFANS pode modificar este Termo de Uso a qualquer momento. As
            alterações entrarão em vigor independentemente de notificação ao
            usuário, mas se compromete a informar por meio do aplicativo ou outro
            canal de comunicação.
          </S.Text>

          <S.StyledParagraph>9. Rescisão</S.StyledParagraph>
          <S.Text theme={theme}>
            O ALÔFANS pode rescindir ou suspender o acesso ao aplicativo a
            qualquer momento, sem aviso prévio, em caso de violação dos termos ou
            outras circunstâncias justificadas. Caso você queira ser excluído da
            plataforma a qualquer momento, entre em contato com o ALÔFANS.
          </S.Text>

          <S.StyledParagraph theme={theme}>
            10. Legislação Aplicável e Foro
          </S.StyledParagraph>
          <S.Text theme={theme}>
            Este Termo de Uso é regido pelas leis brasileiras. Fica eleito o foro
            da Comarca de Sobral, Estado do Ceará, para dirimir quaisquer questões
            decorrentes deste contrato.
          </S.Text>
          <S.StyledParagraph >Política de Privacidade</S.StyledParagraph>
          <S.Text theme={theme}>
            O ALÔFANS entende a importância de garantir a segurança e a
            transparência quanto ao uso dos dados pessoais dos seus usuários. Este
            documento tem como objetivo esclarecer e divulgar a política de
            utilização das informações pelo ALÔFANS. Dessa forma, você poderá
            compreender melhor quais dados são coletados e como são utilizados.
          </S.Text>
          <S.Text theme={theme}>
            É essencial que você leia atentamente as orientações abaixo antes de
            utilizar a plataforma.
          </S.Text>

          <S.StyledParagraph  theme={theme}>UTILIZAÇÃO DA PLATAFORMA</S.StyledParagraph>
          <S.Text theme={theme}>
            CADASTRO: Ao utilizar nossos
            serviços, você concorda em compartilhar dados pessoais como Nome
            Completo, E-mail, Telefone e CPF. Esses dados são fornecidos nos
            respectivos formulários de cadastro de usuário, plugins para
            plataformas de eCommerce, links de pagamento, links de cobrança, envio
            de e-mails ou mensagens de cobrança, envio de e-mails ou mensagens de
            confirmação de pagamento, envio de cobranças ou pagamentos, ou ainda
            por meio de quaisquer outros recursos disponíveis na plataforma.
            Também podem ser coletados através de carga de usuários realizada pela
            empresa contratante da plataforma.
          </S.Text>
          <S.Text theme={theme}>
            Os dados são necessários para execução dos serviços contratados. O
            ALÔFANS, suas controladas, afiliadas ou as empresas contratantes da
            plataforma não têm acesso às senhas dos usuários e não podem realizar
            qualquer ação em nome dos usuários dentro da plataforma.
          </S.Text>

          <S.StyledParagraph theme={theme} >ANONIMATO E COOKIES</S.StyledParagraph>
          <S.Text theme={theme}>
            Ao se registrar na plataforma, um 'cookie' será inserido no seu
            navegador através de softwares como o Google Analytics. Também serão
            coletadas informações como endereço IP, localização geográfica, fonte
            de referência, tipo de navegador, sistema operacional ou outros
            elementos digitais relacionados ao seu ambiente, computador ou
            dispositivo móvel. O ALÔFANS poderá ainda compartilhar com a empresa
            contratante do serviço essas informações e outras sobre o seu perfil
            de acesso e navegação. Ao utilizar a plataforma, você autoriza
            expressamente esses compartilhamentos.
          </S.Text>

          <S.StyledParagraph theme={theme} >INFORMAÇÕES COLETADAS</S.StyledParagraph>
          <S.Text theme={theme}>
            A plataforma poderá coletar as seguintes informações pessoais quando
            você utiliza nossos serviços:
          </S.Text>
          <S.Text theme={theme}>
            INFORMAÇÕES COLETADASInformações de identificação pessoal, como nome, endereço, data de
            nascimento e número de identificação.
          </S.Text>
          <S.Text theme={theme}>
          • Informações de contato, incluindo endereço de e-mail e número de
            telefone.
          </S.Text>
          <S.Text theme={theme}>
          • Informações financeiras, como histórico de transações, informações
            de contas bancárias, dados de cartões de crédito, chaves Pix.
          </S.Text>
          <S.Text theme={theme}>
          • Informações de login, como nome de usuário e senha.
          </S.Text>
          <S.Text theme={theme}>
          • Informações sobre o seu dispositivo, como endereço IP, tipo de
            navegador, sistema operacional e localização geográfica.
          </S.Text>
          <S.Text theme={theme}>
            O cliente poderá inserir na plataforma dados pessoais sobre terceiros
            que serão destinatários da mensagem. Neste caso o cliente é
            responsável pelo conteúdo das informações pessoais, cabendo-lhe se
            abster ainda da prática de qualquer ato ilícito, criminoso ou
            atentatório à dignidade humana.
          </S.Text>

          <S.StyledParagraph theme={theme} >
            PREVENÇÃO À FRAUDE, LAVAGEM DE DINHEIRO E TERRORISMO
          </S.StyledParagraph>
          <S.Text theme={theme}>
            Os dados pessoais dos usuários da plataforma, como nome, endereço de
            e-mail, localização geográfica e endereço IP, poderão ser
            compartilhados com órgãos governamentais, instituições financeiras e
            prestadores de serviços com o objetivo de prevenir, coibir, investigar
            e rastrear fraudes, lavagem de dinheiro, terrorismo, exploração do
            trabalho infantil, entre outros. O ALÔFANS, suas controladas ou
            afiliadas poderão fornecer a esses parceiros ou prestadores de
            serviços informações sobre o alcance e a eficácia das atividades
            desenvolvidas e das ferramentas utilizadas. Esses dados também poderão
            ser compartilhados com bureaus de crédito, mecanismos antifraude,
            sistemas de prevenção à lavagem de dinheiro, prevenção ao terrorismo,
            incluindo organismos internacionais.
          </S.Text>

          <S.StyledParagraph theme={theme} >TITULARIDADE DOS DADOS</S.StyledParagraph>
          <S.Text theme={theme}>
            Os dados gerados ou armazenados na plataforma, como relatórios, dados
            sobre cobranças, transações, clientes, pagamentos, estornos e
            reembolsos, pertencem exclusivamente à empresa contratante do serviço,
            sendo sua responsabilidade gerenciar, processar e dar o destino final
            às informações confidenciais.
          </S.Text>

          <S.StyledParagraph theme={theme} >SOLICITAÇÕES JUDICIAIS E FRAUDES</S.StyledParagraph>
          <S.Text theme={theme}>
            O ALÔFANS poderá acessar, reter e compartilhar as informações dos
            usuários em resposta a uma solicitação judicial (tais como, mas não
            limitados a: mandado de busca, ordem judicial ou intimação), o que
            pode incluir respostas a solicitações judiciais de diferentes países.
            Também será possível acessar, reter e compartilhar informações
            necessárias para detectar, impedir, bloquear, rastrear e tratar
            fraudes ou quaisquer outras atividades ilegais.
          </S.Text>

          <S.StyledParagraph theme={theme} >FORMULÁRIO PARA CONTATO NO SITE</S.StyledParagraph>
          <S.Text theme={theme}>
            São coletadas informações de identificação pessoal no site do ALÔFANS
            por meio do preenchimento do formulário de interesse na plataforma ou
            solicitação de um teste gratuito da plataforma. As informações dos
            contatos já realizados pelo site serão armazenadas.
          </S.Text>

          <S.StyledParagraph theme={theme} >MUDANÇAS NA POLÍTICA DE PRIVACIDADE</S.StyledParagraph>
          <S.Text theme={theme}>
            Esta Política de Privacidade pode ser atualizada periodicamente.
            Recomendamos que você visite esta página regularmente para estar
            ciente de quaisquer modificações. O uso contínuo da plataforma implica
            na aceitação das novas versões desta política.
          </S.Text>

          <S.StyledParagraph theme={theme} >LEI APLICÁVEL</S.StyledParagraph>
          <S.Text theme={theme}>
            Este documento é regido e deve ser interpretado de acordo com a
            legislação da República Federativa do Brasil, especialmente
            considerando a Lei Geral de Proteção de Dados Pessoais (LGPD) e
            regulamentos do Banco Central do Brasil (BACEN).
          </S.Text>

          <S.StyledParagraph theme={theme} >
            COMO CONTATAR A ALÔFANS SOBRE O TRATAMENTO DOS DADOS PESSOAIS
          </S.StyledParagraph>
          <S.Text theme={theme}>
            Havendo dúvidas acerca da nossa Política de Privacidade ou caso
            entenda que seus dados estejam sendo tratados em desconformidade com a
            LGPD, basta contatar nosso Encarregado de Tratamento de Dados Breno
            Jessen Bezerra através do e-mail andalloficial@gmail.com.
          </S.Text>

          <S.Text theme={theme}>
            A aceitação da nossa Política de Privacidade será feita quando você se
            cadastrar na nossa plataforma para usufruir dos nossos serviços, mesmo
            que de forma gratuita.
          </S.Text>
          <S.Separator theme={theme} />
        </S.Content>
        
      </ScrollView>
    </S.Container>
  );
}

export default TermsPage;