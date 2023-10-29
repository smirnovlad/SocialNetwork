import DefaultButton from "../Button/DefaultButton"
import classes from "./LeftPanel.module.css"

const LeftPanel = (props) => {
    const buttonStyle = {
        width: 200,
        height: 35,
        backgroundColor: "rgba(174, 183, 194, 12%)",
        textAlign: "left",
        textIndent: 26
    }

    const buttons = [
        { text: "My profile", handler: props.onMyProfileClicked},
        { text: "Friends", handler: props.onFriendsClicked},
        { text: "Messages", handler: props.onMessagesClicked},
        { text: "Settings", handler: props.onSettingsClicked},
        { text: "Feedback", handler: props.onFeedbackClicked},
        { text: "Log out", handler: props.onLogOutClicked},
    ]

    return (
        <div className={classes.LeftPanel}>
             { buttons.map((button) =>
                <div>
                    <DefaultButton
                        handler={button.handler}
                        text={button.text}
                        style={buttonStyle} />
                </div>) }
        </div>
    )
}

export default LeftPanel