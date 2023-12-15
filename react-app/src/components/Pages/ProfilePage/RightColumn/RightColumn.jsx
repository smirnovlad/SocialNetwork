import classes from "./RightColumn.module.css"
import {Text} from 'react-native'

const RightColumn = () => {
    const userName = "Vlad Smirnov";
    const login = "smirnovlad";
    const hometown = "Moscow";
    const age = 20;

    const textStyle = {margin: "10%", fontSize: 24};
    const datas = [
        {text: "Login: ", value: login},
        {text: "Hometown: ", value: hometown},
        {text: "Age: ", value: age},
    ]

    return (
        <div className={classes.RightColumn}>
            <h2 style={{marginLeft: "10%"}}> {userName} </h2>
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