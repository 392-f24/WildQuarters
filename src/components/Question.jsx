import './PrefForm.css';
import Answer from './Answer.jsx';


const Question = (props) => {
    return (
        <div className="mb-3">
            <h2 className="form-label">{props.label}</h2>
            {props.answers.map((answer) => <Answer key={answer} answer={answer} name={props.name} data={props.data} handleChange={props.handleChange} type={props.type}/>)}
        </div>
    );
}

export default Question; 