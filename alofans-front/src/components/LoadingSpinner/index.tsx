import * as S from "./styles"

const LoadingSpinner = () => {
  return (
    <S.Container>
      <S.Animation></S.Animation>
      <S.Text>Carregando...</S.Text>
    </S.Container>
  );
};

export default LoadingSpinner;