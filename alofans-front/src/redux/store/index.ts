import { configureStore } from '@reduxjs/toolkit'
import eventListSlice from '../slices/eventListSlice'
import eventDetailSlice from '../slices/eventDetailSlice'
import userSlice from '../slices/userSlice'
import aloSliceClient from '../slices/AloSliceClient'
import aloOfferSelectSlice from '../slices/AloOfferSelectSlice'
import aloSliceProfessional from '../slices/AloSliceProfessional'
import paymentSlice from '../slices/paymentSlice'
import locateSlice from '../slices/locateSlice'
import subAccountSlice from '../slices/subAccountSlice'
import menuStateReducer from '../slices/menuStateSlice'
import marketingListSlice from '../slices/marketingSlice'

export const store = configureStore({
  reducer: {
    menuState:menuStateReducer,
    eventList: eventListSlice,
    eventDetail:eventDetailSlice,
    user: userSlice,
    aloSliceClient: aloSliceClient,
    aloOfferSelect: aloOfferSelectSlice,
    aloSliceProfessional: aloSliceProfessional,
    payment: paymentSlice,
    local: locateSlice,
    subAccount: subAccountSlice,
    marketingList: marketingListSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;