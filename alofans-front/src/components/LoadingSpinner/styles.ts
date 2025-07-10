import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 66.67%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Animation = styled.div`
  animation: ${spin} 1s linear infinite;
  border-radius: 50%;
  height: 9rem;
  width: 9rem;
  border: 4px solid transparent;
  border-top-color: #9b59b6;
`;

export const Text = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: #9b59b6;
`;