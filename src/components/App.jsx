import React, { useEffect, useState } from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

export default function App() {
  
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');



useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = filter => {
    setFilter(filter);
  };

  const handleAddContact = contact => {
    const existingContact = contacts.find(c => c.name === contact.name);

    if (existingContact) {
      alert('Такий контакт вже існує!');
      return;
    }

    setContacts(prevState => [...prevState, contact]);
  };

  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(c => c.id !== id));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <form className="form_feedback">
      <h1 className="title">Phonebook</h1>
      <ContactForm contacts={contacts} onAddContact={handleAddContact} />
      <div className="container_render">
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </form>
  );
}
