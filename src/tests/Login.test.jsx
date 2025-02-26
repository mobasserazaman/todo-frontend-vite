import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../components/Login';
import { Provider } from 'react-redux';
import store from '../store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Login Component', () => {
    it('renders the login form', () => {
        render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);

        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
});
