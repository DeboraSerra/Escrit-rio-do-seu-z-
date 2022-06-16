import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MyContext } from '../context/Provides';
import style from '../styles/AddPerson.module.css';
import { FaHome } from 'react-icons/fa';

const UpdatePage = () => {
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
  const { updatePerson, person: p } = useContext(MyContext);
  const { id } = useParams();
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
    console.log({ isValidName, isValidEmail, isValidBirthday });
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
        city: city || p.city,
        phone: phone || p.phone,
        st: st || p.state,
        address: address || p.address,
      }
      const response = await updatePerson(id, person);
      console.log(response);
      if (!response) {
        history.push(`/${id}`)
      }
    }
  }
  return (
    sent && !error ? (
      <p>{message}</p>
    ) : (
      <form className={ style.form } onSubmit={ handleSubmit }>
        <FaHome className={ style.home } onClick={ () => history.push('/dashboard') } />
        <legend className={ style.legend }>Update person's data</legend>
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
            className={ style.input }
            id="birthday"
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
          className={ style.input }
          name="address"
          placeholder="Address"
          value={ address }
          onChange={ handleChange }
        />
        <input
          type="text"
          className={ style.input }
          placeholder="City"
          name="city"
          value={ city }
          onChange={ handleChange }
        />
        <input
          type="text"
          className={ style.input }
          placeholder="State"
          name="state"
          value={ st }
          onChange={ handleChange }
        />
        {error && <p className={ style.message }>{message}</p>}
        <button className={ style.button } type="submit" disabled={ disabled } onClick={ handleSubmit }>
          Update person
        </button>
      </form>
    )
  )
}

export default UpdatePage;
