import React, { useEffect, useState } from "react";
import Asidebar from "./Asidebar";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Create_channel(){
  const userid = localStorage.getItem("_id")
  
  const [profile_image, setprofile_image] = useState("")
  const [cover_image, setcover_image] = useState("")
  const [channel_name, setchannel_name] = useState("")

  const handlesubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("profile_image", profile_image);
    formData.append("cover_image", cover_image);
    formData.append("channel_name", channel_name);
    formData.append("handle", "1234545");

    axios.post(`http://103.104.74.215:3003/api/create_channel`, formData).then((res)=>{
      console.log("asasda", res)
      }).catch((error)=>{
      console.log("error",error)
    })
  }

  ///////////////  render part
  return (
    <>
      <Asidebar />
      <div style={{ marginLeft: "20px", marginRight: "20px", marginTop: "" }}>
        <div className="single-channel-page" id="content-wrapper">
          <h4>Create Channel</h4>
          <div className="single-channel-image">
            <img className="img-fluid" alt="" src="img/channel-banner.png" />
            <div className="channel-profile">
              <img className="channel-profile-img" alt="" src="img/s2.png" />
            </div>
          </div>
          <br/>
          <form onSubmit={handlesubmit} className="form-group">
            <label for="profile" className="btn btn-infoo" style={{backgroundColor: "#000080", color: "white", borderRadius: 10, width: '33%'}} >Profie Image</label><br/>
            <input type="file"  style={{opacity: "0" }} onChange={((e)=>{setprofile_image(e.target.files[0])})} id="profile"/>
            <br/>
            <label for="cover" className="btn btn-infoo" style={{backgroundColor: "#000080", color: "white", borderRadius: 10, width: '33%'}}>Cover Image</label><br/>
            <input type="file" style={{opacity: "0" }} onChange={((e)=>{setcover_image(e.target.files[0])})} id="cover"/>
            <br/>
            <label><h4>channe Name</h4></label><br/>
            <input type="text" className="form-control col-md-4" value={channel_name} onChange={((e)=>{setchannel_name(e.target.value)})}/>
            <br/><br/>
            <button type='submit' style={{backgroundColor: "#000080", color: "white", borderRadius: 10, width: '33%'}} className='btn btn-primary'>submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create_channel;
