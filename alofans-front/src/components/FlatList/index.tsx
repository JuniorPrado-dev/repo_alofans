import * as S from './style'

// Define o tipo para os itens da lista e para a função de renderização
interface FlatListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

// Componente FlatList genérico
export default function FlatList<T>({ data, renderItem }: FlatListProps<T>) {
  return (
    <S.ListContainer>
      {data.map((item, index) => (
        <S.ListItem key={index}>
          {renderItem(item, index)}
        </S.ListItem>
      ))}
    </S.ListContainer>
  );
}