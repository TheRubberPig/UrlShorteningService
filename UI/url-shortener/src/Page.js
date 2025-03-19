import { useState } from "react";

const Input = ({onSubmit}) => {
    const [inputValue, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(inputValue);
        }
        setValue('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className=".formCss">
                <input type="text" value={inputValue} onChange={(e) => setValue(e.target.value)} className=".urlBox"></input>
                <button type="submit" className="urlButton">Submit</button>
            </form>
        </div>
    );
}

export default Input;