import { configureStore } from '@reduxjs/toolkit'
import authorizationDataSlice from "./authorizationDataSlice"
import registrationDataSlice from './registrationDataSlice'

export default configureStore({
    reducer: {
        authorizationData: authorizationDataSlice.reducer,
        registrationData: registrationDataSlice.reducer
    }
})