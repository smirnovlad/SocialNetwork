import FirstStepRegistrationForm from "./FirstStepRegistrationForm"
import SecondStepRegistrationForm from "./SecondStepRegistrationForm"
import {useDispatch} from "react-redux"
import {useState, useEffect} from "react"
import store from '../../../store/store'
import {register} from "../../../api/registration"


const RegistrationForm = (props) => {
    const dispatch = useDispatch()
    const onGoBackClickedFromFirst = () => {
        props.onGoBackClicked();
    }

    const onGoBackClickedFromSecond = () => {
        setForm(<FirstStepRegistrationForm onGoBackClicked={onGoBackClickedFromFirst}
                                           onGoNextClicked={onGoNextClicked} id={"FirstStepRegistrationForm"}/>);
    }

    const onSignUpClicked = () => {
        const registrationData = store.getState().registrationData
        dispatch(register(registrationData)).unwrap()
            .then((originalPromiseResult) => {
                props.onRegistrationSuccess();
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError);
            })
    }

    const onGoNextClicked = () => {
        setForm(<SecondStepRegistrationForm onGoBackClicked={onGoBackClickedFromSecond}
                                            onSignUpClicked={onSignUpClicked} id={"SecondStepRegistrationForm"}/>)
    }

    const [form, setForm] = useState(<FirstStepRegistrationForm onGoBackClicked={onGoBackClickedFromFirst}
                                                                onGoNextClicked={onGoNextClicked}
                                                                id={"FirstStepRegistrationForm"}/>)

    return (
        <div>
            {form}
        </div>
    )
}

export default RegistrationForm