import {createSlice} from '@reduxjs/toolkit'

const authorizationDataSlice = createSlice({
    name: 'authorizationData',
    initialState: {
        username: '',
        password: ''
    },
    reducers: {
        logIn(state, action) {
            state.username = action.payload.login;
            state.password = action.payload.password;
        }
    }
})

export const {logIn} = authorizationDataSlice.actions
export default authorizationDataSlice