import React, { useState, useEffect } from 'react'
import Asidebar from './Asidebar'
import './Profile_update.css'
import axios from 'axios'

function Profile_update() {
  const [upload_profile, setupload_profile] = useState("")

  const [showimage, setshowiamge] =useState("")
  
  const userid = localStorage.getItem("_id")

  const data = {
    _id : userid
  }
    
  const handleprofile = (e) =>{
    e.preventDefault();

    const formData= new FormData();
    formData.append("_id", userid);
    formData.append("profile_image", upload_profile);

    axios.post("http://103.104.74.215:3003/api/upload_user_image", formData).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    axios.post("http://103.104.74.215:3003/api/view_profile", data).then((res)=>{
      console.log(res.data?.data)
      setshowiamge(res.data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[showimage])

  return (
    <>
      <Asidebar/>
      <div style={{marginLeft:'250px', marginRight:'15px', marginTop:'15px'}}>
        <div className='update_box'>
          <form onSubmit={handleprofile}>
            <img className="profile_img" src={`http://103.104.74.215:3003/uploads/` + showimage?.profile_image?.filename} alt="Your Image"/>
            <input type="file" accept="image/*" onChange={((e)=>{setupload_profile(e.target.files[0])})}/>
            <button type='subimt' className='btn btn-success' >Update</button>
          </form>          
        </div>
      </div>
    </>
  )
}

export default Profile_update
