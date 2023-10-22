import classes from "./CustomButton.module.css"

const CustomButton = ({children, ...props}) => {

    return (
        <div>
            <button {...props} className={classes.customBtn}> {children} </button>
        </div>
    )
}

export default CustomButton