import React from "react";

const Countries = ({ list, filter }) => {
  return (
    <div>
      {list.map((c, i) => (
        <p key={i}>
          {c.name} <button onClick={filter(c.name)}> show </button>
        </p>
      ))}
    </div>
  );
};

export default Countries;
