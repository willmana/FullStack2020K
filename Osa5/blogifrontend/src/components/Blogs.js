import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, like, deletion, user }) => {
  return (
    <div id='blogs'>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={like} deletion={deletion} user={user}/>
      )}
    </div>
  )

}

export default Blogs