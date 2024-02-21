import React, { useState } from 'react'
import Asidebar from './Asidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload_videos(){
  const [channel_name, setchannel_name] = useState("");
  const [video_name, setvideo_name] = useState("");
  const [category_type, setcategory_type] = useState("");
  const [user_video, setuser_video] = useState("");
  const [video_thumbnail, setvideo_thumbnail] = useState("");
  const [desc, setdesc] = useState("");
  const [time_zone, settime_zone] = useState("");

  const userid = localStorage.getItem("_id")
  const channel_id = localStorage.getItem("channel_id")
  
  const navigate = useNavigate();

  const handle_upload_video = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("channel_id", channel_id);
    formData.append("channel_name", channel_name);
    formData.append("video_name", video_name);
    formData.append("category_type", category_type);
    formData.append("user_video", user_video);
    formData.append("video_thumbnail", video_thumbnail);
    formData.append("desc", desc);
    formData.append("time_zone", time_zone);

    console.log(formData)

    axios.post("http://103.104.74.215:3003/api/upload_video",formData).then((res)=>{
      console.log("asd",res)
      navigate("/home")
      }).catch((error)=>{
      console.log("error",error)
    })
  }

  return(
    <div>
      <Asidebar/>
      <div id="content-wrapper" style={{marginLeft:'240px' , marginTop:'15px'}}>
        <div className="container-fluid upload-details">
          <form onSubmit={handle_upload_video}>
            <div className="row">
              <div className="col-lg-12">
                <div className="main-title">
                  <h6>Video Upload</h6>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="imgplace" />
              </div>
              <div className="col-lg-10">
                <div className="osahan-title">Contrary to popular belief, Lorem Ipsum (2020) is not.</div>
                <div className="osahan-size">102.6 MB . 2:13 MIN Remaining</div>
                <div className="osahan-progress">
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}} />
                  </div>
                  <div className="osahan-close">
                    <a href="#"><i className="fas fa-times-circle" /></a>
                  </div>
                </div>
                <div className="osahan-desc">Your Video is still uploading, please keep this page open until it's done.</div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-12">
                <div className="osahan-form">
                  <div className="row">                  
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label >Channel Name</label>
                        <input type="text" value={channel_name} onChange={((e)=>{setchannel_name(e.target.value)})} className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label >Video Name</label>
                        <input type="text" value={video_name} onChange={((e)=>{setvideo_name(e.target.value)})} className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Category type</label>
                        <input type="text" value={category_type} onChange={((e)=>{setcategory_type(e.target.value)})} className="form-control" />
                      </div>
                    </div>  
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>User Video</label>
                        <input type="file" accept="video/*"  onChange={((e)=>{setuser_video(e.target.files[0])})}  id="e1" className="form-control" />
                      </div>
                    </div>                         
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Video_thumbnail</label>
                        <input type="file" accept="image/*"  onChange={((e)=>{setvideo_thumbnail(e.target.files[0])})}  id="e1" className="form-control" />
                      </div>
                    </div>                                      
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Time Zone</label>
                        <input type="time" value={time_zone} onChange={((e)=>{settime_zone(e.target.value)})}  id="e1" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea type="text" value={desc} onChange={((e)=>{setdesc(e.target.value)})} className="form-control" />
                      </div>
                    </div>            
                  </div>
                </div>
                <div className="osahan-area text-center mt-3">
                  <button  type="submit" className="btn btn-primary" style={{background: '#000080', borderRadius: '4px'}}>Upload </button>
                </div>                          
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Upload_videos
