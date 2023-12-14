function Button({ onClick, content, width }) {
    return (
        <button onClick={onClick} style={{ width: width }}>
            <span>{content}</span>
        </button>
    )
}

export default Button;