import renderWithRouter from './services/renderWithRouter';
import { screen } from '@testing-library/react';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import userEvent from '@testing-library/user-event';
import mockUsers from './mocks/mockUsers';
import { act } from 'react-dom/test-utils';
import mockPeople from './mocks/mockPeople';

const user = mockUsers[0];
const person = mockPeople[0];

const goToPerson = async () => {
  const emailInput = screen.getByTestId('email-input');
  const passInput = screen.getByTestId('pass-input');
  userEvent.type(emailInput, user.email);
  userEvent.type(passInput, user.password);
  const btn = screen.getByRole('button');
  await act(async () => { userEvent.click(btn); });
  const btns = await screen.findAllByRole('button');
  await act(async () => { userEvent.click(btns[0]); });
  const peopleBtn = await screen.findAllByTestId('people-btn');
  await act(async () => { userEvent.click(peopleBtn[0]); });
};

describe('Person page', () => {
  beforeEach(() => {
    localStorage.clear();
    window.fetch = jest.fn().mockImplementation(mockFetch);
  });
  it('should have two buttons on screen', async () => {
    renderWithRouter(<App />);
    await goToPerson();
    const btns = screen.getAllByRole('button');
    expect(btns).toHaveLength(2);
    expect(btns[0]).toHaveTextContent('Update data');
    expect(btns[1]).toHaveTextContent('Delete person');
  });
  it('should have the right content on screen', async () => {
    renderWithRouter(<App />);
    await goToPerson();
    const name = screen.getByText(`${person.first_name} ${person.last_name}`);
    const birthday = screen.getByText(/birthday/i);
    const email = screen.getByText(person.email);
    const phone = screen.getByText(person.phone);
    const address = screen.getByText(person.address);
    const city = screen.getByText(`${person.city}/${person.state}`);
    expect(name).toBeInTheDocument();
    expect(birthday).toBeInTheDocument();
    expect(birthday).toHaveTextContent(`Birthday: ${person.birthday}`);
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(city).toBeInTheDocument();
  });
  it('should redirect the page when the update button is clicked', async () => {
    const { history } = renderWithRouter(<App />);
    await goToPerson();
    const btns = screen.getAllByRole('button');
    userEvent.click(btns[0]);
    expect(await screen.findByText('Update person\'s data')).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe(`/${person.id}/update`);
  });
  it('should redirect the page when the delete button is clicked', async () => {
    const { history } = renderWithRouter(<App />);
    await goToPerson();
    const btns = screen.getAllByRole('button');
    userEvent.click(btns[1]);
    expect(await screen.findByText(/Hello/i)).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/dashboard');
  });
});
