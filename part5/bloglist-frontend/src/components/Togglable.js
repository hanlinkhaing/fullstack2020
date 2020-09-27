import React, { useState, useImperativeHandle } from 'react'

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
            {props.buttonName && (<button style={{display: show? 'none': ''}} onClick={toggleShow}>{props.buttonName}</button>)}
            <div style={{display: show? '': 'none'}}>
                {props.children}
            </div>
        </div>
    )
})

export default Togglable