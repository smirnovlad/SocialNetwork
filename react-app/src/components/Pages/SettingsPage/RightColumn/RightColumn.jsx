import classes from "./RightColumn.module.css"
import InputLine from "../../../InputLine/InputLine"
import DefaultButton from "../../../Button/DefaultButton"
import {Text} from 'react-native'
import {useState, useEffect} from "react"
import store from '../../../../store/store'
import {updateUserSettings} from "../../../../api/userInfo"
import {useDispatch} from "react-redux"

const RightColumn = (props) => {
    const dispatch = useDispatch();

    const authorizedUserInfo = store.getState().authorizedUserInfo;
    const username = authorizedUserInfo.username;
    const name = authorizedUserInfo.first_name + " " + authorizedUserInfo.last_name;
    const [hometown, setHometown] = useState(authorizedUserInfo.hometown);
    const [birthDate, setBirthDate] = useState(authorizedUserInfo.birth_date);

    const textStyle = {margin: "10%", fontSize: 24};
    const immutableDatas = [
        {text: "Login: ", value: username}
    ]
    const mutableDatas = [
        {text: "Birth date ", onChange: setBirthDate, value: birthDate, placeholder: authorizedUserInfo.birth_date},
        {text: "Hometown ", onChange: setHometown, value: hometown, placeholder: authorizedUserInfo.hometown},
    ]
    const saveSettings = async function () {
        const token = authorizedUserInfo.token;
        const id = store.getState().authorizedUserInfo.id;
        dispatch(updateUserSettings({token, id, birthDate, hometown})).unwrap()
                    .then((originalPromiseResult) => {
                        console.log(originalPromiseResult)
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        console.log(rejectedValueOrSerializedError);
                    });
    }

    return (
        <div className={classes.RightColumn} id={props.id}>
            <h2 style={{marginLeft: "10%"}}> {name} </h2>
            <hr style={{marginLeft: "10%"}}/>
            { immutableDatas.map((data, index) =>
                <div key={index}>
                    <div style={{height: 5}}></div>
                    <Text
                        style={textStyle}>
                        {data.text} {data.value}
                    </Text>
                </div>) }
             { mutableDatas.map((data, index) =>
                <div key={index} style={{marginLeft: "10%"}}>
                    <div style={{height: 5}}></div>
                    <InputLine data={{text: data.text}} onChange={e => data.onChange(e.target.value)} style={{width: "70%"}} placeholder={data.placeholder}/>
                </div>) }
            <div style={{height: 5}}></div>
            <DefaultButton handler={saveSettings} text={"Save"} style={{width: "40%", height: 36, float: "right", backgroundColor: "#447BBA", color: "white"}}/>
        </div>
    )
}

export default RightColumn