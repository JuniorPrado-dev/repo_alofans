import { createSlice } from '@reduxjs/toolkit'

const listAloProfessional: TypeAloResponse[] = []

export const aloSliceProfessional = createSlice({
  name: 'alo',
  initialState: {
    value: [...listAloProfessional],
  },
  reducers: {
    setListAloProfessional: (state, action) => {
      state.value = action.payload
    },
    removeAloProfessional: (state, action) => {
      // Filtra a lista para manter todos os itens, exceto o que tem o ID especificado na ação
      state.value = state.value.filter(alo => alo.id !== action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setListAloProfessional, removeAloProfessional } = aloSliceProfessional.actions

export default aloSliceProfessional.reducer