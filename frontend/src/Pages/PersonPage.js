import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MyContext } from '../context/Provides';

const PersonPage = () => {
  const [state, setState] = useState({
    error: false,
    message: '',
  })
  const { error, message } = state;
  const { getPersonData, person, deletePerson } = useContext(MyContext);
  const { first_name, last_name, birthday, city, email, phone, state: st, address } = person;
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    getPersonData(id);
  }, [])

  const handleDelete = async () => {
    const response = await deletePerson(id);
    if (response) {
      setState({
        error: true,
        message: response.message,
      });
      return;
    }
    history.push('/dashboard');
  }
  return (
    <main>
      <button type="button" onClick={ () => history.push(`/${id}/update`)}>Update data</button>
      <button type="button" onClick={ handleDelete }>Delete person</button>
      {error && <p>{message}</p>}
      <h1>{`${first_name} ${last_name}`}</h1>
      <img src="https://placekitten.com/350/350" alt={ `Cat to represent ${first_name} ${last_name}` } />
      <p>Birthday: {birthday}</p>
      <h2>Contacts</h2>
      <ul>
        <li>{email}</li>
        <li>{phone}</li>
      </ul>
      <h2>Where to find</h2>
      <p>{address}</p>
      <p>{`${city}/${st}`}</p>
    </main>
  )
}

export default PersonPage;
