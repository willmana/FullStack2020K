import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState()
  const [user, setUser] = useState(null)


  useEffect(() => {
    async function renderBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    renderBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessageType(1)
      setErrorMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageType(2)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setMessageType(1)
    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const addBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      setMessageType(1)
      setErrorMessage(`Added ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {

    }

  }

  return (
    <div>
      <Notification message={errorMessage} id={messageType} />
      {user === null ? <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
        : <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <br />
          <Togglable buttonLabel='Create blog'>
            <h2>create new</h2>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <Blogs blogs={blogs} /></div>}

    </div>
  )
}

export default App