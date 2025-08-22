import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [ name , setName ] = useState("");
   const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ loading ,setLoading]= useState(false);

    /* creating a function for user authentication  */
    const user_auth = async (event)=>{
      event.preventDefault();
      setLoading(true);
      if(signState==="Sign In"){
        await login(email,password);
      }
      else{
        await signup(name , email , password);
      }
      setLoading(false);
    }

 { /*Importing useState from React Library*/}
  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form >
         { /*Adding the feature that remove Your name placeholder if the state is sign in  */}
          {signState === "Sign Up"? 
          <input value={name} onChange={(e)=>{setName(e.target.value)}} 
          type="text" placeholder='Your Name' /> : <></>}
         
          <input  value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
          <input  value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder='Password' />
          {/*We need to put signState in curly braces because 
           anything inside tags is treated as a regular string 
           unless you wrap it in curly braces*/}

          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me </label>
            </div>
            <p>Need Help?</p>
          </div>





        </form>
        <div className="form-switch">
          {/*Showing Sign up and new to netflix in Sign In panel by using ternary operator*/ }
          {signState=== "Sign In"?
          <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p> :
          <p>Already have a Account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
                                                                  }
        </div>
      </div>
    </div>
  )
}

export default Login
