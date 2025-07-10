export async function getToken(key: string): Promise<string | null> {
  try {
    // Recupera o valor do localStorage
    const value = localStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Erro ao recuperar token:", error);
    throw error;
  }
}

export async function saveToken(key: string, value: string): Promise<void> {
  try {
    // Salva o valor no localStorage
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Erro ao salvar token:", error);
    throw error;
  }
}

export async function setToken(key: string, value: string): Promise<void> {
  localStorage.setItem(key, value);
}


// Exporta o objeto tokenCache (opcional, caso ainda queira usá-lo em outros lugares)
export const tokenCache = { getToken, saveToken };