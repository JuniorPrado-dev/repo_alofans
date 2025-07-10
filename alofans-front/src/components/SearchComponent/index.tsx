//src/components/SearchComponent/index.ts

import ICONS from "@/assets/icons";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import COLORS from "@/constants/colors";

interface Props {
  data: any[]; // Lista de objetos para filtrar
  setFilter: (item: any) => void; // Atualiza o estado do item selecionado
  bgColor?: string;
}

export default function SearchComponent({ data, setFilter, bgColor }: Props) {
  const [inputText, setInputText] = useState("");
  const { theme } = useTheme(); // Acesse o tema atual

  // Filtra os itens verificando qualquer campo do objeto
  const filteredData = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(inputText.toLowerCase())
  );

  // Atualiza o estado do item selecionado quando o filtro é alterado
  useEffect(() => {
    if (inputText.length === 0) {
      setFilter(data);
    } else {
      setFilter(filteredData);
    }
  }, [inputText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <S.Container id="SearchComponent.Container" theme={theme}>
      <S.SearchContainer
        id="SearchComponent.SearchContainer"
        style={{
          backgroundColor: bgColor ? bgColor : theme === "dark" ? COLORS.black[800] : COLORS.white[100],
          borderColor: theme === "dark" ? COLORS.white[100] : "black", // Borda branca no tema dark e preta no claro
          borderWidth: "1px", // Define a espessura da borda
          borderStyle: "solid", // Garante que a borda apareça
        }} // Cor de fundo dinâmica
        theme={theme} 
      >
        <S.SearchIcon
          id="SearchComponent.SearchIcon"
          src={theme === 'dark' ? ICONS.searchB : ICONS.searchB} 
          theme={theme} 
        />
        <S.SearchInput
          id="SearchComponent.SearchInput"
          onChange={handleInputChange}
          value={inputText}
          placeholder="Digite para buscar..."
          theme={theme} 
        />
      </S.SearchContainer>
    </S.Container>
  );
}