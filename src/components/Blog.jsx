import { useState } from 'react'

const Blog = ({ blog, handleBlogLikes, handleRemoveBolg }) => {
  const [view , setView] = useState(false)

  const displayView = { display: view ? '' : 'none' }
  const addLike = () => handleBlogLikes(blog)
  const handleRemove = () => handleRemoveBolg(blog)

  return  <div className='blog' style={{ outline: 'solid grey', padding: '8px 2px', margin: '8px' }}>
    <span className='blogTitle'>{blog.title}</span>
    <span>{blog.author}</span>
    <button id='view' onClick={() => setView(!view)}>{view ? 'Hide' : 'View'}</button>
    <div className='detailBlog' style={displayView}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div id='like'>{blog.likes}<button id='likeButton' onClick={addLike}>like</button></div>
      <div>{blog.url}</div>
      <div>{blog.users[0].username}</div>
      {
        blog.users[0].username===JSON.parse(window.localStorage.getItem('appUser')).username
        && <button id='remove' onClick={handleRemove}>Remove</button>
      }
    </div>

  </div>
}

export default Blog