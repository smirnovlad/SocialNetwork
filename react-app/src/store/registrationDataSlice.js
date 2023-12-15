import {createSlice} from '@reduxjs/toolkit'

const registrationDataSlice = createSlice({
    name: 'registrationData',
    initialState: {
        first_name: '',
        last_name: '',
        birth_date: '',
        hometown: '',
        username: '',
        password: '',
        confirm_password: ''
    },
    reducers: {
        signUpFirstStep(state, action) {

            return {
                ...state,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                birth_date: action.payload.birth_date,
                hometown: action.payload.hometown,
            }
        },

        signUpSecondStep(state, action) {
            state.username = action.payload.login;
            state.password = action.payload.password;
            state.confirm_password = action.payload.confirm_password;

            return state;
        }
    }
})

export const {signUpFirstStep, signUpSecondStep} = registrationDataSlice.actions
export default registrationDataSlice