// SignUpPage.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SignUpPage from '../pages/SignUpPage';
import { AuthService } from '../services/AuthService';

const mockStore = configureStore([]);

describe('SignUpPage', () => {
  it('renders the component', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <SignUpPage />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('handles sign-up correctly', async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <SignUpPage />
        </Router>
      </Provider>
    );

    // Mock AuthService.signUp to resolve with dummy user data
    jest.spyOn(AuthService, 'signUp').mockResolvedValue({ userId: 1, username: 'testuser' });

    // Fill out the form and submit
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Full Name:'), { target: { value: 'Test User' } });
    fireEvent.click(screen.getByText('Sign Up'));

    // Wait for the asynchronous sign-up to complete
    await waitFor(() => {
      expect(screen.getByText('Successfully signed up!')).toBeInTheDocument();
    });
  });
});
