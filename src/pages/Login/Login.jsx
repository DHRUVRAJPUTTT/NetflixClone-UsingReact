import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
const Login = () => {
  const [signState, setSignState] = useState("Sign In")
 { /*Importing useState from React Library*/}
  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form >
         { /*Adding the feature that remove Your name placeholder if the state is sign in  */}
          {signState === "Sign Up"? <input type="text" placeholder='Your Name' /> : <></>}
         
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          {/*We need to put signState in curly braces because 
           anything inside tags is treated as a regular string 
           unless you wrap it in curly braces*/}
          <button>{signState}</button>
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
