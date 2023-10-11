import { useState } from 'react'

const Blog = ({ blog, handleBlogLikes, handleRemoveBolg }) => {
  const [view , setView] = useState(false)

  const displayView = { display: view ? '' : 'none' }
  const addLike = () => handleBlogLikes(blog)
  const handleRemove = () => handleRemoveBolg(blog)

  return  <div style={{ outline: 'solid grey', padding: '8px 2px', margin: '8px' }}>
    {blog.title}
    {blog.author}
    <button onClick={() => setView(!view)}>{view ? 'Hide' : 'View'}</button>
    <div style={displayView}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.likes}<button onClick={addLike}>like</button></div>
      <div>{blog.url}</div>
      <div>{blog.users[0].name}</div>
      <button onClick={handleRemove}>Remove</button>
    </div>

  </div>
}

export default Blog