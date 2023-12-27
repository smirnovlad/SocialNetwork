import classes from "./LeftColumn.module.css"
import DefaultButton from "../../../Button/DefaultButton"
import {useRef} from "react";
import {useSelector, useDispatch} from "react-redux"
import {updateAvatar} from "../../../../api/media"

import store from '../../../../store/store'


const LeftColumn = (props) => {
    const dispatch = useDispatch()
    const {avatar} = useSelector(state => state.authorizedUserInfo);
    const fileInputRef = useRef(null);

    const handleUploadedAvatar = (avatar) => {
        let token = store.getState().authorizedUserInfo.token;
        let id = store.getState().authorizedUserInfo.id;

        dispatch(updateAvatar({id, token, avatar}))
                    .unwrap()
                    .then((promiseResult) => {
                        //
                    }).catch((rejectedValueOrSerializedError) => {
                        console.log(rejectedValueOrSerializedError);
                    })
    }

    const onButtonClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div className={classes.LeftColumn} id={props.id}>
            <img src={avatar} style={{borderRadius: 10, width: "100%", height: "85%", float: "left"}}
                 alt={"profile_photo"}/>
            <div>
                <input type='file' id='file'
                       onChange={(event) => {
                           handleUploadedAvatar(event.target.files[0])
                       }}
                       ref={fileInputRef}
                       style={{display: 'none'}}
                />
                <DefaultButton handler={onButtonClick} text={"Load photo"} style={{
                    width: "70%",
                    height: 36,
                    position: "relative",
                    top: 10,
                    left: "15%",
                    backgroundColor: "#447BBA",
                    color: "white"
                }}/>
            </div>
        </div>
    )
}

export default LeftColumn