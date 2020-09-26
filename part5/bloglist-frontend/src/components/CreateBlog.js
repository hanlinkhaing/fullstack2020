import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const create = async (event) => {
        event.preventDefault();
        const result = await blogService.create({title, author, url})
        if (result instanceof Error) {
            props.setMessage({isError: true, value: result.message})
            setTimeout(() => props.setMessage({isError: false, value: null}), 5000)
        } else {
            props.addCreatedBlog(result)
            setTitle('')
            setAuthor('')
            setUrl('')
            props.setMessage({isError: false, value: `a new blog ${result.title} by ${result.author} added`})
            setTimeout(() => props.setMessage({isError: false, value: null}), 5000)
        }
        
    }

    return (
        <div>
            <form onSubmit={create}>
                <div>
                    title: <input type="text" value={title} onChange={({target}) => setTitle(target.value)}></input>
                </div>
                <div>
                    author: <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}></input>
                </div>
                <div>
                    url: <input type="text" value={url} onChange={({target}) => setUrl(target.value)}></input>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBlog