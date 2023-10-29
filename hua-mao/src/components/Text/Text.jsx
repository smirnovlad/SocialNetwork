import classes from "./Text.module.css"

const Text = (props) => {
    return (
        <div style={{...props.data}}
             className={classes.Text}>
            <p> {props.text} </p>
        </div>
    )
}

export default Text;