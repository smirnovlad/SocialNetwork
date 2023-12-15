import classes from "./RightColumn.module.css"
import InputLine from "../../../InputLine/InputLine"
import DefaultButton from "../../../Button/DefaultButton"
import {Text} from 'react-native'

const RightColumn = (props) => {
    const userName = "Vlad Smirnov";
    const login = "smirnovlad";
    const hometown = "Moscow";
    const age = 20;

    const textStyle = {margin: "10%", fontSize: 24};
    const immutableDatas = [
        {text: "Login: ", value: login}
    ]
    const mutableDatas = [
        {text: "Age ", value: age},
        {text: "Hometown ", value: hometown},
    ]

    return (
        <div className={classes.RightColumn} id={props.id}>
            <h2 style={{marginLeft: "10%"}}> {userName} </h2>
            <hr style={{marginLeft: "10%"}}/>
            { immutableDatas.map((data, index) =>
                <div key={index}>
                    <div style={{height: 5}}></div>
                    <Text
                        style={textStyle}>text
                        {data.text} {data.value}
                    </Text>
                </div>) }
             { mutableDatas.map((data, index) =>
                <div key={index} style={{marginLeft: "10%"}}>
                    <div style={{height: 5}}></div>
                    <InputLine data={{text: data.text}} style={{width: "70%"}} placeholder={data.value}/>
                </div>) }
            <div style={{height: 5}}></div>
            <DefaultButton handler={props.handler} text={"Save"} style={{width: "40%", height: 36, float: "right", backgroundColor: "#447BBA", color: "white"}}/>
        </div>
    )
}

export default RightColumn