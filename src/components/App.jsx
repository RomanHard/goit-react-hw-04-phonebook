import React from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

export default function App() {
  const [contacts, setContacts] = React.useState([]);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    const contactsFromStorage = localStorage.getItem('contacts');
    if (contactsFromStorage) {
      setContacts(JSON.parse(contactsFromStorage));
    }
  }, []);

  React.useEffect(() => {
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

// export default class App extends React.Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contactsFromStorage = localStorage.getItem('contacts');
//     if (contactsFromStorage) {
//       this.setState({ contacts: JSON.parse(contactsFromStorage) });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleFilterChange = filter => {
//     this.setState({ filter });
//   };

//   handleAddContact = contact => {
//     const existingContact = this.state.contacts.find(
//       c => c.name === contact.name
//     );

//     if (existingContact) {
//       alert('Такий контакт вже існує!');
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//   };

//   handleDeleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(c => c.id !== id),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     const filteredContacts = contacts.filter(c =>
//       c.name.toLowerCase().includes(normalizedFilter)
//     );

//     return (
//       <form className="form_feedback">
//         <h1 className="title">Phonebook</h1>
//         <ContactForm
//           contacts={this.state.contacts}
//           onAddContact={this.handleAddContact}
//         />
//         <div className="container_render">
//           <h2>Contacts</h2>
//           <p>Find contacts by name</p>
//           <Filter filter={filter} onFilterChange={this.handleFilterChange} />
//           <ContactList
//             contacts={filteredContacts}
//             onDeleteContact={this.handleDeleteContact}
//           />
//         </div>
//       </form>
//     );
//   }
// }
