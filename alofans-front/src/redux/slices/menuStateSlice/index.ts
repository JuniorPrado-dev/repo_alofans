import { createSlice } from '@reduxjs/toolkit'


const menuStateSlice = {
  visible:false
}

const menuState = createSlice({
  name: 'menuState',
  initialState: {
    value: menuStateSlice
  },
  reducers: {
    changeMenuState: (state) => {
      state.value.visible = !state.value.visible
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeMenuState } = menuState.actions

export default menuState.reducer