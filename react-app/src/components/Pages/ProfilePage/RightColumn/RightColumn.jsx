import classes from "./RightColumn.module.css"
import {Text} from 'react-native'
import {useSelector} from "react-redux"
import store from '../../../../store/store'
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"

const RightColumn = ({...data}) => {
    const [firstName, setFirstName] = useState(data.data.first_name)
    const [lastName, setLastName] = useState(data.data.last_name)
    const [hometown, setHometown] = useState(data.data.hometown)
    const [birthDate, setBirthDate] = useState(data.data.birth_date)

    const params = useParams();

    useEffect(() => {
        setFirstName(data.data.first_name)
        setLastName(data.data.last_name)
        setHometown(data.data.hometown)
        setBirthDate(data.data.birth_date)
    }, [data]);

    const textStyle = {margin: "10%", fontSize: 24};
    const datas = [
        {text: "Hometown: ", value: hometown},
        {text: "Birth data: ", value: birthDate},
    ]

    return (
        <div className={classes.RightColumn}>
            <h2 style={{marginLeft: "10%"}}> {firstName + " " + lastName} </h2>
            <hr style={{marginLeft: "10%"}}/>
             { datas.map((data, index) =>
                <div key={index}>
                    <div style={{height: 5}}></div>
                    <Text
                        style={textStyle}>
                        {data.text} {data.value}
                    </Text>
                </div>) }
        </div>
    )
}

export default RightColumn