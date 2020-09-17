import React, { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else 
      setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const filterName = (event) => {
    setFilter(event.target.value);
  };

  const filtedList = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

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
      <Persons persons={filtedList} />
    </div>
  );
};

export default App;
