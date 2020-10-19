import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Message = (props) => {
  const message = useSelector(state => state.message)

  return message.value && (<Alert id="message" variant={message.isError? 'danger': 'success'}>{message.value}</Alert>)
}

export default Message