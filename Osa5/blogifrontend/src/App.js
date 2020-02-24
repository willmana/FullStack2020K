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
  const blogFormRef = React.createRef()

  useEffect(() => {
    async function renderBlogs() {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
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
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setMessageType(1)
      setErrorMessage(`Added ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageType(2)
      setErrorMessage('Fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const thumbsUp = async (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, changedBlog)
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
        await blogService.del(blog.id)
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
        setMessageType(1)
        setErrorMessage(`Removed ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setMessageType(2)
      setErrorMessage(
        `Blog '${blog.name}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
          <Togglable buttonLabel='Create blog' ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <Blogs blogs={blogs} like={thumbsUp} deletion={handleDelete} user={user} /></div>}
    </div>
  )
}

export default App