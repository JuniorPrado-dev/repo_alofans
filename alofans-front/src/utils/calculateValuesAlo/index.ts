type GanhosDetalhados = {
    name: string | undefined;
    valorUnitario: number;
    valorTotal: number;
  };
  
  type ResultadoDistribuicao = {
    interlocutors?: GanhosDetalhados[];
    musico: {
      valorUnitario: number;
      valorTotal: number;
    };
    startup: {
      valorUnitario: number;
      valorTotal: number;
    };
    openpix: {
      valorUnitario: number;
      valorTotal: number;
    };
  };
  
  type TypeInterlocutor = {
    name: string;
    percent: number; // entre 0 e 1
  };
  
  export default function calcularDistribuicaoFinanceira(
    interlocutors: TypeInterlocutor[] | undefined,
    aloValue: number,
    aloCount: number
  ): ResultadoDistribuicao {
    const LUCRO_STARTUP = 0.15;
    const TAXA_FIXA_OPENPIX = 1;
    function getOpenpixFee(total: number): number {
      if (total <= 62.5) return 0.5 + TAXA_FIXA_OPENPIX;
      if (total <= 625) return total * 0.008 + TAXA_FIXA_OPENPIX;
      return 5.0 + TAXA_FIXA_OPENPIX;
    }
  
    function getStartupProfit(total: number): number {
      return total * LUCRO_STARTUP;
    }
  
    function getInterlocutorProfit(total: number, percent: number): number {
      return total * percent;
    }
  
    function getProducerProfit(total: number, interlocutorPercents: number[]): number {
      const startup = getStartupProfit(total);
      const interlocutoresTotal = interlocutorPercents.reduce(
        (sum, percent) => sum + getInterlocutorProfit(total, percent),
        0
      );
      const openpix = getOpenpixFee(total);
      return total - (startup + interlocutoresTotal + openpix);
    }
  
    const startupUnit = parseFloat(getStartupProfit(aloValue).toFixed(2));
    const openpixUnit = parseFloat(getOpenpixFee(aloValue).toFixed(2));
  
    // Caso não haja interlocutores
    if (!interlocutors || interlocutors.length === 0) {
      const producerUnit = parseFloat(
        (aloValue - startupUnit - openpixUnit).toFixed(2)
      );
  
      return {
        musico: {
          valorUnitario: producerUnit,
          valorTotal: parseFloat((producerUnit * aloCount).toFixed(2)),
        },
        startup: {
          valorUnitario: startupUnit,
          valorTotal: parseFloat((startupUnit * aloCount).toFixed(2)),
        },
        openpix: {
          valorUnitario: openpixUnit,
          valorTotal: parseFloat((openpixUnit * aloCount).toFixed(2)),
        },
      };
    }
  
    // Caso haja interlocutores
    const interlocutoresResultado: GanhosDetalhados[] = interlocutors.map((i) => {
      const unit = parseFloat(getInterlocutorProfit(aloValue, i.percent).toFixed(2));
      return {
        name: i.name,
        valorUnitario: unit,
        valorTotal: parseFloat((unit * aloCount).toFixed(2)),
      };
    });
  
    const interlocutorPercents = interlocutors.map((i) => i.percent);
    const producerUnit = parseFloat(getProducerProfit(aloValue, interlocutorPercents).toFixed(2));
  
    return {
      interlocutors: interlocutoresResultado,
      musico: {
        valorUnitario: producerUnit,
        valorTotal: parseFloat((producerUnit * aloCount).toFixed(2)),
      },
      startup: {
        valorUnitario: startupUnit,
        valorTotal: parseFloat((startupUnit * aloCount).toFixed(2)),
      },
      openpix: {
        valorUnitario: openpixUnit,
        valorTotal: parseFloat((openpixUnit * aloCount).toFixed(2)),
      },
    };
  }
  