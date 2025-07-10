import { jwtDecode, JwtPayload } from "jwt-decode";

// Função para decodificar o token JWT
export function decodeToken<T = JwtPayload>(token: string): T | null {
    try {
      return jwtDecode<T>(token);
    } catch (error) {
      console.error("Erro ao decodificar o token JWT:", error);
      return null;
    }
  }
  
  // Função para verificar se o token é válido (não expirado)
  export function isTokenValid(token: string): boolean {
    const decoded = decodeToken<JwtPayload>(token);
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
      return decoded.exp > currentTime;
    }
    return false;
  }