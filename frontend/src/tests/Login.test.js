import renderWithRouter from './services/renderWithRouter';
import { screen } from '@testing-library/react';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import userEvent from '@testing-library/user-event';
import mockUsers from './mocks/mockUsers';
import { act } from 'react-dom/test-utils';

const user = mockUsers[0];

const notAUser = {
  name: 'Harry Potter',
  email: 'harry.potter@hogwarts.com',
  password: 'Hedwig01!',
}


describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear();
    window.fetch = jest.fn().mockImplementation(mockFetch);
  })
  it('should have the submit button disabled if the information are incorrect', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('pass-input');
    userEvent.type(emailInput, notAUser.email);
    userEvent.type(passInput, notAUser.password);
    expect(btn).not.toBeDisabled();
  });
  it('should not be able to login if the user doesn\'t exists', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('pass-input');
    userEvent.type(emailInput, notAUser.email);
    userEvent.type(passInput, notAUser.password);
    const btn = screen.getByRole('button');
    await act(async () => { userEvent.click(btn); });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const message = await screen.findByTestId('error-message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('wrong email or password');
  });
  it('should redirect the page if the user exists', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('pass-input');
    userEvent.type(emailInput, user.email);
    userEvent.type(passInput, user.password);
    const btn = screen.getByRole('button');
    expect(btn).not.toBeDisabled();
    await act(async () => { userEvent.click(btn); });
    const { pathname } = history.location;
    expect(pathname).toBe('/dashboard');
    expect(await screen.findByText(/Hello/)).toBeInTheDocument();
  });
  it('should redirect the page when clicking the register button', async () => {
    const { history } = renderWithRouter(<App />);
    const redirectButton = screen.getByRole('link');
    userEvent.click(redirectButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/register');
    expect(await screen.findByText('Register')).toBeInTheDocument();
  });
})
