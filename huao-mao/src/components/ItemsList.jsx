import Item from "./Item"

const ItemsList = ({data, label}) => {

    return (
        <div>
            <h1 style={{textAlign: 'center'}}> {label} </h1>

            <div>
                { data.map((item, index) =>
                <Item number={index + 1} data={item} key={item.id}/>) }
            </div>

        </div>
    )
}

export default ItemsList