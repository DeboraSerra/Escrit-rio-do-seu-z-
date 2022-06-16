import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MyContext } from '../context/Provides';
import style from '../styles/AddPerson.module.css';
import { FaHome } from 'react-icons/fa';

const AddPerson = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    city: '',
    email: '',
    phone: '',
    state: '',
    address: '',
    disabled: true,
    error: false,
    message: '',
    sent: false,
  });
  const { firstName, lastName, birthday, city, email, phone,
    state: st, address, disabled, sent, error, message } = state;
  const { addPerson } = useContext(MyContext);
  const history = useHistory();

  const handleChange = ({ target }) => {
    let { name, value } = target;
    setState({
      ...state,
      [name]: value,
    })
  }

  useEffect(() => {
    const isValidName = firstName && lastName;
    const isValidEmail = email && email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const isValidBirthday = birthday && birthday.match(/^\d{4}-\d{2}-\d{2}/g);
    if (isValidBirthday && isValidName && isValidEmail) {
      setState({
        ...state,
        disabled: false,
      })
    }
  }, [firstName, lastName, email, birthday])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!disabled) {
      const person = {
        firstName,
        lastName,
        birthday,
        email,
        city,
        phone,
        st,
        address,
      }
      const response = await addPerson(person)
      if (response && response.message) {
        setState({
          ...state,
          error: true,
          message: response.message,
        });
        return;
      }
      history.push(`/dashboard`)
    }
  }

  const goHome = () => {
    history.push('/dashboard');
  }
  
  return (
    sent && !error ? (
      <p>{message}</p>
    ) : (
      <form className={ style.form } onSubmit={ handleSubmit }>
        <FaHome className={ style.home } onClick={ goHome } />
        <legend className={ style.legend }>Add someone to the list!</legend>
        <input
          className={ style.input }
          type="text"
          name="firstName"
          value={ firstName }
          placeholder="First name"
          onChange={ handleChange }
        />
        <input
          type="text"
          className={ style.input }
          name="lastName"
          placeholder="Last name"
          value={ lastName }
          onChange={ handleChange }
        />
        <input
          type="email"
          className={ style.input }
          name="email"
          placeholder="E-mail"
          value={ email }
          onChange={ handleChange }
        />
        <label className={ style.label } htmlFor="birthday">Birthday
        {' '}
          <input
            id="birthday"
            className={ style.input }
            type="date"
            name="birthday"
            value={ birthday }
            onChange={ handleChange }
          />
        </label>
        <input
          type="text"
          className={ style.input }
          placeholder="Phone"
          name="phone"
          value={ phone }
          onChange={ handleChange }
        />
        <input
          type="text"
          name="address"
          className={ style.input }
          placeholder="Address"
          value={ address }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="City"
          className={ style.input }
          name="city"
          value={ city }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="State"
          className={ style.input }
          name="state"
          value={ st }
          onChange={ handleChange }
        />
        {error && <p className={ style.message }>{message}</p>}
        <button className={ style.button } type="submit" disabled={ disabled } onClick={ handleSubmit }>Add person</button>
      </form>
    )
  )
}

export default AddPerson;
