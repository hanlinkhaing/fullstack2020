import { useState } from 'react'

export const useField = (type) => {
    const [ value, setValue ] = useState('')

    const onChange = (event) => {
        event.preventDefault()
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}