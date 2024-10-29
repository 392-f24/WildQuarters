import {describe, expect, test, vi, it} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import MatchCard from '../components/MatchCard';

const mockProfile = {
    fullName : "Tester",
    gender : "Female",
    major : "CS",
    desc : "",
    number : "1234567890",
    location : "North",
    noise : "Quiet"
}

const mockSelf = {
  fullName : "Tester2",
  gender : "Female",
  major : "SESP",
  desc : "",
  number : "0987654321",
  location : "South",
  noise : "Quiet"
}

describe('dropdowns', () => {
  it('should open and close', async () => {
    render(<MatchCard profile={mockProfile} matchScore={6} self={mockProfile} />);
    const button = await screen.findByLabelText('dropdown-button');
    const info = await screen.findByLabelText('dropdown-info');


    expect(info.className).toContain('visually-hidden');
    fireEvent.click(button);
    expect(info.className).not.toContain('visually-hidden');
    fireEvent.click(button);
    expect(info.className).toContain('visually-hidden');

  })
})

describe('match buttons', () => {
  it('should be green when preferences match', async () => {
    render(<MatchCard profile={mockProfile} matchScore={6} self={mockSelf} />);
    const noiseButton = await screen.findByText(/Noise Level/);
    const locationButton = await screen.findByText(/Location/);

    expect(noiseButton.className).toContain('btn-success');
    expect(locationButton.className).toContain('btn-danger');
  })
})