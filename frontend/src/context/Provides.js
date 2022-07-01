import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    user:  '',
    token: '',
    people: [],
    renderPeople: [],
    person: {},
  });
  const { user, token, people, renderPeople, person } = state;

  useEffect(() => {
    const isLogged = localStorage.getItem('logged') || false;
    if (isLogged) {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      setState({
        ...state,
        user: storedUser,
        token: storedToken,
      })
    }
  }, [])

  const setUser = async (user) => {
    try {
      const url = `http://localhost:3005/user/login`;
      const obj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
      const response = await fetch(url, obj);
      const data = await response.json();
      if (data.message) return data;
      setState({
        ...state,
        user: data.user,
        token: data.token,
      });
      localStorage.setItem('logged', true);
      localStorage.setItem('user', data.user);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return err;
    }
  }

  const registerUser = async (user) => {
    try {
      const url = 'http://localhost:3005/user/register';
      const obj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
      const response = await fetch(url, obj);
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  const getPeople = async () => {
    try {
      const storageToken = localStorage.getItem('token');
      const url = 'http://localhost:3005/people';
      const obj = {
        method: 'GET',
        headers: {
          Authorization: token || storageToken,
        },
      }
      const response = await fetch(url, obj);
      const people = await response.json();
      setState({
        ...state,
        people,
        renderPeople: people,
      })
    } catch (err) {
      return err;
    }
  }

  const setRenderPeople = (text) => {
    const newSet = people.filter((p) => p.first_name.toLowerCase().includes(text.toLowerCase()));
    setState({
      ...state,
      renderPeople: newSet,
    })
  }

  const getPersonData = async (id) => {
    try {
      const storageToken = localStorage.getItem('token');
      const url = `http://localhost:3005/people/${id}`;
      const obj = {
        method: 'GET',
        headers: {
          Authorization: token || storageToken,
        },
      }
      const response = await fetch(url, obj);
      const data = await response.json();
      if (data.message) return data;
      setState({
        ...state,
        person: data,
      })
    } catch (err) {
      return err;
    }
  }

  const updatePerson = async (id, data) => {
    const storageToken = localStorage.getItem('token');
    const url = `http://localhost:3005/people/${id}`;
    const obj = {
      method: 'PUT',
      headers: {
        Authorization: token || storageToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, obj);
    let error = {};
    if (response.status !== 202) {
      error = await response.json();
    }
    if (error.message) return error;
  }

  const deletePerson = async (id) => {
    const storageToken = localStorage.getItem('token');
    const url = `http://localhost:3005/people/${id}`;
    const obj = {
      method: 'DELETE',
      headers: {
        Authorization: token || storageToken,
      },
    }
    await fetch(url, obj);
  }

  const addPerson = async (person) => {
    try {
      const storageToken = localStorage.getItem('token');
      const url = 'http://localhost:3005/people';
      const obj = {
        method: 'POST',
        headers: {
          Authorization: token || storageToken,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      }
      const response = await fetch(url, obj);
      if (response && response.message) return response;
    } catch (err) {
      console.log(err.message);
      return err;
    }
  }

  useEffect(() => {
    value.people = people;
    value.renderPeople = people;
  }, [people])

  useEffect(() => {
    value.user = user;
  }, [user])

  useEffect(() => {
    value.renderPeople = renderPeople;
  }, [renderPeople])

  useEffect(() => {
    value.person = person;
  }, [person])

  const value = {
    user,
    setUser,
    registerUser,
    getPeople,
    people,
    renderPeople,
    setRenderPeople,
    getPersonData,
    person,
    updatePerson,
    deletePerson,
    addPerson,
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
