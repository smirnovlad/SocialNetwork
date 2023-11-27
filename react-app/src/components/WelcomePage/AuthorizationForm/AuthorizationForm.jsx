import BaseForm from "../../BaseForm/BaseForm"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {logIn} from "../../../store/authorizationDataSlice"

const AuthorizationForm = (props) => {
    const authorizationData = useSelector(state => state.authorizationData)
    const [login, setLogin] = useState(authorizationData.username)
    const [password, setPassword] = useState(authorizationData.password)

    const navigate = useNavigate();

    const data = [
        {text: "Username", onChange: setLogin, type: "text", value: login},
        {text: "Password", onChange: setPassword, type: "password", value: password},
    ]

    const dispatch = useDispatch()
    const updateData = () => dispatch(logIn({
        "login": login,
        "password": password
    }))

    const onLogInClicked = () => {
        console.log("Log in clicked: ", {login});
        updateData();
        navigate("/profile");
    }

    const onSignUpClicked = () => {
        console.log("Sign up clicked");
        updateData();
        props.onSignUpClicked();
    }

    return (
        <BaseForm datas={data} buttons={{
            firstText: "Log in",
            secondText: "Sign up",
            firstHandler: onLogInClicked,
            secondHandler: onSignUpClicked,
        }} id={"AuthorizationForm"}/>
    )
}

export default AuthorizationForm