import './PrefForm.css';

const Answer = (props) => {

    const answerId = props.name + '-' + props.answer; 

    return (<div className="form-check">
            <input 
            type={props.type}
            className="form-check-input"
            id = {answerId}
            name={props.name}
            value={props.answer}
            checked={props.type === 'radio' ? props.data[props.name] === props.answer : props.data[props.name].includes(props.answer)}
            onChange={(e) => props.handleChange(e)}/>

            <label className="form-check-label" htmlFor={answerId}>
                {props.answer}
            </label>
        </div>);
}

export default Answer; 