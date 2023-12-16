import DefaultButton from "../Button/DefaultButton"
import classes from "./LeftPanel.module.css"
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux"

const LeftPanel = (props) => {
    const buttonStyle = {
        width: 200,
        height: 35,
        backgroundColor: "white",
        textAlign: "left",
        textIndent: 26
    }

    const {id} = useSelector(state => state.authorizedUserInfo)
    let buttons = []
    if (id) {
        buttons = [
            {text: "My profile", handler: props.onMyProfileClicked, link: `/profile/${id}`},
            {text: "All users", handler: props.onAllUsersClicked, link: "/users"},
            {text: "Friends", handler: props.onFriendsClicked, link: "/friends"},
            {text: "Messages", handler: props.onMessagesClicked, link: "/messages"},
            {text: "Settings", handler: props.onSettingsClicked, link: "/settings"},
            {text: "Feedback", handler: props.onFeedbackClicked, link: "/feedback"},
            {text: "Log out", handler: props.onLogOutClicked, link: "/login"},
        ]
    } else {
        buttons = [
            {text: "Feedback", handler: props.onFeedbackClicked, link: "/feedback"},
            {text: "Log in", handler: props.onLogInClicked, link: "/login"}
        ]
    }

    return (
        <div className={classes.LeftPanel}>
             { buttons.map((button, index) =>
                <div key={index}>
                    <Link to={button.link}>
                        <DefaultButton
                            handler={button.handler}
                            text={button.text}
                            style={buttonStyle} />
                    </Link>
                </div>) }
        </div>
    )
}

export default LeftPanel