import  {useState} from "react";

const Counter = () => {

    const [views, setViews] = useState(10);

    function increment() {
        setViews(views + 1);
    }

    function decrement() {
        setViews(views - 1);
    }

    return (
        <div>
            <h1>{views}</h1>

            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

export default Counter;