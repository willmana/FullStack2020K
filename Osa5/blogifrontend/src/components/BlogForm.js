import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      title:
      <input
        id='title'
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      author:
      <input
        id='author'
        value={author}
        onChange={handleAuthorChange}
      />
      <br />
      url:
      <input
        id='url'
        value={url}
        onChange={handleUrlChange}
      />
      <br />
      <button id='create-button'type="submit">create</button>
    </form>
  )
}

export default BlogForm