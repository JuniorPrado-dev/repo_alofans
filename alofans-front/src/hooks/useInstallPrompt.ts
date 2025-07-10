// src/hooks/useInstallPrompt.ts
import { useEffect, useState } from 'react';

function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Impede que o prompt apareça automaticamente
      setDeferredPrompt(e); // Armazena o evento para uso posterior
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return deferredPrompt;
}

export default useInstallPrompt;