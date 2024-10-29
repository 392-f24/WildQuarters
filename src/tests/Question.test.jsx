import { describe, it, expect } from 'vitest'; 
import { screen, render } from '@testing-library/react';
import Question from '../components/Question';


describe('loading questions for pref form', () => {

    it('Given 3 answers and type radio, the Question component should display 3 radio inputs for each answer', async () => {
        const answers = ['Male', 'Female', 'Non-binary']
        

        
        render(<Question answers={answers} 
                         label="Gender"
                         name="gender"
                         type="radio"
                         data={{gender: 'male'}}
                         handleChange={() => console.log('test')} />)
        

        const answer1 = await screen.findByTestId(answers[0]);
        const answer2 = await screen.findByTestId(answers[1]);
        const answer3 = await screen.findByTestId(answers[2]);
    })
})
