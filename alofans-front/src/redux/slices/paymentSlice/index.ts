import { removeCookie } from '@/services/cookies'
import { createSlice } from '@reduxjs/toolkit'
const initialValue: TypePayment = {
  type: null,
  charge: null
}
export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    value: initialValue,
  },
  reducers: {
    cleanPayment: (state) => {
      state.value = initialValue
      removeCookie("payment")
    },
    setPayment: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPayment, cleanPayment } = paymentSlice.actions

export default paymentSlice.reducer