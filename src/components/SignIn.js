import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom'


const SignIn = () => {

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleUsername = (e) => {

    setUserName(e.target.value)
  }

  const handleEmail = (e) => {

    setEmail(e.target.value)
  }

  const handlePassword = (e) => {

    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await history.replace(`/`)
    
    // console.log('works')
    // const body = {email, password}
    // console.log('BODY:', body)

    // try {
    //   const res = await fetch("http://localhost:8080/api/users/token", {
    //     method: 'POST',
    //     body: JSON.stringify('test@test.com'),
    //     heaaders: { "Content-Type": "application/json" }
    //   })
    //   if (!res.ok) {
    //     throw res;
    //   }
    //   const { token, user: { id, userName } } = await res.json();
    //   localStorage.setItem("LM_USER_TOKEN", token);
    //   localStorage.setItem("LM_USER_ID", id);
    //   localStorage.setItem("LM_USER_NAME", userName);
    //   // window.location.href = "/";
    // } catch (error) {
    //  console.error(error)
    // }
  }

  return (
    <div className="signin-container">

      <div className="signin-left-container">

        <div className="signin-left">
          <h1 className="site-name-text">Let's Meet!</h1>
        </div>

        <div className="catch-phrase-signin-container">
          <h1 className="catch-phrase-signin-text">
            Discover events for all the things you love.
          </h1>
        </div>

      </div>

      <div className="signin-right">

        <div className="signin-right-container">

          <div className="signin-text-container">
            <h1 className="signin-text">
                Sign In.
            </h1>
         </div>

         <div className="signin-form-container">
            <form className="signin-form" onSubmit={handleSubmit}>
              <input className="username" onChange={handleUsername} value={username} placeholder={'Username'} name="username"></input>
              <br></br>
              <input className="email" onChange={handleEmail} value={email} placeholder={'Email'} name="email"></input>
              <br></br>
              <input className="password" onChange={handlePassword} value={password} placeholder={'Password'} name="password"></input>
              <button type="submit">Log In</button>
            </form>
         </div>

        </div>

      </div>

    </div>
  )
}

export default SignIn;
