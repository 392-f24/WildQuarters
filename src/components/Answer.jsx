import './PrefFormStyle.css';

const Answer = (props) => {
    return (<div>
        <input 
            type="radio"
            name={props.name}
            value={props.answer}
            checked={props.data.location === props.answer}
            onChange={(e) => props.handleChange(e)}/> {props.answer}
    </div>);
}

export default Answer; 