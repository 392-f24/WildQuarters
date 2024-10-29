import { describe, expect, it, vi } from 'vitest'; 
import { screen, render, fireEvent } from '@testing-library/react';
import Matches from '../pages/Matches'
import ProfilePage from '../pages/ProfilePage'
import { useAuthState, useDbData } from '../utilities/firebase'
import { MemoryRouter, Route, Routes } from 'react-router-dom';


const roommates = {"Chris Riesbeck": {
    "bedTime": "Early",
    "clean": "Clean",
    "desc": "I'm an agile type of guy",
    "fullName": "Chris Riesbeck",
    "gender": "Male",
    "guests": "No",
    "location": "North",
    "major": "Computer Science",
    "noise": "Quiet",
    "number": "1234567890",
    "profilePhoto": "",
    "roommateGender": [
    "Any"
    ],
    "size": [
    "Double",
    "Triple",
    "Suite"
    ],
    "wakeUpTime": "6-8 AM"}
}

vi.mock('../utilities/firebase')

describe('switching pages', () => {

    it('clicking the profile icon goes to the Profile Page', async () => {
        useAuthState.mockReturnValue([{id:'13213123'}, false])
        useDbData.mockReturnValue([roommates, false])
        render(
        <MemoryRouter initialEntries={['/matches']}>
            <Routes>
                <Route path="/matches" element={<Matches roommates={roommates}/>} />
                <Route path="profile" element={<ProfilePage />}/>
            </Routes>
        </MemoryRouter>)


        const profileLink = await screen.findByTestId('profile-icon');
        fireEvent.click(profileLink)
        const profileElemts = await screen.findAllByText(/Profile/);
        expect(profileElemts.length).toBeGreaterThan(0);

    })
})