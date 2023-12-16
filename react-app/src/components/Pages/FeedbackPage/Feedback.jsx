import DefaultButton from "../../Button/DefaultButton"
import Message from "../../Message/Message"
import classes from "./Feedback.module.css"
import {Text} from 'react-native'
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {fetchFeedback} from "../../../api/feedback"
import {fetchUserListInfo} from "../../../api/userInfo"
import {useSelector} from "react-redux"

const Feedback = (props) => {
    const dispatch = useDispatch();
    const [feedback, setFeedback] = useState([])

    const {id} = useSelector(state => state.authorizedUserInfo)

    useEffect(() => {
        dispatch(fetchFeedback()).unwrap()
            .then(async (originalPromiseResult) => {
                let users = originalPromiseResult.map(item => {
                    return item.sender
                });
                let usersInfo = await fetchUserListInfo(users)

                originalPromiseResult = originalPromiseResult.map(
                    ((item, index) => {
                            let info = usersInfo[index];
                            item.name = info.name;
                            return item;
                        }
                    ))
                setFeedback(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
    }, [dispatch]);



    return (
        <div style={{textAlign: "center"}}>
            <Text style={{fontSize: 36, position: "relative"}}> Early feedback </Text>

            <div style={{height: 10}}></div>

            <div style={{width: "92.5%", height: "70%", position: "absolute", borderStyle: "solid", borderWidth: 1, borderRadius: 25, overflow: "hidden"}}>
                <div style={{borderRadius: 25, position: "absolute"}} className={classes.CustomizedScrollbar} >
                    <div style={{width: "100%", position: "absolute"}}>
                        {
                        feedback.map((data, index) =>
                        <div key={index} style={{textAlign: "left", paddingLeft: 15, paddingRight: 5, height: 50}}>
                            <Message data={data}/>
                        </div>
                        )
                        }
                    </div>
                </div>
            </div>

            {id && <div style={{display: "flex", width: "92.5%", position: "absolute", bottom: 20}}>
                <input placeholder={"Leave some feedback"} style={{width: "100%", height: 35, float: "left", borderRadius: 10, textIndent: 10, fontSize: 24}}/>
                <div style={{width: "2%"}}></div>
                <DefaultButton handler={props.handler} text={"Send"} style={{width: 100, height: 35, float: "right", backgroundColor: "#447BBA", color: "white"}}/>
            </div>}
        </div>
    )
}

export default Feedback