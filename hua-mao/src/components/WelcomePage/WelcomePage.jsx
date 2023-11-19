import classes from "./WelcomePage.module.css"

import AuthorizationForm from "./AuthorizationForm/AuthorizationForm"
import RegistrationForm from "./RegistrationForm/RegistrationForm"
import Image from "../Image/Image"
import logo from "../../img/logo.png"
import {useState} from "react"

const WelcomePage = () => {

    const setAuthorizationForm = () => {
        console.log("setAuthorizationForm is called");
        setForm(<AuthorizationForm onSignUpClicked={setRegistrationForm} id={"AuthorizationForm"}/>)
        console.log(form)
    }
    const setRegistrationForm = () => {
        console.log("setRegistrationForm is called");
        setForm(<RegistrationForm onGoBackClicked={setAuthorizationForm} id={"RegistrationForm"}/>)
        console.log(form)
    }

    const [form, setForm] = useState(
        <AuthorizationForm onSignUpClicked={setRegistrationForm} id={"AuthorizationForm"}/>
    )

    return (
        <div className={classes.WelcomePage}>
            <Image data={{src: logo, width: 228, height: 228, float: "left"}} alt={"logo"}/>
            {form}
        </div>
    )
}

export default WelcomePage;