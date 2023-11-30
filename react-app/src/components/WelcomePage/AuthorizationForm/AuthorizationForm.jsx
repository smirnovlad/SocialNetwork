import BaseForm from "../../BaseForm/BaseForm"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {logIn} from "../../../store/authorizationDataSlice"
import {fetchData} from "../../../store/authorizationDataSlice"

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

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch]);

    useEffect(() => {
       setLogin(authorizationData.username)
    },[authorizationData])

    const {status, error} = useSelector(state => state.authorizationData)

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
        <div>
            <BaseForm datas={data} buttons={{
                firstText: "Log in",
                secondText: "Sign up",
                firstHandler: onLogInClicked,
                secondHandler: onSignUpClicked,
            }} id={"AuthorizationForm"}/>
            {status == 'failed' && <h2>Error data</h2>}
        </div>
    )
}

export default AuthorizationForm