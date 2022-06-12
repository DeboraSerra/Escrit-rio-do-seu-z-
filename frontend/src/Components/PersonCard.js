import React from 'react';

const PersonCard = ({ name }) => {
  return (
    <section>
      <h2>{name}</h2>
      <img src="https://placekitten.com/200/200" alt={ name } />
    </section>
  )
}

export default PersonCard;
