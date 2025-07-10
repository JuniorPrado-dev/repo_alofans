import * as S from '../ThemeToggleButton/styles';
import { useTheme } from '@/contexts/ThemeContext'; // Importe o useTheme

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme(); // Acesse o tema e a função de alternância

  return (
    <S.Button onClick={toggleTheme} theme={theme}>
      {theme === 'light' ? '🌙' : '☀️'} {/* Ícone de lua para modo escuro e sol para modo claro */}
    </S.Button>
  );
};

export default ThemeToggleButton;