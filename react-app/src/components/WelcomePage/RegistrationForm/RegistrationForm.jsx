import FirstStepRegistrationForm from "./FirstStepRegistrationForm"
import SecondStepRegistrationForm from "./SecondStepRegistrationForm"
import {useState} from "react"

const RegistrationForm = (props) => {
    const onGoBackClickedFromFirst = () => {
        console.log("Go back is clicked from first");
        props.onGoBackClicked();
    }

    const onGoBackClickedFromSecond = () => {
        console.log("Go back is clicked from second");
        setForm(<FirstStepRegistrationForm onGoBackClicked={onGoBackClickedFromFirst}
                                           onGoNextClicked={onGoNextClicked} id={"FirstStepRegistrationForm"}/>);
    }

    const onSignUpClicked = () => {
        console.log("Sign up is clicked from second");
    }

    const onGoNextClicked = () => {
        console.log("Go next is clicked from first");
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