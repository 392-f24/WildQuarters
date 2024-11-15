import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PrefForm from '../pages/PrefForm';

// Import the modules and functions you need to mock
import { useDbUpdate, useStorageUpload } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';

// Mock the Firebase utilities
vi.mock('../utilities/firebase', () => ({
  useDbUpdate: vi.fn(),
  useStorageUpload: vi.fn(),
}));

// Mock the React Router DOM utilities
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('PrefForm Component', () => {
  let mockNavigate;
  let mockUpdate;
  let mockUpload;
  let alertMock;

  beforeEach(() => {
    // Create mock functions
    mockNavigate = vi.fn();
    mockUpdate = vi.fn();
    mockUpload = vi.fn();

    // Set up the mocks to return the mock functions
    useNavigate.mockReturnValue(mockNavigate);
    useDbUpdate.mockReturnValue([mockUpdate, {}]);
    useStorageUpload.mockReturnValue([mockUpload, false, '', null]);

    // Mock window.alert to prevent actual alert pop-ups during tests
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original alert function after each test
    alertMock.mockRestore();
  });

  it('should not allow submission when the form is incomplete', () => {
    // Render the PrefForm component
    render(<PrefForm />);

    // Fill out some but not all required fields
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Major/i), {
      target: { value: 'Computer Science' },
    });
    // Intentionally leave out 'number' and other required fields

    // Attempt to submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check that an alert was shown to the user
    expect(alertMock).toHaveBeenCalledWith(
      'Please fill out all fields correctly.'
    );

    // Ensure that the update function was not called
    expect(mockUpdate).not.toHaveBeenCalled();

    // Ensure that navigation did not occur
    expect(mockNavigate).not.toHaveBeenCalled();

    // Optionally, check that the submit button has the 'disabled-button' class
    expect(submitButton).toHaveClass('disabled-button');
  });
});
