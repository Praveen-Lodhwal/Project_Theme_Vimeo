import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){

  const [username, setusername] = useState("");
  const [email, setemail]  = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [gender, setgender] = useState("");

  const [eror, seterror] = useState("")

  const handlesubmit=((e)=> {
    e.preventDefault();

    if(!username) {
      seterror("Username is mandatory");
      return;
    }

    if(!email) {
      seterror("Email is mendatory");
      return;
    }

    if(!password) {
      seterror("Password is mendatory");
      return;
    } 

    if(!confirm_password) {
      seterror("Confirm password is blank");
      return;
    } 

    if(!gender) {
      seterror("Gender is mandatory");
      return;
    }

    if(password !== confirm_password){
      seterror("password should be match")
      return;
    }

    let formdata = {
      username : username,
      email : email,
      password : password,
      confirm_password: confirm_password,
      gender : gender, 
      fcm : "12345",
    }

    axios.post("http://103.104.74.215:3003/api/signup", formdata).then((res)=>{
      console.log(res.data)
      toast.success(res.data.msg)
      }).catch((err)=>{
      console.log("error",err)
    })   
  })

  return(
    <div>
      <ToastContainer />
      <section className="login-main-wrapper" style={{marginTop: "-50px"}}>
        <div className="container-fluid pl-0 pr-0">
          <div className="row no-gutters">
            <div className="col-md-12 p-5 bg-light full-height">
              <div className="login-main-left">
                <div className="text-center mb-5 login-main-left-header pt-4">
                  <img src="img/favicon.png" className="img-fluid" alt="LOGO" />
                  <h5 className="mt-3 mb-3">Welcome to vimeo </h5>
                </div>
                <font style={{color:"red", marginLeft:"100px"}}>{eror}</font><br/><br/>
                <form onSubmit={handlesubmit} style={{marginTop: "-25px"}}>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={username} onChange={((e)=>{setusername(e.target.value)})} className="form-control"  placeholder="Enter name" />
                  </div>                 
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email"  value={email} onChange={((e)=>{setemail(e.target.value)})} className="form-control" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="text"  value={password} onChange={((e)=>{setpassword(e.target.value)})} className="form-control" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="text" value={confirm_password} onChange={((e)=>{setconfirm_password(e.target.value)})} className="form-control" placeholder="confirm Password" />
                  </div>
                  <div>
                    <select className='form-control' value={gender} onChange={((e)=>{setgender(e.target.value)})}>
                      <option value>-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mt-4">                  
                    <button type="submit" className="btn btn-outline btn-block btn-lg" style={{backgroundColor: '#000080', color: 'white', borderRadius: '20px'}}>Sign Up</button>
                  </div>
                </form>
                <div className="text-center mt-5">
                  <p className="light-gray">Already have an Account? <Link to='/login'>Sign In</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
