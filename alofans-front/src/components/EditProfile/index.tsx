// src/components/EditProfile/index.tsx
import { FormFieldInput } from "@/components/FormField/FormFieldInput";
import { FormFieldSelect } from "@/components/FormField/FormFieldSelect";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { goToProfile } from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import { userUpdateProfile } from "@/services/users";
import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import Alert from "../Alert";
import { EnumPixType } from "@/enums/user";
import usePermission from "@/hooks/usePermissiion";

const EditProfile = () => {
  const user = useAppSelector(state => state.user.value);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useTheme(); // Acesse o tema atual

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>({
    title:"",
    message: "",
    buttons: []
  });

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [cpf_cnpj, setCpfCnpj] = useState(user.cpf_cnpj);
  const [pix_keyType, setpix_keyType] = useState(user.pix_key_type);
  const [pix_key, setpix_key] = useState(user.pix_key);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handlePasswordCheckChange = (text: string) => {
    setPasswordCheck(text);
  };

  const handleCpfCnpjChange = (text: string) => {
    setCpfCnpj(text);
  };

  const handlepix_keyTypeChange = (value: string) => {
    setpix_keyType(value);
  };

  const handlepix_keyChange = (text: string) => {
    setpix_key(text);
  };

  const handleSubmit = async () => {
    if (password !== passwordCheck) {
      alert("As senhas não coincidem!");
    } else if (
      name === user.name &&
      email === user.email &&
      phone === user.phone &&
      cpf_cnpj === user.cpf_cnpj &&
      pix_keyType === user.pix_key_type &&
      pix_key === user.pix_key &&
      password === ""
    ) {
      setDataModal({
        title:"Nenhum dado alterado",
        message:"Atere algum campo para atualizaçao.",
        buttons:[
          {
            text: "OK",
            onPress: () => {setAlertVisible(false) },
          },
        ],
      });
      setAlertVisible(true)
    } else {

      const body: Partial<TypeUserUpdate> = {};

      if (name !== user.name) body.name = name;
      if (email !== user.email) body.email = email;
      if (phone !== user.phone) body.phone = phone;
      if (cpf_cnpj !== user.cpf_cnpj) body.cpf_cnpj = cpf_cnpj;
      if (pix_keyType !== user.pix_key_type) body.pix_key_type = pix_keyType;
      if (pix_key !== user.pix_key) body.pix_key = pix_key;
      if (password !== "") body.password = password;
      
      const response = await userUpdateProfile(body, dispatch);
      
      if (response.status==200){
        setDataModal({
          title:"Dados atualizados!",
          message:"Seus dados foram atualizados com sucesso!.",
          buttons:[
            {
              text: "OK",
              onPress: () => {
                setAlertVisible(false) 
                goToProfile(navigate);
              },
            },
          ],
        });
        setAlertVisible(true)
      }
      
    }
  };

  return (
    <S.Container theme={theme}>
      <S.Form theme={theme}>
        <FormFieldInput
          label="Nome:"
          placeholder={name}
          onChangeText={handleNameChange}
          onBlur={() => null}
          value={name}
          theme={theme}
        />
        <FormFieldInput
          label="E-mail:"
          placeholder={email}
          onChangeText={handleEmailChange}
          onBlur={() => null}
          value={email}
          theme={theme}
        />
        <FormFieldInput
          label="Celular (WhatsApp):"
          placeholder={phone}
          onChangeText={handlePhoneChange}
          onBlur={() => null}
          value={phone}
          keyboardType="phone-pad"
          theme={theme}
        />
        <FormFieldInput
          label="Senha:"
          placeholder="Digite sua senha"
          onChangeText={handlePasswordChange}
          onBlur={() => null}
          value={password}
          secureTextEntry
          theme={theme}
        />
        <FormFieldInput
          label="Confirmação de Senha:"
          placeholder="Digite sua senha"
          onChangeText={handlePasswordCheckChange}
          onBlur={() => null}
          value={passwordCheck}
          secureTextEntry
          theme={theme}
        />
        {usePermission(user) && (
          <>
            <FormFieldInput
              label="CPF/CNPJ:"
              placeholder={cpf_cnpj ? cpf_cnpj : ""}
              onChangeText={handleCpfCnpjChange}
              onBlur={() => null}
              value={cpf_cnpj}
              theme={theme}
            />
            <p>Tipos de Chave Pix:</p>
            <FormFieldSelect
              options={[
                { id: "1", label: "CPF", value: EnumPixType.CPF },
                { id: "2", label: "CNPJ", value: EnumPixType.CNPJ },
                { id: "3", label: "E-mail", value: EnumPixType.EMAIL },
                { id: "4", label: "Telefone", value: EnumPixType.PHONE },
                { id: "5", label: "Aleatório", value: EnumPixType.RANDOM },
              ]}
              placeholder={""}
              value={pix_keyType}
              onChange={handlepix_keyTypeChange}
              onBlur={() => null}
              color={COLORS.secondary}
              theme={theme}
            />
            <FormFieldInput
              label="Chave PIX:"
              placeholder={pix_key ? pix_key : ""}
              onChangeText={handlepix_keyChange}
              onBlur={() => null}
              value={pix_key}
              theme={theme}
            />
          </>
        )}
      </S.Form>
      <S.Button
          theme={theme}
          onClick={handleSubmit}
        >
          Salvar
        </S.Button>
        <Alert
          visible={alertVisible}
          setVisible={setAlertVisible}
          buttons={dataModal.buttons}
          title={dataModal.title}
          content={dataModal.message}
        />
    </S.Container>
  );
};

export default EditProfile;