import classes from "./Input.module.css"

const Input = (props) => {
    return (
        <input value={props.value} onChange={props.onChange} style={{...props.data}} type={props.type} className={classes.Input}/>
    )
}

export default Input