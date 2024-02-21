import React, { useEffect, useState } from 'react'
import Asidebar from './Asidebar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Help() {
  const [first_name , setfirst_name] = useState("");
  const [last_name , setlast_name] = useState("");
  const [email , set_email] = useState("");
  const [massage , set_massage] = useState("");

  const userid = localStorage.getItem("_id")
  
  const handleformsubmit =(e)=>{
    e.preventDefault();
    const formdata = {
      user_id : userid, 
      first_name : first_name , 
      last_name : last_name, 
      email : email, 
      massage : massage,
    }
    
    axios.post("http://103.104.74.215:3003/api/help", formdata).then((res)=>{
      console.log(res)
      toast.success(res.data.msg)
    }).catch((err)=>{
      console.log(err)
    })
  }



  return (
    <div>
      <Asidebar/>
      <div style={{marginLeft:'250px', marginRight:'15px', marginTop:'15px'}}>
        <form onSubmit={handleformsubmit}>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">firstname</label>
            <input type="text" value={first_name} onChange={(e)=>{setfirst_name(e.target.value)}} className="form-control"  placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Lastname</label>
            <input type="text" value={last_name} onChange={(e)=>{setlast_name(e.target.value)}} className="form-control" placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Email</label>
            <input type="text"value={email} onChange={(e)=>{set_email(e.target.value)}} className="form-control"  placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Massage</label>
            <textarea  value={massage} onChange={(e)=>{set_massage(e.target.value)}} className="form-control"   rows="5"/>
          </div>
          <button type="submit" class="btn btn-success" >Submit form</button>
        </form>
      </div>
    </div>
  )
}

export default Help
