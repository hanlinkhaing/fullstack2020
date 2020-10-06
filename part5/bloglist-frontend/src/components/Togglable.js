/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [ show, setShow ] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleShow
    }
  })

  return (
    <div>
      {props.buttonName && (<button id="toggle" style={{ display: show? 'none': '' }} onClick={toggleShow}>{props.buttonName}</button>)}
      <div className="togglableContent" style={{ display: show? '': 'none' }}>
        {props.children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired
}

export default Togglable