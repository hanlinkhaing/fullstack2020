import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    personService.getAll().then(data => {
      setPersons(data);
    })
  }

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService.update(person.id, { ...person, number: newNumber}).then(data => {
          setPersons(persons.map(p => person.id === p.id? data: p));
        })
      } else return
    else {
      personService.create({ name: newName, number: newNumber }).then(data => {
        setPersons(persons.concat(data));
      })
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
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
