import useInstallPrompt from '@/hooks/useInstallPrompt';


function InstallButton() {

  const deferredPrompt = useInstallPrompt();

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Mostra o prompt de instalação
      deferredPrompt.prompt();

      // Aguarda a resposta do usuário
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }
      });
    }
  };

  return (
    <button onClick={handleInstallClick} disabled={!deferredPrompt}>
      Instalar App
    </button>
  );
}

export default InstallButton;