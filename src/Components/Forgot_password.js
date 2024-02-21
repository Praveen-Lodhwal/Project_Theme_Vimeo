
import React from 'react'

function Forgot_password() {



  return (
    <div>
      <div className="bg-light full-height">
        <div className="login-main-left" >
          <div className="text-center mb-5 login-main-left-header pt-4" >
            <img src="img/favicon.png" className="img-fluid" alt="LOGO" style={{marginTop:"50px"}}/>
            <h5 className="mt-3 mb-3">Reset Password</h5>
            <p>It is a long established fact that a reader <br /> will be distracted by the readable.</p>
          </div>

          <form >
            <div className="form-group">
              <label>Enter Email</label>
              <input type="text" placeholder="Enter Email" className="form-control"/>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-outline-primary btn-block btn-sm">Reset Password</button>
            </div>
          </form>

          <div className="text-center mt-5">
            <p className="light-gray">Don’t have an account? <a href="register.html">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgot_password
