
export const formatDate = (input:string) => {
  const cleaned = input.replace(/[^0-9]/g, "");

  let formattedDate = cleaned;
  if (cleaned.length > 2) {
    formattedDate = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  if (cleaned.length > 4) {
    formattedDate = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
  }

  if (formattedDate.length > 10) {
    formattedDate = formattedDate.slice(0, 10);
  }

  return formattedDate;
};

// Função para formatar hora
export const formatTime = (input:string) => {
  const cleaned = input.replace(/[^0-9]/g, "");
  let formatted = cleaned;
  
  if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
  }
  
  if (formatted.length > 5) {
    formatted = formatted.slice(0, 5);
  }
  
  return formatted;
};

// Função para formatar valores monetários
export const formatCurrency = (input:string) => {
  // Remove todos os caracteres que não sejam números
  const cleaned = input.replace(/[^0-9]/g, "");

  // Formata o valor em reais com vírgula para centavos
  const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const formatted = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(cleaned) / 100
  );
  
  return formatted;
};

// monetario para numero
export const parseCurrency = (formattedValue:string) => {
  // Remove todos os pontos que representam milhares e substitui a vírgula decimal por um ponto
  const normalizedValue = formattedValue.replace(/\./g, '').replace(',', '.');
  
  // Converte a string resultante para um número
  const numericValue = parseFloat(normalizedValue);
  
  return numericValue;
};
///////// data
export const convertDateFormatToDB = (dateStr:string) => {
  // Divide a string de data no formato dd/mm/aaaa
  const [day, month, year] = dateStr.split('/');
  
  // Construa a nova data no formato aaaa-mm-dd
  return `${year}-${month}-${day}`;
};

export const convertToDateFormatFromDB = (dateStr?:string) => {
  if(dateStr) {
    // Divide a string de data no formato aaaa-mm-dd
    const [year, month, day] = dateStr.split('-');
    
    // Construa a nova data no formato dd/mm/aaaa
    return `${day[0]}${day[1]}/${month}/${year}`;
  }
};

// phone number
export const formatPhoneNumber = (input:string) => {
  if (!input) return "";
  
  const cleaned = input.replace(/[^0-9]/g, "");
  let formatted = cleaned;
  
  if (cleaned.length > 2) {
    formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  if (cleaned.length > 3) {
    formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)}.${cleaned.slice(3)}`;
  }
  if (cleaned.length > 7) {
    formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)}.${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  
  return formatted;
};

const diasDaSemana = [
  'Domingo', 'Segunda', 'Terça', 'Quarta',
  'Quinta', 'Sexta', 'Sábado'
];

const meses = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

/// date-time for {date, time}
export function convertDateTime(input: string) {
  // Divida a string de entrada em data e hora
  const [datePart, timePart] = input.split(' ');
  
  // Divida a parte da data em ano, mês e dia
  const [year, month, day] = datePart.split('-');
  
  // Criar objeto Date
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const diaDaSemana = diasDaSemana[date.getDay()];
  const mes = meses[parseInt(month) - 1];
  
  // Formatar a data no estilo: "Terça, 02 de junho de 2025"
  const formattedDate = `${diaDaSemana}, ${day} de ${mes} de ${year}`;
  
  // Formatar hora no estilo: "às 22:00"
  const formattedTime = `${timePart}`;
  
  // Retorne o objeto com as propriedades formatadas
  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export const formatToPercentage = (value:string) => {
  const numericValue = Number(value.replace(/\D/g, "")); // Remove qualquer coisa que não seja número
  const clampedValue = Math.min(Math.max(numericValue, 0), 100); // Garante que esteja entre 0 e 100
  return `${clampedValue}%`; // Adiciona o símbolo de porcentagem
};

// Função para converter de percentual para decimal para a API
export const percentageToDecimal = (percentage:string) => {
  const value = percentage.replace("%", "");
  const numericValue = parseFloat(value);
  return numericValue / 100;
};
// Função para formatar CPF/CNPJ
export const formatCpfCnpj = (input:string) => {
  const cleaned = input.replace(/[^0-9]/g, "");
  let formatted = cleaned;

  if (cleaned.length <= 11) {
    // Formatar como CPF: 123.456.789-00
    if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    }
    if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    }
    if (cleaned.length > 9) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
    }
  } else {
    // Formatar como CNPJ: 12.345.678/0001-00
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    }
    if (cleaned.length > 5) {
      formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
    }
    if (cleaned.length > 8) {
      formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
    }
    if (cleaned.length > 12) {
      formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
    }
  }

  return formatted;
};
// Função para formatar CPF: 123.456.789-00
export const formatCpf = (input:string) => {
  const cleaned = input.replace(/[^0-9]/g, "");
  let formatted = cleaned;

  if (cleaned.length > 3) {
    formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  }
  if (cleaned.length > 6) {
    formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  }
  if (cleaned.length > 9) {
    formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }

  return formatted;
};

// Função para formatar CNPJ: 12.345.678/0001-00
export const formatCnpj = (input:string) => {
  const cleaned = input.replace(/[^0-9]/g, "");
  let formatted = cleaned;

  if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  }
  if (cleaned.length > 5) {
    formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  }
  if (cleaned.length > 8) {
    formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
  }
  if (cleaned.length > 12) {
    formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
  }

  return formatted;
};
// Função de formatação para CPF, CNPJ, Telefone e outras chaves Pix
export const formatpix_keyByType = (pix_keyType:string, value:string) => {
  switch (pix_keyType) {
    case 'CPF':
      return formatCpf(value);
    case 'CNPJ':
      return formatCnpj(value);
    case 'Telefone':
      return formatPhoneNumber(value);
    default:
      return value; // Sem formatação para chaves aleatórias ou e-mails
  }
};
