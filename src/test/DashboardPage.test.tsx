// DashboardPage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import DashboardPage from '../pages/DashboardPage';

const mockStore = configureStore([]);

describe('DashboardPage', () => {
  it('renders the component', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: { userId: 1, username: 'testuser' },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <DashboardPage />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Welcome to the Dashboard')).toBeInTheDocument();
  });
});
