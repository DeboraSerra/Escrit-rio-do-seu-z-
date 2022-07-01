import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PersonCard from '../Components/PersonCard';
import { MyContext } from '../context/Provides';
import style from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [state, setState] = useState({
    query: '',
    clicked: false,
    storageUser: '',
  })
  const { query, clicked, storageUser } = state;
  const { user, getPeople, renderPeople, setRenderPeople } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const logged = localStorage.getItem('logged');
    if (!logged) return history.push('/login');
    const getUser = localStorage.getItem('user');
    setState({
      ...state,
      storageUser: getUser,
    })
  }, [])

  const handleChange = ({ target: { value } }) => {
    setState({
      ...state,
      query: value,
    })
  }

  const handleClick = () => {
    getPeople();
    setState({
      ...state,
      clicked: true,
    })
  }

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    if (query) {
      setRenderPeople(query.toLowerCase());
    }
  }, [query])

  return (
    <main className={ style.main }>
      <header className={ style.header }>
        <h1>Hello! {user || storageUser}</h1>
        <button className={ style.button } type="button" onClick={ handleClick }> Wanna see some people? Click here!</button>
        <button className={ style.button } type="button" onClick={ () => history.push('/add-person') }>Add a new person</button>
        <button className={ style.button } type="button" onClick={ logOut }>Log out</button>
      </header>
      {clicked && (
        <section className={ style.peopleSect }>
          <input
            className={ style.input }
            type="text"
            name="query"
            placeholder="Find someone by name"
            aria-label="Type the name to find someone"
            value={ query }
            onChange={ handleChange }
          />
          <section className={ style.peopleBtns }>
            {renderPeople?.map((person) => (
              <button
                className={ style.personBtn }
                data-testid="people-btn"
                type="button"
                key={ person.id }
                id={ person.id }
                onClick={ () => history.push(`/${person.id}`)}
              >
                <PersonCard name={ `${person.first_name} ${person.last_name}` } />
              </button>
            ))}
          </section>
        </section>
      )}
    </main>
  )
}

export default Dashboard;
