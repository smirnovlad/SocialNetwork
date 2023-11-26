import FirstStepRegistrationForm from "./FirstStepRegistrationForm"
import SecondStepRegistrationForm from "./SecondStepRegistrationForm"
import {useState} from "react"

const RegistrationForm = (props) => {
    const firstStepData = {};
    const secondStepData = {};
    const onGoBackClickedFromFirst = () => {
        console.log("Go back is clicked from first");
        props.onGoBackClicked();
    }

    const onGoBackClickedFromSecond = () => {
        console.log("Go back is clicked from second");
        setForm(<FirstStepRegistrationForm data={firstStepData} onGoBackClicked={onGoBackClickedFromFirst} onGoNextClicked={onGoNextClicked} id={"FirstStepRegistrationForm"}/>);
    }

    const onSignUpClicked = () => {
        console.log("Sign up is clicked from second");
    }

    const onGoNextClicked = (data) => {
        console.log("Go next is clicked from first");
        console.log("Data: ", data)
        for (let key in data) {
            firstStepData[key] = data[key];
        }
        setForm(<SecondStepRegistrationForm onGoBackClicked={onGoBackClickedFromSecond} onSignUpClicked={onSignUpClicked} id={"SecondStepRegistrationForm"}/>)
        console.log(firstStepData)
    }

    const [form, setForm] = useState(<FirstStepRegistrationForm data={{}} onGoBackClicked={onGoBackClickedFromFirst} onGoNextClicked={onGoNextClicked} id={"FirstStepRegistrationForm"}/>)

    return (
        <div>
            {form}
        </div>
    )
}

export default RegistrationForm