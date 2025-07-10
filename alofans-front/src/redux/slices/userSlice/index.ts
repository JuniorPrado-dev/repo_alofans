// src/redux/slices/clientSlice/index.ts

import { removeCookie } from '@/services/cookies';
import { createSlice } from '@reduxjs/toolkit'

const initialUser: TypeUserResponse = {
  id: "",
  email: "",
  name: "",
  role: "",
  phone: "",
  cpf_cnpj: "",
  pix_key_type:"",
  pix_key:"",
  created_at:"",
  push_token:"",
  updated_at:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialUser,
  },
  reducers: {

    login: (state, action) => {
      state.value = action.payload
    },
    logout: (state) => {
      state.value = initialUser
      try {
        removeCookie("token")
      } catch (e) {
        console.log("erro", e);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer