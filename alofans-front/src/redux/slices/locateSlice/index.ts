import { CITY, STATE } from '@/constants/localStorage';
import { createSlice } from '@reduxjs/toolkit'


const locate = {
    state: "CE",
    city: "SOBRAL"
}

export const locateSlice = createSlice({
    name: 'locate',
    initialState: {
        value: locate
    },
    reducers: {
        setLocate:(state,action) => {
            state.value.state = action.payload.state
            state.value.city = action.payload.city
            localStorage.setItem(STATE, action.payload.state)
            localStorage.setItem(CITY, action.payload.city)
        },
        resetLocate:(state) => {
            state.value = locate
        },
        setLocateFromStorage: (state) => {
            state.value.state = localStorage.getItem(STATE) || ""
            state.value.city = localStorage.getItem(CITY) || ""
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLocate, resetLocate, setLocateFromStorage } = locateSlice.actions

export default locateSlice.reducer

export function getLocate() {
    return {
        state: localStorage.getItem(STATE) || "",
        city: localStorage.getItem(CITY) || ""
    }
}