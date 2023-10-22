const Item = (props) => {

    return (
         <div className="post">

                <div className="post__content">
                    <strong> {props.number}. {props.data.label} </strong>
                    <div> {props.data.description} </div>
                </div>

                <div className="post__btn">
                    <button> Delete item </button>
                </div>

            </div>
    )
}

export default Item