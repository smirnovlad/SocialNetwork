import BaseForm from "../../BaseForm/BaseForm"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch, ReactReduxContext} from "react-redux"
import {logIn} from "../../../store/authorizationDataSlice"
import {fetchData} from "../../../api/userData"
import {authorize} from "../../../api/authorization"

const AuthorizationForm = (props) => {
    const dispatch = useDispatch()
    const authorizationData = useSelector(state => state.authorizationData)
    const [login, setLogin] = useState(authorizationData.username)
    const [password, setPassword] = useState(authorizationData.password)

    const navigate = useNavigate();

    const data = [
        {text: "Username", onChange: setLogin, type: "text", value: login},
        {text: "Password", onChange: setPassword, type: "password", value: password},
    ]

    const updateData = () => dispatch(logIn({
        "login": login,
        "password": password
    }))

    const {status, error, token} = useSelector(state => state.authorizationData)

    const onLogInClicked = async function () {
        console.log("Log in clicked: ", {login});
        updateData();
        dispatch(authorize({login, password}, (error) => {
            console.log(error.message)
        })).unwrap()
            .then((originalPromiseResult) => {
                navigate("/profile");
            })
            .catch((rejectedValueOrSerializedError) => {
                //
            })
    }

    const onSignUpClicked = () => {
        console.log("Sign up clicked");
        updateData();
        props.onSignUpClicked();
    }

    return (
        <div>
            <BaseForm datas={data} buttons={{
                firstText: "Log in",
                secondText: "Sign up",
                firstHandler: onLogInClicked,
                secondHandler: onSignUpClicked,
            }} id={"AuthorizationForm"}/>
        </div>
    )
}

export default AuthorizationForm