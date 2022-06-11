import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { MyContext } from '../context/Provides';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    disabled: true,
  })

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
  }, [state.name, state.email, state.password]);

  const validateFields = () => {
    const isValidEmail = state.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const isValidPass = state.password.match(/\w+/g);
    if (isValidEmail && isValidPass) {
      setState({
        ...state,
        disabled: false,
      })
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    const { email, password } = state;
    setUser({ email, password });
    history.push('/dashboard');
  }

  return (
    <form onSubmit={ handleClick }>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        aria-label="Type your email"
        value={ state.email }
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Type your password"
        value={ state.password }
        onChange={ handleChange }
      />
      <button
        type="submit"
        onClick={ handleClick }
        disabled={ state.disabled }
      >
        Log in
      </button>
      <Link to="/register">Register</Link>
    </form>
  )
}

export default Login;
