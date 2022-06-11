import React, { useContext } from 'react';
import { MyContext } from '../context/Provides';

const Dashboard = () => {
  const { user, getPeople, people } = useContext(MyContext);
  return (
    <main>
      <h1>Hello! {user}</h1>
      <p>Wanna see some people?</p>
      <button type="button" onClick={ getPeople }>Click here!</button>
      <section>
        {people?.map((person) => (
          <section key={ person.id } id={ person.id }>
            <h2>{`${person.first_name} ${person.last_name}`}</h2>
            <p>{person.birthday}</p>
            <ul>
              <h3>Contacts</h3>
              <li>{person.email}</li>
              <li>{person.phone}</li>
            </ul>
            <p>{person.address}</p>
            <p>{person.city}/{person.state}</p>
          </section>
        ))}
      </section>
    </main>
  )
}

export default Dashboard;
