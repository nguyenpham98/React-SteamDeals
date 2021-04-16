import React, {useState} from 'react'

const ClickButton = () => {
    const [count, setCount] = useState(0);
    const onClickHandler = () => {
        setCount(count+1);        
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={onClickHandler}>Click Me</button>
        </div>
    )
}

export default ClickButton
