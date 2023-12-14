function Textarea({ nameId, state, value, setValues }) {
    return (
        <textarea
            className="textarea-formulario"
            id={nameId}
            maxLength="255"
            value={state}
            required
            onChange={e => {
                setValues({...value, [nameId]: e.target.value});
            }}
        ></textarea>
    )
}

export default Textarea;