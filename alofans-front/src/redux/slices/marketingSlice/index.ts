import { createSlice } from "@reduxjs/toolkit";


const marketingList: TypeMarketingResponse[] = [];


export const marketingListSlice = createSlice({
    name: "marketingList",
    initialState: {
        value: [...marketingList],
    },
    reducers: {
        setMarketingList: (state, action) => {
            state.value = action.payload;
        },
    },
})

export const { setMarketingList } = marketingListSlice.actions;

export default marketingListSlice.reducer;