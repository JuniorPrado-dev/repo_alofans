import FONTS from '@/constants/fonts';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 12px;

`;

export const Title = styled.h2`
  font-family: ${FONTS.montSerrat},
  font-size: "16px",
  text-align: start;
  margin-bottom: 1.5rem;
  color: #222;
`;

export const Section = styled.div`
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 0.5rem;
    color: #444;
    font-size: 1.1rem;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.5rem 0;
`;

export const Label = styled.span`
  flex: 1 1 30%;
  font-weight: bold;
  color: #555;
`;

export const Value = styled.span`
  padding-top: 2px;
  font-family: ${FONTS.montSerrat};
  flex: 1 1 100%;
  color: #007bff;
  text-align: start;
  font-size: 14px;
`;

export const Total = styled.span`
  padding-top: 2px;
  font-family: ${FONTS.montSerrat};
  flex: 1 1 30%;
  color: #28a745;
  text-align: start;
  font-size: 14px;
`;
