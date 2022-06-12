import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { MyContext } from '../context/Provides';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    disabled: true,
    error: false,
    message: '',
  })
  const { email, password, disabled, error, message } = state;

  const { setUser } = useContext(MyContext);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  }
  useEffect(() => {
    validateFields();
  }, [email, password]);

  const validateFields = () => {
    const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const isValidPass = password.match(/\w+/g);
    if (isValidEmail && isValidPass) {
      setState({
        ...state,
        disabled: false,
      })
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await setUser({ email, password });
    if (response.message) {
      setState({
        ...state,
        error: true,
        message: response.message,
      });
      return;
    }
    history.push('/dashboard');
  }

  return (
    <form onSubmit={ handleClick }>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        aria-label="Type your email"
        value={ email }
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Type your password"
        value={ password }
        onChange={ handleChange }
      />
      <button
        type="submit"
        onClick={ handleClick }
        disabled={ disabled }
      >
        Log in
      </button>
      <Link to="/register">Register</Link>
      {error && <p>{message}</p>}
    </form>
  )
}

export default Login;
