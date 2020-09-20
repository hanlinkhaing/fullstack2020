import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/PersonService";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({
    isError: false,
    message: null,
  });

  const hook = () => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  };

  useEffect(hook, []);

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person)
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, { ...person, number: newNumber })
          .then((data) => {
            if (data instanceof Error) {
              addMessage({ isError: true, message: `${data.message}` });
            } else {
              setPersons(persons.map((p) => (person.id === p.id ? data : p)));
              addMessage({
                isError: false,
                message: `Updated ${data.name} with ${data.number}`,
              });
            }
          });
      } else return;
    else {
      personService
        .create({ name: newName, number: newNumber })
        .then((data) => {
          if (data instanceof Error) {
            addMessage({ isError: true, message: `${data.message}` });
          } else {
            setPersons(persons.concat(data));
            addMessage({ ...message, message: `Added ${data.name}` });
          }
        });
    }
  };

  const filterName = (event) => {
    setFilter(event.target.value);
  };

  const filtedList = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const deleteHandler = (id) => {
    personService.deletePerson(id).then((data) => {
      if (data instanceof Error) {
        addMessage({ isError: true, message: `${data.message}` });
      } else {
        setPersons(persons.filter((person) => person.id !== id));
        addMessage({ isError: false, message: `Successfully Deleted` });
      }
    });
  };

  const addMessage = (obj) => {
    setMessage(obj);
    setTimeout(() => setMessage({ isError: false, message: null }), 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter value={filter} handler={filterName} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        changeName={changeNewName}
        number={newNumber}
        changeNumber={changeNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filtedList} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;
