import { configureStore } from '@reduxjs/toolkit'
import registrationDataSlice from './registrationDataSlice'

export default configureStore({
    reducer: {
        registrationData: registrationDataSlice.reducer
    }
})