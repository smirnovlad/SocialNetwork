import classes from "./Settings.module.css"
import LeftColumn from "./LeftColumn/LeftColumn"
import RightColumn from "./RightColumn/RightColumn"

const Settings = () => {
    return (
        <div className={classes.Settings}>
            <LeftColumn/>
            <RightColumn/>
        </div>
    )
}

export default Settings