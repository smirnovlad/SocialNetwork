import BaseForm from "../../BaseForm/BaseForm"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {logIn} from "../../../store/authorizationDataSlice"
import {authorize} from "../../../api/authorization"
import store from '../../../store/store'
import {fetchAuthorizedUserInfo} from "../../../api/userInfo"

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

    const {status, error} = useSelector(state => state.authorizationData)

    const onLogInClicked = async function () {
        updateData();
        // TODO: move to async/await
        dispatch(authorize({login, password}, (error) => {
            console.log(error.message)
        })).unwrap()
            .then((originalPromiseResult) => {
                let token = originalPromiseResult.auth_token
                let authorizedUserInfo = store.getState().authorizedUserInfo
                dispatch(fetchAuthorizedUserInfo(authorizedUserInfo.token))
                    .unwrap()
                    .then((promiseResult) => {
                        let currentProfileData = store.getState().currentProfileData
                        navigate(`/profile/${currentProfileData.id}`)
                    }).catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError)
                })
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
    }

    const onSignUpClicked = () => {
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