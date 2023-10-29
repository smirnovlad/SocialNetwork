import classes from "../BaseForm/BaseForm.module.css"
import BaseForm from "../BaseForm/BaseForm"
import {useState} from "react"

const AuthorizationForm = (props) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const authorizationData = [
        { text: "Username", onChange: setLogin, type: "text", value: login},
        { text: "Password", onChange: setPassword, type: "password", value: password},
    ]

    const onLogInClicked = () => {
        console.log("Log in clicked: ", {login});
    }

    const onSignUpClicked = () => {
        console.log("Sign up clicked");
        props.onSignUpClicked();
    }

    return (
        <BaseForm datas={authorizationData} buttons={{
            firstText: "Log in",
            secondText: "Sign up",
            firstHandler: onLogInClicked,
            secondHandler: onSignUpClicked
        }} id={"AuthorizationForm"}/>
    )
}

export default AuthorizationForm