import classes from "./LeftColumn.module.css"
import profile_photo from "../../../../img/profile_photo.png"
import DefaultButton from "../../../Button/DefaultButton"
import MessageButton from "../../../Button/MessageButton"
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {updateUserFriendList} from "../../../../api/userInfo"
import {useDispatch} from "react-redux"
import store from '../../../../store/store'

const LeftColumn = (props) => {
    const dispatch = useDispatch()
    const {id, friends} = useSelector(state => state.authorizedUserInfo);
    const params = useParams();

    const [buttonProps, setButtonProps] = useState({
        text: "",
        backgroundColor: ""
    })

    const removeFriend = async function (friendId) {
        const newFriendList = friends.filter(item => item != friendId)
        const token = store.getState().authorizedUserInfo.token;

        dispatch(updateUserFriendList({token, newFriendList}))
            .unwrap()
            .then((originalPromiseResult) => {
                setButtonProps({
                    text: "Add friend",
                    handler: () => {
                        addFriend(params.userid);
                    },
                    backgroundColor: "#447BBA"
                })
                console.log(originalPromiseResult)
            }).catch((rejectedValueOrSerializedError) => {
            console.log(rejectedValueOrSerializedError)
        })
    }

    const addFriend = async function (friendId) {
        const newFriendList = [...friends, friendId];
        const token = store.getState().authorizedUserInfo.token;

        dispatch(updateUserFriendList({token, newFriendList}))
            .unwrap()
            .then((originalPromiseResult) => {
                setButtonProps({
                    text: "Remove friend",
                    handler: () => {
                        removeFriend(params.userid);
                    },
                    backgroundColor: "#9A031E"
                })
            }).catch((rejectedValueOrSerializedError) => {
            console.log(rejectedValueOrSerializedError)
        })
    }



    useEffect(() => {
        if (id && props.data.id != id) {
            let buttonInfo = {}
            if (friends.includes(parseInt(params.userid))) {
                buttonInfo = {
                    text: "Remove friend",
                    handler: () => {
                        removeFriend(params.userid);
                    },
                    backgroundColor: "#9A031E"
                }
            } else {
                buttonInfo = {
                    text: "Add friend",
                    handler: () => {
                        addFriend(params.userid);
                    },
                    backgroundColor: "#447BBA"
                }
            }
            setButtonProps(buttonInfo)
        }
    }, []);

    return (
        <div className={classes.LeftColumn}>
            <img src={profile_photo} style={{borderRadius: 10, width: "100%", height: "85%", float: "left"}}
                 alt={"profile_photo"}/>
            {(id && props.data.id != id) && <div>
                <DefaultButton handler={buttonProps.handler} text={buttonProps.text} style={{
                    width: "70%",
                    height: 36,
                    float: "left",
                    position: "relative",
                    top: 10,
                    backgroundColor: buttonProps.backgroundColor,
                    color: "white"
                }}/>
                <MessageButton style={{width: "20%", height: 36, float: "right", position: "relative", top: 10}}/>
            </div>}
        </div>
    )
}

export default LeftColumn