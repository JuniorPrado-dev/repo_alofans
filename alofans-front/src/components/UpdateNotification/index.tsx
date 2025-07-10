import { useEffect, useState } from 'react';
import * as S from './styles';

function UpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true); // Nova versão disponível
      });
    }
  }, []);

  const handleReload = () => {
    window.location.reload(); // Recarrega a página para aplicar a atualização
  };

  if (!updateAvailable) return null;

  return (
    <S.Container>
      <S.Message>Uma nova versão está disponível!</S.Message>
      <S.Button onClick={handleReload}>Recarregar</S.Button>
    </S.Container>
  );
}

export default UpdateNotification;