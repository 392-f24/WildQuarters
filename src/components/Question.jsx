import './PrefFormStyle.css';
import Answer from './Answer.jsx';


const Question = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            {props.answers.map((answer) => <Answer key={answer} answer={answer} name={props.name} data={props.data} handleChange={props.handleChange}/>)}
        </div>
    );
}

export default Question; 