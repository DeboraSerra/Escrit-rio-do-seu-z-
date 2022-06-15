import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PersonCard from '../Components/PersonCard';
import { MyContext } from '../context/Provides';

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

  useEffect(() => {
    setRenderPeople(query);
  }, [query])

  return (
    <main>
      <h1>Hello! {user || storageUser}</h1>
      <p>Wanna see some people?</p>
      <button type="button" onClick={ handleClick }>Click here!</button>
      <button type="button" onClick={ () => history.push('/add-person') }>Add a new person</button>
      {clicked && (
        <section>
          <input
            type="text"
            name="query"
            placeholder="Find someone by name"
            aria-label="Type the name to find someone"
            value={ query }
            onChange={ handleChange }
          />
          <section>
            {renderPeople?.map((person) => (
              <button
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
