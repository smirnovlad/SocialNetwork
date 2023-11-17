import BaseForm from "../../BaseForm/BaseForm"
import {useState} from "react"

const FirstStepRegistrationForm = (props) => {
    const [firstName, setFirstName] = useState(Object.keys(props.data).length ? props.data["firstName"] : "")
    const [lastName, setLastName] = useState(Object.keys(props.data).length ? props.data["lastName"] : "")
    const [age, setAge] = useState(Object.keys(props.data).length ? props.data["age"] : "")
    const [homeTown, setHomeTown] = useState(Object.keys(props.data).length ? props.data["homeTown"] : "")

    const firstStepData = [
        { text: "First name", onChange: setFirstName, type: "text", value: firstName},
        { text: "Last name", onChange: setLastName, type: "text", value: lastName},
        { text: "Age", onChange: setAge, type: "text", value: age},
        { text: "Hometown", onChange: setHomeTown, type: "text", value: homeTown},
    ]

    const onGoBackClicked = () => {
        props.onGoBackClicked()
    }

    const onGoNextClicked = () => {
        props.onGoNextClicked(
            {"firstName": firstName, "lastName": lastName, "age": age, "homeTown": homeTown}
        );
    }

    return (
        <BaseForm datas={firstStepData} buttons={{
            firstText: "Go back",
            secondText: "Go next",
            firstHandler: onGoBackClicked,
            secondHandler: onGoNextClicked
        }}/>
    )
}

export default FirstStepRegistrationForm