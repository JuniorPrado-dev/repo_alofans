import * as S from "./styles";
import { useEffect, useState } from 'react';
import useInstallPrompt from '@/hooks/useInstallPrompt';

function isAppInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches;
}

function InstallBanner() {
  const deferredPrompt = useInstallPrompt();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasUserDeclined = localStorage.getItem('userDeclinedInstall');
    if (deferredPrompt && !isAppInstalled() && !hasUserDeclined) {
      setShowBanner(true); // Mostra o banner apenas se o PWA não estiver instalado
    }
  }, [deferredPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
          localStorage.setItem('userDeclinedInstall', 'true'); // Armazena a preferência do usuário
        }
        setShowBanner(false);
      });
    }
  };

  if (!showBanner) return null;

  return (
    <S.Container >
      <S.Message>Deseja instalar o app para uma melhor experiência?</S.Message>
      <S.ButtonsContainer>
        <S.Button onClick={handleInstallClick}>Instalar</S.Button>
        <S.Button onClick={() => setShowBanner(false)}>Fechar</S.Button>
      </S.ButtonsContainer>
    </S.Container>
  );
}

export default InstallBanner;