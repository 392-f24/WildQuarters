// Matches.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Matches from '../pages/Matches';
import '@testing-library/jest-dom';
import { useAuthState } from '../utilities/firebase';
import { describe, it, expect, vi } from 'vitest';

// Mock the useAuthState hook
vi.mock('../utilities/firebase');

describe('Matches component', () => {
    it("doesn't display the user's own profile in the matches list", async () => {
        // Define a mock user with displayName matching the key in roommates
        const mockUser = { uid: 'user123', displayName: 'Chris Riesbeck' };
        useAuthState.mockReturnValue([mockUser, false]);

        // Define roommates prop with the current user and another user
        const roommates = {
            "Chris Riesbeck": {
                fullName: 'Chris Riesbeck',
                desc: 'This is the logged-in user',
                gender: 'Male',
                location: 'North',
                major: 'Engineering',
                profilePhoto: '',
                roommateGender: ['Any'],
                size: ['Double'],
                wakeUpTime: '6-8 AM',
                bedTime: 'Early',
                guests: 'No',
                clean: 'Clean',
                noise: 'Quiet',
            },
            "Jane Smith": {
                fullName: 'Jane Smith',
                desc: 'Looking for a roommate',
                gender: 'Female',
                location: 'South',
                major: 'Math',
                profilePhoto: '',
                roommateGender: ['Any'],
                size: ['Double'],
                wakeUpTime: '8-10 AM',
                bedTime: 'Late',
                guests: 'Yes',
                clean: 'Messy',
                noise: 'Occasional',
            },
        };

        render(
            <MemoryRouter>
                <Matches roommates={roommates} />
            </MemoryRouter>
        );

        // Ensure the user's own profile (Chris Riesbeck) is not in the matches list
        expect(screen.queryByText(/chris riesbeck/i)).not.toBeInTheDocument();

        // Ensure another profile (Jane Smith) is displayed in the matches list
        // Use getByRole to target the heading specifically
        const janeSmithHeading = await screen.findByRole('heading', { name: /jane smith/i });
        expect(janeSmithHeading).toBeInTheDocument();

        // Optionally, ensure that the "Contact Jane Smith:" text is present
        const contactJaneSmith = screen.getByText(/Contact Jane Smith:/i);
        expect(contactJaneSmith).toBeInTheDocument();
    });
});
