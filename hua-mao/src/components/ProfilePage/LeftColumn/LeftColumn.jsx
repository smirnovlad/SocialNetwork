import classes from "./LeftColumn.module.css"
import profile_photo from "../../../img/profile_photo.png"
import DefaultButton from "../../Button/DefaultButton"
import MessageButton from "../../Button/MessageButton"

const LeftColumn = (props) => {

    return (
        <div className={classes.LeftColumn}>
            <img src={profile_photo} style={{borderRadius: 10, width: "100%", height: "85%", float: "left"}} alt={"profile_photo"}/>
            <div>
                <DefaultButton handler={props.handler} text={"Add friend"} style={{width: "70%", height: 36, float: "left", position: "relative", bottom: -25, backgroundColor: "#447BBA", color: "white"}}/>
                <MessageButton style={{width: "20%", height: 36, float: "right", position: "relative", bottom: -25}}/>
            </div>
        </div>
    )
}

export default LeftColumn