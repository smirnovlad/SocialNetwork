import classes from "./Profile.module.css"
import LeftColumn from "./LeftColumn/LeftColumn"
import RightColumn from "./RightColumn/RightColumn"

const Profile = () => {
    return (
        <div className={classes.Profile}>
            <LeftColumn/>
            <RightColumn/>
        </div>
    )
}

export default Profile