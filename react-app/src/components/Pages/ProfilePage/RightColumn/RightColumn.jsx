import classes from "./RightColumn.module.css"
import {Text} from 'react-native'
import {useSelector} from "react-redux"
import store from '../../../../store/store'

const RightColumn = () => {
    const {first_name, last_name, hometown, birth_date} = useSelector(state => state.currentProfileData)

    const textStyle = {margin: "10%", fontSize: 24};
    const datas = [
        {text: "Hometown: ", value: hometown},
        {text: "Birth data: ", value: birth_date},
    ]

    return (
        <div className={classes.RightColumn}>
            <h2 style={{marginLeft: "10%"}}> {first_name + " " + last_name} </h2>
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