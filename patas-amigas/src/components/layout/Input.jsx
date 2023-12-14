function Input({ type, nameId, state, value, placeholder, setValues, maxLength }) {
    return (
        <div className="input-container">
            <input
                type={type}
                id={nameId}
                className="input-answer"
                value={state}
                maxLength={maxLength}
                required
                onChange={e => {
                    setValues({...value, [nameId]: e.target.value});
                }}
            /><br/>
            <label
                htmlFor={nameId}
                className="input-label"
            >{placeholder}</label>
        </div>
    )
}

export default Input;