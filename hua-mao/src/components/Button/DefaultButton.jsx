import classes from "./DefaultButton.module.css"

const DefaultButton = (props) => {

    return (
        <div>
            <button onClick={props.handler} style={{...props.style}} className={classes.DefaultButton}>
                {props.text}
            </button>
        </div>
    )
}

export default DefaultButton