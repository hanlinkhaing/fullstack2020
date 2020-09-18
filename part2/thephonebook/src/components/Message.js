import React from "react";

const success = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 5,
  marginBottom: 10,
};

const error = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  };
const Message = ({ message }) => (
  <div>
    { message.message ? (<p style={message.isError? error: success}>{message.message}</p>): <></>}
  </div>
);

export default Message;
