// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import { Formik } from "formik";
// import * as S from "./style";
// import { FormButton, FormFieldInput } from "../FormField";
// import { validationQuotationForm } from "@/utils/validationSchemas";
// import Alert from "../Alert";
// import { coinGetValue, coinSetValue } from "@/services/coins";

// const QuotationForm: React.FC = ()=> {
//   const initialValues = {
//     quotation: "",
//   };
  
//   const [isVisibleOnSubmit, setIsVisibleOnSubmit] = useState(false);
//   const [dataModal, setDataModal] = useState({
//     status: "",
//     detail: "",
//   });
  
//   const [refresh, setRefresh] = useState(false);
//   const [currentQuotation, setCurrentQuotation] = useState<number | null>(null);
  
//   useEffect(() => {
//     const getCoin = async () => {
//       const cquotation = await coinGetValue();
//       if (cquotation) {
//         setCurrentQuotation(cquotation);
//       }
//     };
//     getCoin();
//   }, [refresh]);

//   const handleSubmit = async (values: any) => {
//     const response = await coinSetValue(Number(values?.quotation));
//     if (response)
//       setIsVisibleOnSubmit(true);
//       setDataModal({
//         status: response.status,
//         detail: response.detail,
//       });
//   };

//   return (
//     <S.Container>
//       <Alert
//         visible={isVisibleOnSubmit}
//         setVisible={setIsVisibleOnSubmit}
//         title={dataModal.status}
//         content={dataModal.detail}
//         onClose={() => setRefresh(!refresh)}
//         buttons={[
//           {
//             label: "Ok",
//             onClick:
//               dataModal.status !== "error"
//                 ? () => {
//                     setIsVisibleOnSubmit(false);
//                     setRefresh(!refresh);
//                   }
//                 : () => {
//                     setIsVisibleOnSubmit(false);
//                     setRefresh(!refresh);
//                   },
//           },
//         ]}
//       />
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationQuotationForm}
//         onSubmit={handleSubmit}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           isValid,
//           errors,
//           touched
//         }) => (
//           <S.FormStyled>
//             <S.SectionContainer>
//               <S.Title>{"Atualizar Valor de Moeda 🪙 "}</S.Title>
//               <S.LabelSectionTitle>
//                 {`Valor atual: ${currentQuotation ? `${currentQuotation},00 reais` : "Não informado"}`}
//               </S.LabelSectionTitle>
//               <FormFieldInput
//                 label="Nova cotação"
//                 keyboardType="number"
//                 placeholder="Novo valor de moeda..."
//                 onChangeText={handleChange("quotation")}
//                 onBlur={handleBlur("quotation")}
//                 value={values.quotation}
//                 error={errors.quotation}
//                 touched={touched.quotation}
//               />
//             </S.SectionContainer>
//             <FormButton
//               text="Atualizar Cotação"
//               onClick={() => handleSubmit()}
//               isDisabled={!isValid}
//             />
//           </S.FormStyled>
//         )}
//       </Formik>
//     </S.Container>
//   );
// };

// export default QuotationForm;
