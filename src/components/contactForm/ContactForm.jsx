import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default function ContactForm({ onAddContact }) {
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    onAddContact(contact);

    setName('');
    setNumber('');
  };

  return (
    <div className="container">
      <h3 className="title">Name</h3>
      <input
        className="input_name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters and apostrophes, and must start and end with a letter."
        required
      />
      <h3 className="title">Number</h3>
      <input
        className="input_number"
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="^[0-9]{3}-[0-9]{2}-[0-9]{2}$"
        title="Number must be in format 000-00-00"
        required
      />
      <button className="button" type="submit" onClick={handleSubmit}>
        Add contact
      </button>
    </div>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
