import { createSlice } from '@reduxjs/toolkit'

const subAccount: TypeWallet = {
    cpf_cnpj: "",
    pix_key: "",
    balance: 0,
}

export const subAccountSlice = createSlice({
    name:'subAccount',
    initialState: {
        value: subAccount,
    },
    reducers: {
        setSubAccount:(state,action) => {
            state.value = action.payload
        },
        updateSubAccountBalance:(state,action) => {
            state.value.balance = action.payload
        }
    },
})

export const { setSubAccount, updateSubAccountBalance } = subAccountSlice.actions

export default subAccountSlice.reducer