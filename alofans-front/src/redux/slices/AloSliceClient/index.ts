import { createSlice } from '@reduxjs/toolkit'

const listAloClient: TypeAloResponse[] = []

export const aloSliceClient = createSlice({
  name: 'alo',
  initialState: {
    value: [...listAloClient],
  },
  reducers: {
    setListAloClient: (state, action) => {
      state.value = action.payload
    },
    removeAloClient: (state, action) => {
      // Filtra a lista para manter todos os itens, exceto o que tem o ID especificado na ação
      state.value = state.value.filter(alo => alo.id !== action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setListAloClient, removeAloClient } = aloSliceClient.actions

export default aloSliceClient.reducer