import { configureStore } from '@reduxjs/toolkit'
import authorizationDataSlice from "./authorizationDataSlice"
import registrationDataSlice from './registrationDataSlice'
import rootReducer from "./reducer"

const store = configureStore({
    reducer: rootReducer
})
export default store