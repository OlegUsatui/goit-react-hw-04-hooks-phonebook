import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import Form from "./components/Form/Form";
import "./App.css";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filterContacts, setFilterContacts] = useState("");

  const addContact = ({ name, number }) => {
    const newContact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    const existName = contacts.map((contact) => contact.name).includes(name);

    if (existName) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts((prev) => [newContact, ...prev]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const filterOnContacts = (e) => {
    setFilterContacts(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filterContacts.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filterContacts} onChange={filterOnContacts} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContacts={deleteContact}
      />
    </div>
  );
};

export default App;
