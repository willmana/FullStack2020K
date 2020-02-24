import React, { useState } from 'react'

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
            <div style={hideWhenVisible} className='pintatiedot'>
                {blog.title}, {blog.author}
                <button id='view'onClick={toggleVisibility}> view </button>
            </div>
            <div style={showWhenVisible} className='tarkemmat'>
                {blog.title}, {blog.author}
                <button onClick={toggleVisibility}> hide </button>
                <br />
                {blog.url}
                <br />
                likes {blog.likes}
                <button id='like'onClick={() => like(blog)}> like </button>
                <br />
                {blog.user.name}
                <br />
                {blog.user.name === user.name && <button onClick={() => deletion(blog)}> remove </button>}
            </div>
        </div>
    )
}

export default Blog