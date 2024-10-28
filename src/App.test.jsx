import {describe, expect, test, vi, it} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import MatchCard from './components/MatchCard';

const mockProfile = {
  fullName : "Tester",
  gender : "Female",
  major : "CS",
  desc : "",
  number : "1234567890"
}

describe('dropdowns', () => {
it('should open and close', async () => {
  render(<MatchCard profile={mockProfile} matchScore={6} self={mockProfile} />);
  const button = await screen.findByLabelText('dropdown-button');
  const info = await screen.findByLabelText('dropdown-info');


  expect(info.className).toBe('visually-hidden');
  fireEvent.click(button);
  expect(info.className).not.toBe('visually-hidden');
  fireEvent.click(button);
  expect(info.className).toBe('visually-hidden');

})
})