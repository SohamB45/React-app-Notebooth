import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';


export const Login = (props) =>{
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.s

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViM2E4MzNlZWJmNmQwNWY0ZWMwMTEzIn0sImlhdCI6MTcwNjI3MzMzMH0._kvgfyub9dx6EMcCH_y9pqobWMDbvRV0SoPXZ2-NJ9c"

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
  

    if(json.success){
      localStorage.setItem('token' , json.authtoken);
      history.push("/")
      props.showAlert("Successfull","success")
      }
    else {
      props.showAlert("Invalid creds","danger");

    }
  }
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    return (
      <form onSubmit={handleSubmit}>
        <div className='mt-3'>
          <h2>Welcome to NoteBooth!</h2>
        <h3 className='mt-3'>Please Login to continue</h3>
        
        <div className="mb-3 mt-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" autoFocus/> 
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
        </div>
        
         
        <button type="submit" className="btn btn-primary" >Submit <i class="fa-solid fa-check"></i></button>
        
        </div>
      </form>
    )
  

  }


  export default Login;