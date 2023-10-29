import classes from "./MainContent.module.css"

import AuthorizationForm from "../AuthorizationForm/AuthorizationForm"
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import Image from "../Image/Image"
import logo from "../../img/logo.png"
import {useState} from "react"
import LeftPanel from "../LeftPanel/LeftPanel"
import ContentBackground from "../ContentBackground/ContentBackground"

const MainContent = () => {
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
        <div className={classes.MainContent}>
            {/*<Image data={{src: logo, width: 228, height: 228, float: "left"}} alt={"logo"}/>*/}
            {/*{form}*/}
            <LeftPanel/>
            <ContentBackground/>
        </div>
    )
}

export default MainContent