import { createSlice } from '@reduxjs/toolkit'

const eventDetailInitialState: TypeEventResponse = {
  id: "",
  name: "",
  date: "",
  description: "",
  address_number: "",
  image_path: "",
  city: "",
  state: "",
  complement: "",
  link: "",
  neighborhood: "",
  street: "",
  alo_offers: null,
  is_online: false,
  producer: null
}

export const eventDetailSlice = createSlice({
  name: 'eventDetail',
  initialState: {
    value: eventDetailInitialState,
  },
  reducers: {

    setEventDetail: (state, action) => {
      state.value = action.payload
    },
    cleanEventDetail: (state) => {
      state.value = eventDetailInitialState
    }
  },
})

// Action creators are generated for each case reducer function
export const { setEventDetail, cleanEventDetail } = eventDetailSlice.actions

export default eventDetailSlice.reducer