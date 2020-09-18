import React from "react";

const Persons = ({ persons, deleteHandler }) => {

  const confirm = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) deleteHandler(person.id);
  }

  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {`${person.name} ${person.number}`} <button onClick={confirm(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
