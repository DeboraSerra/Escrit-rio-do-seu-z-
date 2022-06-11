import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provides';

const Register = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    sec_pass: '',
    disabled: true,
  });
  const { registerUser } = useContext(MyContext);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  useEffect(() => {
    validateFields();
  }, [state.name, state.email, state.password, state.sec_pass]);

  const validateFields = () => {
    const { name, email, password, sec_pass } = state;
    const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const isValidPass = password.match(/\w+\W+/g) && password === sec_pass;
    if (name && isValidEmail && isValidPass) {
      setState({
        ...state,
        disabled: false,
      })
    }
  }
  const handleSubmit = () => {
    const { name, email, password } = state;
    console.log({email});
    registerUser({ name, email, password });
    history.push('/');
  }
  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="name"
        value={ state.name }
        placeholder="Name"
        aria-label="Type your name"
        onChange={ handleChange }
      />
      <input
        type="text"
        name="email"
        value={ state.email }
        placeholder="E-mail"
        aria-label="Type your email"
        onChange={ handleChange }
      />
      <input
        type="text"
        name="password"
        value={ state.password }
        placeholder="Password"
        aria-label="Type your password"
        onChange={ handleChange }
      />
      <input
        type="text"
        name="sec_pass"
        value={ state.sec_pass }
        placeholder="Confirm password"
        aria-label="Type your password again"
        onChange={ handleChange }
      />
      <button
        type="submit"
        onClick={ handleSubmit }
        disabled={ state.disabled }
      >
        Send
      </button>
    </form>
  )
}

export default Register;
