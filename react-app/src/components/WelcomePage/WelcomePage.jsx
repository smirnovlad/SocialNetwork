import classes from "./WelcomePage.module.css"

import AuthorizationForm from "./AuthorizationForm/AuthorizationForm"
import RegistrationForm from "./RegistrationForm/RegistrationForm"
import Image from "../Image/Image"
import logo from "../../img/logo.png"
import {useState} from "react"

const WelcomePage = () => {

    const setAuthorizationForm = () => {
        setForm(<AuthorizationForm onSignUpClicked={setRegistrationForm} id={"AuthorizationForm"}/>)
    }
    const setRegistrationForm = () => {
        setForm(<RegistrationForm onGoBackClicked={setAuthorizationForm} onRegistrationSuccess={setAuthorizationForm}
                                  id={"RegistrationForm"}/>)
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