import React from "react";
import { Container, Section, Row, Label, Value, Total } from "./style";
import FONTS from "@/constants/fonts";
import { FaUser, FaMusic } from "react-icons/fa";

export type GanhosDetalhados = {
  name?: string;
  valorUnitario: number;
  valorTotal: number;
};

export type ResultadoDistribuicao = {
  interlocutors?: GanhosDetalhados[];
  musico: GanhosDetalhados;
  startup: GanhosDetalhados;
  openpix: GanhosDetalhados;
};

type Props = {
  resultado: ResultadoDistribuicao;
};

const FinanceSummary: React.FC<Props> = ({ resultado }) => {
  return (
    <Container>
      {resultado.interlocutors && resultado.interlocutors.length > 0 && (
        <Section>
          <h3
            style={{
              fontFamily: FONTS.montSerrat,
              fontSize: "18px",
              color: "#222",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaUser style={{ marginRight: "8px" }} /> Interlocutores:
          </h3>
          {resultado.interlocutors.map((i, index) => (
            <Row key={index}>
              <Label>{i.name ?? "Interlocutor"}:</Label>
              <Value>Valor por Alô (unit): R$ {i.valorUnitario.toFixed(2)}</Value>
              <Total>Total caso todos os alôs sejam feitos: R$ {i.valorTotal.toFixed(2)}</Total>
            </Row>
          ))}
        </Section>
      )}
      <Section>
        <h3
          style={{
            fontFamily: FONTS.montSerrat,
            fontSize: "18px",
            color: "#222",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaMusic style={{ marginRight: "8px" }} /> Artísta:
        </h3>
        <Row>
          <Value>Valor por Alô (unit): R$ {resultado.musico.valorUnitario.toFixed(2)}</Value>
          <Total>Total caso todos os alôs sejam feitos: R$ {resultado.musico.valorTotal.toFixed(2)}</Total>
        </Row>
      </Section>
      <div>
        <h3></h3>
      </div>
    </Container>
  );
};

export default FinanceSummary;
