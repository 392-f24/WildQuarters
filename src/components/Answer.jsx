import './PrefForm.css';

const Answer = (props) => {
    return (<div className="form-check">
            <input 
            type={props.type}
            className="form-check-input"
            name={props.name}
            value={props.answer}
            checked={props.data[props.name] === props.answer}
            onChange={(e) => props.handleChange(e)}/>
            <label
            className="form-check-label"
            htmlFor={props.name}>
                {props.answer}
            </label>
        </div>);
}

export default Answer; 