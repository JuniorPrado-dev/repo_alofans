// src/pages/EventsPage/EventDetailPage/style.ts

import { device } from '@/utils/sizeDevices';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
 
`;

export const MobileMode = styled.div`
  display: none; /* Mostrar no mobile */

  @media ${device.mobile} {
    display: block; /* Ocultar no desktop */
  }
`;

export const DesktopMode = styled.div`
  display: block; /* Ocultar no mobile */

  @media ${device.mobile} {
    display: none; /* Mostrar no desktop */
  }
`;