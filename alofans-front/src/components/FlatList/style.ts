import { device } from '@/utils/sizeDevices';
import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* max-width: 80%; Largura máxima da lista */
  max-height: 80%; /* Altura máxima da lista para permitir rolagem */
  overflow-y: auto; /* Adiciona rolagem vertical */
  
  /* Oculta a barra de rolagem no Webkit (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Oculta a barra de rolagem para navegadores compatíveis com scrollbar-width */
  scrollbar-width: none; /* Firefox */
  @media ${device.mobile} {
        min-width: 90%;
      }
`;

export const ListItem = styled.div`
  margin: 5px 0; /* Espaçamento entre os itens */
  @media ${device.mobile} {
       /* width :100% ; */
      }
`;
