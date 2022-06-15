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

const goToRegister = () => {
  const redirectButton = screen.getByRole('link');
  userEvent.click(redirectButton);
}

const getInputs = () => {
  const name = screen.getByLabelText('Type your name');
  const email = screen.getByLabelText('Type your email');
  const pass = screen.getByLabelText('Type your password');
  const secPass = screen.getByLabelText('Type your password again');
  const btn = screen.getByRole('button');
  return { name, email, pass, secPass, btn };
}

describe('Register Page', () => {
  beforeEach(() => {
    localStorage.clear();
    window.fetch = jest.fn().mockImplementation(mockFetch);
  })
  it('should appear an error if the name field isn\'t filled', () => {
    renderWithRouter(<App />);
    goToRegister();
    const { email, pass, secPass, btn } = getInputs();
    userEvent.type(email, notAUser.email);
    userEvent.type(pass, notAUser.password);
    userEvent.type(secPass, notAUser.password);
    expect(btn).toBeDisabled();
  });
  it('should appear an error if the email field isn\'t filled', () => {
    renderWithRouter(<App />);
    goToRegister();
    const { name, pass, secPass, btn } = getInputs();
    userEvent.type(name, notAUser.name);
    userEvent.type(pass, notAUser.password);
    userEvent.type(secPass, notAUser.password);
    expect(btn).toBeDisabled();
  });
  it('should appear an error if the password field isn\'t filled', () => {
    renderWithRouter(<App />);
    goToRegister();
    const { email, name, secPass, btn } = getInputs();
    userEvent.type(email, notAUser.email);
    userEvent.type(name, notAUser.name);
    userEvent.type(secPass, notAUser.password);
    expect(btn).toBeDisabled();
  });
  it('should appear an error if the password and second password are different', () => {
    renderWithRouter(<App />);
    goToRegister();
    const { name, email, pass, secPass, btn } = getInputs();
    userEvent.type(name, notAUser.name);
    userEvent.type(email, notAUser.email);
    userEvent.type(pass, notAUser.password);
    userEvent.type(secPass, notAUser.name);
    expect(btn).toBeDisabled();
  });
  it('should appear an error if the email is already registered', async () => {
    renderWithRouter(<App />);
    goToRegister();
    const { name, email, pass, secPass, btn } = getInputs();
    userEvent.type(name, user.name);
    userEvent.type(email, user.email);
    userEvent.type(pass, user.password);
    userEvent.type(secPass, user.password);
    userEvent.click(btn);
    const message = await screen.findByTestId('error-message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/User already exists/gi);
  });
  it('should redirect the page if the user was created', async () => {
    const { history } = renderWithRouter(<App />);
    goToRegister();
    const { name, email, pass, secPass, btn } = getInputs();
    userEvent.type(name, notAUser.name);
    userEvent.type(email, notAUser.email);
    userEvent.type(pass, notAUser.password);
    userEvent.type(secPass, notAUser.password);
    userEvent.click(btn);
    expect(await screen.findByText('Login')).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
