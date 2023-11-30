import BaseForm from "../../BaseForm/BaseForm"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {signUpFirstStep} from "../../../store/registrationDataSlice"

const FirstStepRegistrationForm = (props) => {
    const registrationData = useSelector(state => state.registrationData)
    const [firstName, setFirstName] = useState(registrationData.first_name)
    const [lastName, setLastName] = useState(registrationData.last_name)
    const [age, setAge] = useState(registrationData.age)
    const [homeTown, setHomeTown] = useState(registrationData.hometown)

    const data = [
        {text: "First name", onChange: setFirstName, type: "text", value: firstName},
        {text: "Last name", onChange: setLastName, type: "text", value: lastName},
        {text: "Age", onChange: setAge, type: "text", value: age},
        {text: "Hometown", onChange: setHomeTown, type: "text", value: homeTown},
    ]

    const dispatch = useDispatch()
    const updateData = () => dispatch(signUpFirstStep({
        "first_name": firstName,
        "last_name": lastName,
        "age": age,
        "hometown": homeTown
    }))

    const onGoBackClicked = () => {
        updateData();
        props.onGoBackClicked();
    }

    const onGoNextClicked = () => {
        updateData();
        props.onGoNextClicked();
    }

    return (
        <BaseForm datas={data} buttons={{
            firstText: "Go back",
            secondText: "Go next",
            firstHandler: onGoBackClicked,
            secondHandler: onGoNextClicked
        }}/>
    )
}

export default FirstStepRegistrationForm