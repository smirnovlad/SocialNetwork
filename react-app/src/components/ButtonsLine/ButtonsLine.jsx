import DefaultButton from "../Button/DefaultButton"
import classes from "./ButtonsLine.module.css"

const ButtonsLine = (props) => {
    return (
        <div style={{...props.data}} className={classes.ButtonsLine}>
            <DefaultButton handler={props.firstHandler} text={props.firstText}
                           style={{width: 114, height: 35, float: "left", backgroundColor: "#447BBA", color: "white"}}/>
            <DefaultButton handler={props.secondHandler} text={props.secondText} style={{
                width: 114,
                height: 35,
                float: "right",
                backgroundColor: "#447BBA",
                color: "white"
            }}/>
        </div>
    )
}

export default ButtonsLine