import classes from "./LeftColumn.module.css"
import profile_photo from "../../../../img/dummy_avatar.png"
import DefaultButton from "../../../Button/DefaultButton"

const LeftColumn = (props) => {

    return (
        <div className={classes.LeftColumn} id={props.id}>
            <img src={profile_photo} style={{borderRadius: 10, width: "100%", height: "85%", float: "left"}} alt={"profile_photo"}/>
            <div>
                <DefaultButton handler={props.handler} text={"Load photo"} style={{width: "70%", height: 36, position: "relative", top: 10, left: "15%", backgroundColor: "#447BBA", color: "white"}}/>
            </div>
        </div>
    )
}

export default LeftColumn