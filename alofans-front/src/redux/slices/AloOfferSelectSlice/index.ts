import { createSlice } from '@reduxjs/toolkit'

const aloOfferState: TypeAloOfferResponse = {
  id:"",
  alo_cost:0,
  alo_quantity:0,
  alos_available:0,
  free_sample_available:0,
  artist:{
    id:"",
    name:""
  },
  start_offer:"",
  end_offer:"",
  free_sample:0,
  interlocutors: null
}

export const aloOfferSelect = createSlice({
  name: 'alo',
  initialState: {
    value: aloOfferState,
  },
  reducers: {
    setAloOfferSelect: (state, action) => {
      state.value = action.payload
    },
    clearOfferSelect: (state) => {
      state.value = aloOfferState
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAloOfferSelect, clearOfferSelect } = aloOfferSelect.actions

export default aloOfferSelect.reducer