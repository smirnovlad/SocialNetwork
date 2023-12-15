import {combineReducers} from 'redux'

import authorizationDataSlice from "./authorizationDataSlice"
import registrationDataSlice from './registrationDataSlice'

const rootReducer = combineReducers({
    authorizationData: authorizationDataSlice.reducer,
    registrationData: registrationDataSlice.reducer
})
export default rootReducer