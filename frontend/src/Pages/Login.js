import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { MyContext } from '../context/Provides';
import style from '../styles/Login.module.css';

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
    } else {
      setState({
        ...state,
        disabled: true,
      })
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!disabled) {
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
  }

  return (
    <form onSubmit={ handleClick } className={ style.form }>
      <legend>Login</legend>
      <input
        className={ style.input }
        type="email"
        name="email"
        placeholder="E-mail"
        aria-label="Type your email"
        value={ email }
        onChange={ handleChange }
        data-testid="email-input"
      />
      <input
        className={ style.input }
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Type your password"
        value={ password }
        onChange={ handleChange }
        data-testid="pass-input"
      />
      <button
        className={ style.submitBtn }
        type="submit"
        onClick={ handleClick }
        disabled={ disabled }
      >
        Log in
      </button>
      <Link className={ style.link } to="/register">Register</Link>
      {error && <p data-testid="error-message" className={ style.message }>{message}</p>}
    </form>
  )
}

export default Login;
