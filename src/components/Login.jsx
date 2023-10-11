import { useState } from 'react'
import blogService from '../services/blogs'
import userLogin from '../services/userLogin'

const Login = ({ setErrorMessage, setSuccessMessage, setAppUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async(event) => {
    event.preventDefault()

    try {
      const user = await userLogin({ username, password })
      window.localStorage.setItem('appUser',JSON.stringify(user))
      blogService.setToken(user.userToken)
      setUsername('')
      setPassword('')
      setAppUser(user)
      setSuccessMessage(`Welcome ${user.name}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch(exemption){
      setErrorMessage('Wrong Credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }



  return  <form  onSubmit={loginHandler}>
    <div>
                    Username:
      <input
        type="text"
        name="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        required
      />
    </div>

    <div>
                    Password:
      <input
        type="password"
        name="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        required
      />
    </div>
    <button type="submit">Login</button>
  </form>

}

export default Login