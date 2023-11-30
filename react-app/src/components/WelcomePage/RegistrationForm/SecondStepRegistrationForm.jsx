import BaseForm from "../../BaseForm/BaseForm"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {signUpSecondStep} from "../../../store/registrationDataSlice"

const SecondStepRegistrationForm = (props) => {
    const registrationData = useSelector(state => state.registrationData)
    const [login, setLogin] = useState(registrationData.username)
    const [password, setPassword] = useState(registrationData.password)
    const [confirmPassword, setConfirmPassword] = useState(registrationData.confirm_password)

    const data = [
        {text: "Username", onChange: setLogin, type: "text", value: login},
        {text: "Password", onChange: setPassword, type: "password", value: password},
        {text: "Confirm password", onChange: setConfirmPassword, type: "password", value: confirmPassword},
    ]

    const dispatch = useDispatch()
    const updateData = () => dispatch(signUpSecondStep({
        "login": login,
        "password": password,
        "confirm_password": confirmPassword
    }))

    const onGoBackClicked = () => {
        updateData();
        props.onGoBackClicked();
    }

    const onSignUpClicked = () => {
        updateData();
    }

    return (
        <BaseForm datas={data} buttons={{
            firstText: "Go back",
            secondText: "Sign up",
            firstHandler: onGoBackClicked,
            secondHandler: onSignUpClicked
        }}/>
    )
}

export default SecondStepRegistrationForm