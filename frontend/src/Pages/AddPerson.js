import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MyContext } from '../context/Provides';

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
  return (
    sent && !error ? (
      <p>{message}</p>
    ) : (
      <form onSubmit={ handleSubmit }>
        <legend>Add someone to the list!</legend>
        <input
          type="text"
          name="firstName"
          value={ firstName }
          placeholder="First name"
          onChange={ handleChange }
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={ lastName }
          onChange={ handleChange }
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={ email }
          onChange={ handleChange }
        />
        <label htmlFor="birthday">Birthday</label>
        <input
          id="birthday"
          type="date"
          name="birthday"
          value={ birthday }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={ phone }
          onChange={ handleChange }
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={ address }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={ city }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          value={ st }
          onChange={ handleChange }
        />
        {error && <p>{message}</p>}
        <button type="submit" disabled={ disabled } onClick={ handleSubmit }>Add person</button>
      </form>
    )
  )
}

export default AddPerson;
