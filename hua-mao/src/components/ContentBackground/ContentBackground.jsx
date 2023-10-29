import classes from "./ContentBackground.module.css"
import Profile from "../ProfilePage/Profile"

const ContentBackground = () => {
    return (
        <div className={classes.ContentBackground}>
            <Profile/>
        </div>
    )
}

export default ContentBackground;