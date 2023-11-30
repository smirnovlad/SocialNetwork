import {createSlice} from '@reduxjs/toolkit'

const registrationDataSlice = createSlice({
    name: 'registrationData',
    initialState: {
        first_name: '',
        last_name: '',
        age: '',
        hometown: '',
        username: '',
        password: '',
        confirm_password: ''
    },
    reducers: {
        signUpFirstStep(state, action) {
            console.log('state:', state)
            console.log(action)

            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.age = action.payload.age;
            state.hometown = action.payload.hometown;
        },

        signUpSecondStep(state, action) {
            console.log('state:', state)
            console.log(action)

            state.username = action.payload.login;
            state.password = action.payload.password;
            state.confirm_password = action.payload.confirm_password;
        }
    }
})

export const {signUpFirstStep, signUpSecondStep} = registrationDataSlice.actions
export default registrationDataSlice