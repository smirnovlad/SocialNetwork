import classes from "./CustomInput.module.css"

const CustomInput = (props) => {
    return (
        <div>
            <input {...props} className={classes.customInput}/>
        </div>
    )
}

export default CustomInput