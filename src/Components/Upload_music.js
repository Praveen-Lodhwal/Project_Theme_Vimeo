import React, { useState } from 'react'
import Asidebar from './Asidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload_music(){
  const [music_title, setmusic_title] = useState("");
  const [music_file, setmusic_file]  = useState(null);
  const [music_thumbnail, setmusic_thumbnail]  = useState(null);
  const [time_zone, settime_zone]  = useState("");

  let userid = localStorage.getItem("_id")
  let channel_id = localStorage.getItem("channel_id")

  const navigate = useNavigate();

  const handleformsubmit=(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("channel_id", channel_id);
    formData.append("music_title", music_title);
    formData.append("music_file", music_file);
    formData.append("music_thumbnail", music_thumbnail);
    formData.append("time_zone", time_zone);
  
    console.log("FormData", formData)

    axios.post("http://103.104.74.215:3003/api/upload_music", formData).then((res)=>{
      console.log("Response", res)
      navigate("/music_player")
      toast.success(res)
    }).catch((error)=>{
      console.log(error)
    })
  }


  return(
    <>
      <Asidebar/>
      <div style={{marginLeft:'', marginRight:'15px', marginTop:'15px'}}>
        <div id="content-wrapper" style={{marginLeft:'240px' , marginTop:'15px'}}>
          <div className="container-fluid upload-details">
            <form onSubmit={handleformsubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-title">
                    <h4>Music Upload</h4>
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
                          <label >Music title</label>
                          <input type="text" value={music_title}  onChange={(e)=>{setmusic_title(e.target.value)}} className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label >Music files</label>
                          <input type="file" accept='audio/*' onChange={(e)=>{setmusic_file(e.target.files[0])}} className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label >Music thumbnail</label>
                          <input type="file" accept='image/*' onChange={(e)=>{setmusic_thumbnail(e.target.files[0])}}  className="form-control" />
                        </div>
                      </div> 
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>time zone</label>
                          <input type="time" value={time_zone} onChange={(e)=>{settime_zone(e.target.value)}}  className="form-control" />
                        </div>
                      </div>
                    </div>

                    {/* <div className="row category-checkbox">
                      <div className="col-lg-2 col-xs-6 col-4">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1">Private</label>
                        </div>                               
                      </div>
                      <div className="col-lg-2 col-xs-6 col-4">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="zcustomCheck1" />
                          <label className="custom-control-label" htmlFor="zcustomCheck1">Globle</label>
                        </div>                                       
                      </div>
                      <div className="col-lg-2 col-xs-6 col-4">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="czcustomCheck1" />
                          <label className="custom-control-label" htmlFor="czcustomCheck1">Watch via link</label>
                        </div>                                       
                      </div>                                   
                    </div> */}
                  </div>
                  <div className="osahan-area text-center mt-3">
                    <button className="btn btn-primary" type="submit" style={{background: '#000080', borderRadius: '4px'}}>Upload </button>
                  </div>                          
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Upload_music
