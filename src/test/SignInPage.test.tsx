// SignInPage.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SignInPage from '../pages/SignInPage';

// Mock Redux store
const mockStore = configureStore([]);

describe('SignInPage', () => {
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
          <SignInPage />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('handles sign-in correctly', async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <SignInPage />
        </Router>
      </Provider>
    );

    // Mock AuthService.signIn to resolve with user data
    jest.mock('../src/services/AuthService', () => ({
      signIn: jest.fn().mockResolvedValue({ userId: 1, username: 'testuser' }),
    }));

    // Fill out the form and submit
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign In'));

    // Wait for the asynchronous sign-in to complete
    await waitFor(() => {
      expect(screen.getByText('Successfully signed in!')).toBeInTheDocument();
    });
  });
});
