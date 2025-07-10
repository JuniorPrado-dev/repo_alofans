import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100vh;
  padding: 16px;
  margin-top: 15%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #9362D9;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Info = styled.div`
  margin-bottom: 1.5rem;
`;

export const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;