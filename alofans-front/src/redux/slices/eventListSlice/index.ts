import { createSlice } from '@reduxjs/toolkit'
const eventList:TypeEventResponse[]=[]
export const eventListSlice = createSlice({
  name: 'eventList',
  initialState: {
    value: [...eventList],
  },
  reducers: {
    setEventList:(state,action) => {
        state.value = action.payload
    },
    deleteEventInListById:(state, action) => {
        state.value = state.value.filter(event=>event.id!==action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const {setEventList, deleteEventInListById } = eventListSlice.actions

export default eventListSlice.reducer