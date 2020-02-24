import React, { useState } from 'react'

const Blogs = ({ blogs, like, deletion, user }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={like} deletion={deletion} user={user}/>
      )}
    </div>
  )

}

const Blog = ({ blog, like, deletion, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}, {blog.author}
        <button onClick={toggleVisibility}> view </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}, {blog.author}
        <button onClick={toggleVisibility}> hide </button>
        <br/>
        {blog.url}
        <br/>
                likes {blog.likes}
        <button onClick={() => like(blog)}> like </button>
        <br/>
        {blog.user.name}
        <br/>
        {blog.user.name === user.name && <button onClick={() => deletion(blog)}> remove </button>}
      </div>
    </div>
  )
}


export default Blogs