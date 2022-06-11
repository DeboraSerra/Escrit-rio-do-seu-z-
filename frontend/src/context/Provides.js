import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    user:  '',
    token: '',
    people: [],
  });
  const { user, token, people } = state;

  const setUser = async (user) => {
    const url = `http://localhost:3005/user/login?email=${user.email}&password=${user.password}`;
    const response = await fetch(url);
    const data = await response.json();
    setState({
      ...state,
      user: data.user,
      token: data.token,
    });
    return data;
  }

  const registerUser = async (user) => {
    const url = 'http://localhost:3005/user/register';
    const obj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
    await fetch(url, obj);
  }

  const getPeople = async () => {
    const url = 'http://localhost:3005/people';
    const obj = {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }
    const response = await fetch(url, obj);
    const people = await response.json();
    setState({
      ...state,
      people,
    })
  }

  useEffect(() => {
    value.people = people;
  }, [people])

  useEffect(() => {
    value.user = user;
  }, [user])

  const value = {
    user,
    setUser,
    registerUser,
    getPeople,
    people,
  }

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
