import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import CreateBlog from './components/createBlog'
import ToggleableButton from './components/toggleableButton'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState('')
  const [appUser, setAppUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const appUserInLocalStorage = window.localStorage.getItem('appUser')
    if (appUserInLocalStorage){
      const retrievedUser = JSON.parse(appUserInLocalStorage)
      setAppUser(retrievedUser)
      blogService.setToken(retrievedUser.userToken)
    }
  }, [])

  const blogFormRef = useRef()

  const createNewBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      const newBlog = await blogService.addResource(blogObject)
      setBlogs(blogs.concat({ ...newBlog, users:[{ name:appUser.name }] }))
      console.log(blogs)
      setSuccessMessage(`${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => setSuccessMessage(null), 5000)
    }catch(exemption){
      console.log(exemption.message)
      setErrorMessage(exemption.message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleBlogLikes = async (blog) => {
    const modifiedBlog = { ...blog }
    modifiedBlog.likes = modifiedBlog.likes + 1
    try{
      const updatedBlog = await blogService.modifyBlog(modifiedBlog)
      setBlogs(blogs.map(blog => blog.id === modifiedBlog.id ? modifiedBlog : blog))
      if (updatedBlog){
        setSuccessMessage(`You like "${modifiedBlog.title}"`)
        setTimeout(() => setSuccessMessage(null), 5000)
      }
    }catch(exemption){
      setErrorMessage(exemption.message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleRemoveBlog = async(blog) => {
    try{
      const deleteConfimed = confirm(`Are you sure, you want to delete "${blog.title}"`)
      if(deleteConfimed) {
        const deletedBlog = await blogService.removeBlog(blog)
        setBlogs(blogs.filter(item => item.id !== blog.id))
        setSuccessMessage(`"${blog.title}" is deleted`)
        setTimeout(() => setSuccessMessage(null), 5000)
      }
    }catch(exemption){
      setErrorMessage(exemption.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const blogForm = () => {
    <ToggleableButton buttonLabel="Add New Blog" ref={blogFormRef}>
      <CreateBlog createNewBlog={createNewBlog} />
    </ToggleableButton>
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('appUser')
    setAppUser(null)
  }



  const handleChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      {
        appUser === null
          ? <ToggleableButton buttonLabel="Login Here">
            <Login
              setAppUser={setAppUser}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </ToggleableButton>

          : <div>
            <h3>
              {appUser.name} Logged in
              <button onClick={logoutHandler}>Logout</button>
            </h3>
            <ToggleableButton buttonLabel="Add New Blog" ref={blogFormRef}>
              <CreateBlog createNewBlog={createNewBlog} />
            </ToggleableButton>
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleBlogLikes={handleBlogLikes} handleRemoveBolg={handleRemoveBlog}/>
            )}
          </div>
      }
    </div>
  )
}

export default App