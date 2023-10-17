import { useState } from 'react'


const CreateBlog = ({ createNewBlog }) => {
  const [author, setAuthor] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [url, setUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author:author,
      likes: blogLikes,
      url: url,
    }

    createNewBlog(blogObject)

    setBlogTitle('')
    setAuthor('')
    setBlogLikes('')
    setUrl('')
  }



  return <form onSubmit={handleCreateBlog}>
    <div>
            Blog Title:
      <input
        name="blogTitle"
        type="text"
        placeholder='title'
        value={blogTitle}
        onChange={({ target }) => setBlogTitle(target.value)}
        required
      />
    </div>
    <div>
            Author:
      <input
        name="author"
        type="text"
        placeholder='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        required
      />
    </div>
    <div>
            URL:
      <input
        name="url"
        type="text"
        placeholder='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        required
      />
    </div>
    <div>
            Likes:
      <input
        name="likes"
        type="text"
        placeholder='likes'
        value={blogLikes}
        onChange={({ target }) => setBlogLikes(target.value)}
      />
    </div>
    <button type="submit">Create New Blog</button>
  </form>

}

export default CreateBlog