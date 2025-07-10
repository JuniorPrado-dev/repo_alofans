// src/@types/global.d.ts
declare global {  
  interface TypeUserForm {
    name: string,
    email: string,
    password: string,
    checkPassword: string,
    phone: string,
    termsAccepted: boolean,
  }
  interface TypeUserRequest {
    name: string,
    phone: string,
    email: string,
    password: string,
    google_id?: string,
  }
  
  interface TypePromoteToProfessionalRequest {
    phone: string,
    cpf_cnpj: string,
    pix_key_type: string,
    pix_key: string,
    push_token: string,
  }
  interface TypeLoginRequest {
    email?: string,
    password?: string,
    google_id?: string,
    name?: string,
    image_path?: string
  }
  interface TypeDataGoogleUser {
    sub?: string,
    google_id?: string,
    email?: string,
    name?: string,
    picture?: string
  }
  interface TypeUserResponse {
    name: string,
    phone: string,
    email: string,
    id: string,
    role: string,
    cpf_cnpj?: string,
    pix_key_type?: string,
    pix_key?: string,
    push_token?: string,
    created_at: string,
    updated_at: string,
  }

  interface TypeTokenResponse {
    access_token: string,
    token_type: string,
    user: TypeUserResponse
  }

  interface TypeUserUpdate{
    name?: string,
    phone?: string,
    email?: string,
    password?: string,
    push_token?: string,
    cpf_cnpj?: string,
    pix_key_type?: string,
    pix_key?: string,
  }


  // tudo que tem a baixo já estava aqui, então vou comentar e eu não me responsabilizo ATT: Mauricio


  // export interface TypeUserForm {
  //   name: string;
  //   email: string;
  //   password: string;
  //   checkPassword: string;
  //   phone: string;
  //   termsAccepted: boolean;
  // }

  // interface TypeUserLoginRequest {
  //   google_id?: string,
  //   email?: string,
  //   password?: string
  //   image_path?: string
  // }
  // interface TypeUserAddress {
  //   house_number: string,
  //   street: string,
  //   neighborhood: string,
  //   city: string,
  //   state: string,
  // }
  // interface TypeUserContact {
  //   email: string,
  //   phone: string,
  //   phone_optional: string,
  //   whatsApp: string,
  // }
  // interface TypeProfessionalInfo {
  //   professions: list[TypeCategoryResponse],
  //   finished_jobs: number,
  //   wallet: int
  // }
  // interface TypeUser {
  //   id: string,
  //   name: string,
  //   phone: string,
  //   email: string,
  //   role: string,
  //   cpf_cnpj?: string,
  //   pix_key_type?: string,
  //   pix_key?: string,
  //   pushToken?: string,
  // }

  // interface TypeUserUpdateRequest {
  //   google_id?: string,
  //   name?: string,
  //   email?: string,
  //   phone?: string,
  //   password?: string,
  //   role?: string,
  //   cpf_cnpj?: string,
  //   pix_key_type?: string,
  //   pix_key?: string,
  //   pushToken?: string,

  // }
  // interface TypeUserGoogleAuthResponse {
  //   sub: string
  //   name: string
  //   given_name: string
  //   family_name: string
  //   picture: string
  //   email: string
  //   email_verified: boolean
  // }
}

// Para evitar que o TypeScript considere este arquivo como um módulo,
// você pode exportar algo vazio.
export { };
