import BaseForm from "../../BaseForm/BaseForm"
import {useState} from "react"

const SecondStepRegistrationForm = (props) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const SecondStepData = [
        { text: "Username", onChange: setLogin, type: "text", value: login},
        { text: "Password", onChange: setPassword, type: "password", value: password},
        { text: "Confirm password", onChange: setConfirmPassword, type: "password", value: confirmPassword},
    ]

    const onGoBackClicked = () => {
        props.onGoBackClicked();
    }

    const onSignUpClicked = () => {

    }

    return (
        <BaseForm datas={SecondStepData} buttons={{
            firstText: "Go back",
            secondText: "Sign up",
            firstHandler: onGoBackClicked,
            secondHandler: onSignUpClicked
        }}/>
    )
}

export default SecondStepRegistrationForm