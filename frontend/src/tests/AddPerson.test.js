import renderWithRouter from './services/renderWithRouter';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import userEvent from '@testing-library/user-event';
import mockUsers from './mocks/mockUsers';
import { act } from 'react-dom/test-utils';

const user = mockUsers[0];
const newPerson = {
  "first_name": "Harry",
  "last_name": "Potter",
  "birthday": "1989-07-31",
  "city": "Little Whinging",
  "email": "harry.potter@hogwarts.com",
  "phone": "+3575676049522",
  "state": "Surrey",
  "address": "Cupboard under the stairs, 4, Privet Drive"
}

const goToAdd = async () => {
  const emailInput = screen.getByTestId('email-input');
  const passInput = screen.getByTestId('pass-input');
  userEvent.type(emailInput, user.email);
  userEvent.type(passInput, user.password);
  const btn = screen.getByRole('button');
  await act(async () => { userEvent.click(btn); });
  const btns = await screen.findAllByRole('button');
  await act(async () => { userEvent.click(btns[1]); });
};

const getInputs = () => {
  const firstName = screen.getByPlaceholderText('First name');
  const lastName = screen.getByPlaceholderText('Last name');
  const email = screen.getByPlaceholderText('E-mail');
  const birthday = screen.getByLabelText('Birthday');
  const phone = screen.getByPlaceholderText('Phone');
  const address = screen.getByPlaceholderText('Address');
  const city = screen.getByPlaceholderText('City');
  const state = screen.getByPlaceholderText('State');
  const btn = screen.getByRole('button');
  return { firstName, lastName, email, birthday, phone, address, city, state, btn };
}

describe('Add person page', () => {
  beforeEach(() => {
    localStorage.clear();
    window.fetch = jest.fn().mockImplementation(mockFetch);
  });
  it('should have 8 inputs and one disabled button on the page', async () => {
    const { history } = renderWithRouter(<App />);
    await goToAdd();
    expect(history.location.pathname).toBe('/add-person');
    const { firstName, lastName, email, birthday, phone, address, city, state, btn } = getInputs();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(birthday).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(state).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });
  it('should enable the button if the fields firstName, lastName, email and birthday are correct', async () => {
    renderWithRouter(<App />);
    await goToAdd();
    const { firstName, lastName, email, birthday } = getInputs();
    userEvent.type(firstName, newPerson.first_name);
    userEvent.type(lastName, newPerson.last_name);
    userEvent.type(email, newPerson.email);
    fireEvent.change(birthday, { target: { value: newPerson.birthday } });
    const { btn } = getInputs();
    expect(btn).not.toBeDisabled();
  });
  it('should redirect to the dashboard page after the person is added', async () => {
    const { history } = renderWithRouter(<App />);
    await goToAdd();
    const { firstName, lastName, email, birthday, phone, address, city, state } = getInputs();
    userEvent.type(firstName, newPerson.first_name);
    userEvent.type(lastName, newPerson.last_name);
    userEvent.type(email, newPerson.email);
    fireEvent.change(birthday, { target: { value: newPerson.birthday } });
    userEvent.type(phone, newPerson.phone);
    userEvent.type(address, newPerson.address);
    userEvent.type(city, newPerson.city);
    userEvent.type(state, newPerson.state);
    const { btn } = getInputs();
    userEvent.click(btn);
    expect(await screen.findByText(/Hello/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/dashboard');
  });
});
