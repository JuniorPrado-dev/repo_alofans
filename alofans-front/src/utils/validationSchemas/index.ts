import * as Yup from 'yup';

export  const validationSchemaOfferForm = Yup.object().shape({
    event_code: Yup.string().required(
      "Código fornecido pelo respoonsável do evento."
    ),
    artistic_name: Yup.string().required("Noome Artistico."),
    alo_cost: Yup.number()
      .required("Valor do Alô é obrigatório")
      .min(4, "Valor mínimo é R$ 4,00"),
    alo_quantity: Yup.number()
      .required("Quantidade é obrigatória")
      .min(1, "Mínimo 1 Alô"),
    free_sample: Yup.number(),
    start_offer: Yup.string()
      .required("Hora de início é obrigatória")
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato inválido (HH:mm)"),
    end_offer: Yup.string()
      .required("Hora de término é obrigatória")
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato inválido (HH:mm)"),
    interlocutors: Yup.array()
      .of(
        Yup.object().shape({
          percent: Yup.number()
            .required("Percentual é obrigatório")
            .min(0, "Mínimo 0%")
            .max(100, "Máximo 100%"),
        })
      )
      .test(
        "total-percent",
        "A soma dos percentuais não pode ultrapassar 100%",
        (interlocutors) => {
          if (!interlocutors) return true;
          const total = interlocutors.reduce(
            (sum, i) => sum + (i.percent || 0),
            0
          );
          return total <= 100;
        }
      ),
  });
export  const validationSchemaEditOfferForm = Yup.object().shape({
    artistic_name: Yup.string().required("Noome Artistico."),
    alo_cost: Yup.number()
      .required("Valor do Alô é obrigatório")
      .min(4, "Valor mínimo é R$ 4,00"),
    alo_quantity: Yup.number()
      .required("Quantidade é obrigatória")
      .min(1, "Mínimo 1 Alô"),
    free_sample: Yup.number(),
    start_offer: Yup.string()
      .required("Hora de início é obrigatória")
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato inválido (HH:mm)"),
    end_offer: Yup.string()
      .required("Hora de término é obrigatória")
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato inválido (HH:mm)"),
    interlocutors: Yup.array()
      .of(
        Yup.object().shape({
          percent: Yup.number()
            .required("Percentual é obrigatório")
            .min(0, "Mínimo 0%")
            .max(100, "Máximo 100%"),
        })
      )
      .test(
        "total-percent",
        "A soma dos percentuais não pode ultrapassar 100%",
        (interlocutors) => {
          if (!interlocutors) return true;
          const total = interlocutors.reduce(
            (sum, i) => sum + (i.percent || 0),
            0
          );
          return total <= 100;
        }
      ),
  });


// Funções de validação e formatação de chave Pix com base no tipo
const validatepix_keyByType = (pix_keyType: any) => {
  switch (pix_keyType[0]) {
    case 'CPF':
      return Yup.string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve ter o formato xxx.xxx.xxx-xx')
        .required('Chave Pix do tipo CPF é obrigatória');
    case 'CNPJ':
      return Yup.string()
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve ter o formato xx.xxx.xxx/xxxx-xx')
        .required('Chave Pix do tipo CNPJ é obrigatória');
    case 'E-mail':
      return Yup.string()
        .email('E-mail inválido')
        .required('Chave Pix do tipo E-mail é obrigatória');
    case 'Telefone':
      return Yup.string()
        .matches(/^\(\d{2}\) \d\.\d{4}-\d{4}$/, 'Telefone deve ter o formato (xx) xxxxx-xxxx')
        .required('Chave Pix do tipo Telefone é obrigatória');
    case 'Aleatória':
      return Yup.string()
        .length(32, 'Chave aleatória deve ter exatamente 32 caracteres')
        .required('Chave Pix do tipo Aleatória é obrigatória');
    default:
      return Yup.string()
        .required('Chave Pix é obrigatória');
  }
};

export const validationUserForm = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(10, "A senha deve ter no máximo 10 caracteres")
    .matches(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
    .matches(/[^A-Za-z0-9]/, "A senha deve conter ao menos um caractere especial"),
  checkPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
  termsAccepted: Yup.boolean()
    .oneOf([true], "Você deve aceitar os termos para continuar")
    .required("Aceitação dos termos é obrigatória"),
});


export const validationLoginForm = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória"),
});


export const validationUserUpdateForm = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  cpf_cnpj: Yup.string()
    .required("CPF/CNPJ é obrigatório")
    .matches(
      /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/,
      "CPF ou CNPJ inválido"
    ),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(10, "A senha deve ter no máximo 10 caracteres"),
  birth_date: Yup.string()
    .required("Data de nascimento é obrigatória")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato dd/mm/aaaa"),
  phone: Yup.string()
    .required("Telefone é obrigatório")
    .matches(/^\(\d{2}\)\s\d\.\d{4}-\d{4}$/, "Telefone deve estar no formato (xx) x.xxxx-xxxx"),
  house_number: Yup.string().required("Número é obrigatório"),
  street: Yup.string().required("Rua é obrigatória"),
  neighborhood: Yup.string().required("Bairro é obrigatório"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatório"),
});

export const validationOrderForm = Yup.object().shape({
  category: Yup.string().required("Selecione uma categoria."),
  subCategory: Yup.string().required("Escolha um tipo de serviço."),
  number_options: Yup.number().required("Informe a quantidade de candidatos").max(4, "O número máximo de canditatos é 4").min(1, "O número mínimo de canditatos é 1"),
  description: Yup.string().required("Descrição é obrigatório"),
  house_number: Yup.string().required("Número é obrigatório"),
  street: Yup.string().required("Rua é obrigatória"),
  neighborhood: Yup.string().required("Bairro é obrigatório"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatório"),
});

export const validationSubcategoryForm = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório."),
  parent: Yup.string().required("Selecione uma categoria."),
  coins_quantity: Yup.number().required("Informe a quantidade de moedas").min(1, "O número mínimo de moedas é 1"),
  description: Yup.string().required("Descrição é obrigatório"),
  key_words: Yup.string().required("Palavras chave é obrigatório"),
});

export const validationUpdateSubcategoryForm = Yup.object().shape({
  category: Yup.string().required("Selecione uma categoria."),
  subCategory: Yup.string().required("Escolha um tipo de serviço."),
  name: Yup.string().required("Nome é obrigatório."),
  coins_quantity: Yup.number().required("Informe a quantidade de moedas").min(1, "O número mínimo de moedas é 1"),
  description: Yup.string().required("Descrição é obrigatório"),
  key_words: Yup.string().required("Palavras chave é obrigatório"),
});

export const validationRemoveCategoryForm = Yup.object().shape({
  category: Yup.string().required("Selecione uma categoria."),
});

export const validationAddAdminForm = Yup.object().shape({
  name: Yup.string().required("Selecione uma usuário."),
});

export const validationRemoveUserForm = Yup.object().shape({
  name: Yup.string().required("Selecione uma usuário."),
});

export const validationRemoveSubcategoryForm = Yup.object().shape({
  category: Yup.string().required("Selecione uma categoria."),
  subCategory: Yup.string().required("Escolha um tipo de serviço."),
});

export const validationUpdateCategoryForm = Yup.object().shape({
  category: Yup.string().required("Selecione uma categoria."),
  name: Yup.string().required("Nome é obrigatório."),
});

export const validationQuotationForm = Yup.object().shape({
  quotation: Yup.number().required("valor obrigatório!")
    .integer("O valor deve ser um número inteiro.")
    .min(1, "O valor deve ser maior que zero."),
});

export const validationCategoryForm = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório."),
});

export const validationProfessionForm = Yup.object().shape({
  category: Yup.string().required("Selecione uma categoria."),
  subCategory: Yup.string().required("Escolha um tipo de serviço."),
});

export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

///// cadastro de eventos
//initial values
export const initialValuesEvent = {
  name: "",
  description: "",
  date: "",
  start_time: "",
  is_online: undefined as boolean | undefined,
  is_in_person: undefined as boolean | undefined,
  link: "",
  city: "",
  state: "",
  neighborhood: "",
  street: "",
  complement: "",
  address_number: "",
  file: null as File | null,
};

export const initialValuesEventTeste = {
  name: "Evento de teste",
  description: "Este é apenas um evento de teste",
  date: "10/12/2025",
  start_time: "12:00",
  alo_cost: "120,00",
  alo_quantity: "12",
  is_online: undefined,
  is_in_person: undefined,
  link: "teste.com",
  state: "",
  city: "Sobral",
  neighborhood: "",
  street: "",
  complement: "",
  address_number: "",
  has_interlocutor: false,
  interlocutor_cpf_cnpj: "",
  interlocutor_phone: "",
  interlocutor_pix_key: "",
  interlocutor_pix_keytype: "",
  interlocutor_percent: "",
  file: undefined,
}
//validations
export const validationSchemaEvents = Yup.object().shape({
  name: Yup.string()
    .required("Nome do Evento é obrigatório")
    .label("Nome do Evento"),
  description: Yup.string()
    .required("Descrição do Evento é obrigatória")
    .label("Descrição do Evento"),
  date: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de data inválido. Use dd/mm/aaaa")
    .required("Data é obrigatória")
    .label("Data"),
  start_time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido. Use HH:MM")
    .required("Hora é obrigatória"),
  is_online: Yup.boolean()
    .required("Formato é obrigatório")
    .label("Formato"),
  is_in_person: Yup.boolean()
    .required("Formato é obrigatório")
    .label("Formato"),
  link: Yup.string().when("is_online", ([is_online], schema) =>
    is_online ? Yup.string().required("Link é obrigatório para eventos online") : schema
  ).label("Link do evento online"),
  city: Yup.string()
    .required("Cidade do evento é obrigatório.")
    .label("Cidade do Evento"),
  state: Yup.string()
    .required("Estado obrigatório")
    .label("Estado do evento"),
  neighborhood: Yup.string().when("is_in_person", ([is_in_person], schema) =>
    is_in_person ? Yup.string().required("Bairro obrigatório") : schema
  ).label("Bairro do Evento"),
  street: Yup.string().when("is_in_person", ([is_in_person], schema) =>
    is_in_person ? Yup.string().required("Rua obrigatória") : schema
  ).label("Rua do Evento"),
  address_number: Yup.string().label("Número do Evento"),
  complement: Yup.string().label("Complemento"),
    file: Yup.mixed()
    .nullable()
    .test('fileType', 'Formato não suportado', (value) => {
      if (!value) return true;
      return value instanceof File && value.type.startsWith('image/');
  })
});
//cadastro de produtor
export const validationSchemaProf = Yup.object().shape({
  cpf_cnpj: Yup.string()
    .required("CPF/CNPJ é obrigatório")
    .matches(
      /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
      "Formato de CPF ou CNPJ inválido"
    )
    .label("CPF/CNPJ Completo"),
  phone: Yup.string()
    .required("Telefone é obrigatório")
    .matches(/^\(\d{2}\)\s\d\.\d{4}-\d{4}$/, "Telefone deve estar no formato (xx) x.xxxx-xxxx"),
  pix_key_type: Yup.string().required('Selecione um tipo de Chave Pix'),
  pix_key: Yup.string().when('pix_key_type', (pix_key_type, schema) => pix_key_type ? validatepix_keyByType(pix_key_type) : schema),
  termsAccepted: Yup.boolean()
    .oneOf([true], "Você deve aceitar os termos para continuar")
    .required("Aceitação dos termos é obrigatória"),
})
