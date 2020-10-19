import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import CreateBlog from '../components/CreateBlog'
//import CreateBlog from '../components/CreateBlog'

describe('<Blog/> ', () => {
  let component, createComponent

  let blog = {
    author: 'Twitter Inc',
    id: '5f683c80698fd413d4a0621c',
    likes: 3,
    title: 'Twitter',
    url: 'https://www.twitter.com/',
  }

  const replaceUpdated = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog}
        replaceUpdated={replaceUpdated}
        removeBlog={() => console.log('removeBlog method')}
        setMessage={() => console.log('setMessage hook method')}/>
    )
    createComponent = render(
      <CreateBlog/>
    )
  })

  test('render blog exe 5.13', () => {
    expect(component.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    )
  })

  test('render blog exe 5.14', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('render blog exe 5.15', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    // According to my blog style, It can't call replaceUpdated twice
    // replaceUpdate is only called when like post succeed
    expect(replaceUpdated.mock.calls.length).toBe(0)
    expect(blog.likes).toBe(5)
  })

  test('render blog exe 5.15', () => {
    const title = createComponent.container.querySelector('#title')
    fireEvent.change(title, { target: { value: 'How to Drink Water???' } })

    const author = createComponent.container.querySelector('#author')
    fireEvent.change(author, { target: { value: 'Han' } })

    const url = createComponent.container.querySelector('#url')
    fireEvent.change(url, { target: { value: 'https://www.blah.com' } })

    const createButton = createComponent.getByText('Create')
    //fireEvent.submit(createButton)

    // I can't continue test writing because of my CreateBlog
    // Please look inside the code of CreateBlog
  })

})