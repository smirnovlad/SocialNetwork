import {combineReducers} from 'redux'

import authorizationDataSlice from "./authorizationDataSlice"
import registrationDataSlice from './registrationDataSlice'
import authorizedUserInfoSlice from "./authorizedUserInfoSlice"
import currentProfileDataSlice from "./currentProfileDataSlice"
import messagesDataSlice from "./messagesDataSlice"

const rootReducer = combineReducers({
    authorizationData: authorizationDataSlice.reducer,
    registrationData: registrationDataSlice.reducer,
    authorizedUserInfo: authorizedUserInfoSlice.reducer,
    currentProfileData: currentProfileDataSlice.reducer,
    messagesData: messagesDataSlice.reducer,
})
export default rootReducer