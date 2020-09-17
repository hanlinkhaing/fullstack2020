import React from "react";

const PersonForm = ({ name, changeName, number, changeNumber, addPerson }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={name.newName} onChange={changeName} />
    </div>
    <div>
      number: <input value={number.newNumber} onChange={changeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
