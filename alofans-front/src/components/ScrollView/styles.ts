import styled, { css } from 'styled-components';

export const Container = styled.div<{ $showScrollbar: boolean }>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  height: 800px;
  width: 100%;
  padding-bottom: 10%;
  ${({ $showScrollbar }) =>
    $showScrollbar
      ? css`
          scrollbar-width: thin;
          scrollbar-color: #4c51bf #edf2f7;
          &::-webkit-scrollbar {
            width: 8px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #4c51bf;
          }
          &::-webkit-scrollbar-track {
            background-color: #edf2f7;
          }
        `
      : css`
          &::-webkit-scrollbar {
            display: none;
          }
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        `}
`;

export const Content = styled.div`

  font-size: 1.125rem; /* text-lg */
  padding: 1.25rem; /* p-5 */
  text-align: justify; /* text-justify */
  min-height: 150vh; /* min-h-[150vh] */
  & > * + * {
    margin-top: 1.25rem; /* space-y-5 */
  }
  height: calc(100% - 10%); /* Ajusta a altura para respeitar o padding-bottom do Container */
`;