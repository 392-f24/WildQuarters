// PrefForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrefForm from '../pages/PrefForm';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

describe('PrefForm component', () => {
    it('prevents form submission if required fields are missing', () => {
        // Mock window.alert
        const alertMock = vi.fn();
        global.alert = alertMock;

        render(
            <MemoryRouter>
                <PrefForm />
            </MemoryRouter>
        );

        // Verify that the inputs are present using regex to ignore leading spaces
        const fullNameInput = screen.getByPlaceholderText(/Full Name/i);
        const majorInput = screen.getByPlaceholderText(/Major/i);

        expect(fullNameInput).toBeInTheDocument();
        expect(majorInput).toBeInTheDocument();

        // Find the submit button and click it
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        // Expect alert to have been called with the correct message
        expect(alertMock).toHaveBeenCalledWith('Please fill out all fields correctly.');
    });
});
