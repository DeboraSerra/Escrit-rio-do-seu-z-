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

const goToDashboard = async () => {
  const emailInput = screen.getByTestId('email-input');
  const passInput = screen.getByTestId('pass-input');
  userEvent.type(emailInput, user.email);
  userEvent.type(passInput, user.password);
  const btn = screen.getByRole('button');
  expect(btn).not.toBeDisabled();
  await act(async () => { userEvent.click(btn); });
};

describe('Dashboard page', () => {
  beforeEach(() => {
    localStorage.clear();
    window.fetch = jest.fn().mockImplementation(mockFetch);
  });
  it('should have a title with the user name', async () => {
    renderWithRouter(<App />);
    await goToDashboard();
    const title = screen.getByText(`Hello! ${user.name}`);
    expect(title).toBeInTheDocument();
  });
  it('should have two buttons on screen to show people and to add a person', async () => {
    renderWithRouter(<App />);
    await goToDashboard();
    const btns = screen.getAllByRole('button');
    expect(btns).toHaveLength(3);
    expect(btns[0]).toHaveTextContent('Click here!');
    expect(btns[1]).toHaveTextContent('Add a new person');
  });
  it('should appear an input and some cards with people\'s name when the first button is clicked', async () => {
    renderWithRouter(<App />);
    await goToDashboard();
    const btns = screen.getAllByRole('button');
    await act(async () => { userEvent.click(btns[0]); });
    expect(await screen.findByRole('textbox')).toBeInTheDocument();
    expect(await screen.findAllByTestId('people-btn')).toHaveLength(mockPeople.length);
  });
  it('should filter the cards when something is typed in the input', async () => {
    renderWithRouter(<App />);
    await goToDashboard();
    const btns = screen.getAllByRole('button');
    await act(async () => { userEvent.click(btns[0]); });
    const input = await screen.findByRole('textbox');
    userEvent.type(input, 'g');
    expect(await screen.findAllByTestId('people-btn')).toHaveLength(2);
    userEvent.type(input, 'i');
    expect(await screen.findAllByTestId('people-btn')).toHaveLength(1);
  });
  it('should redirect the page when the add person button is clicked', async () => {
    const { history } = renderWithRouter(<App />);
    await goToDashboard();
    const btns = screen.getAllByRole('button');
    await act(async () => { userEvent.click(btns[1]); });
    expect(await screen.findByText('Add someone to the list!')).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/add-person');
  });
  it('should redirect the page when a person card is clicked', async () => {
    const { history } = renderWithRouter(<App />);
    await goToDashboard();
    const btns = screen.getAllByRole('button');
    await act(async () => { userEvent.click(btns[0]); });
    const peopleCard = await screen.findAllByTestId('people-btn');
    userEvent.click(peopleCard[0]);
    expect(await screen.findByText(`${person.first_name} ${person.last_name}`)).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe(`/${person.id}`);
  })
});
