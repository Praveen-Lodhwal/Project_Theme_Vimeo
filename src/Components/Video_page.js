import React, { useEffect, useState } from 'react'
import Asidebar from './Asidebar'
import axios from 'axios';
import ReactPlayer from 'react-player'

function Video_page() {
  const [play_video, setplay_video] = useState();
  const [upnext_video, set_upnext_video] = useState([]);

  const userid = localStorage.getItem("_id")
  const channle_id = localStorage.getItem("channel_id")  
  const v_id = localStorage.getItem("video_id");

  const formData = {
    video_id : v_id
  }

  useEffect(()=>{
    axios.post("http://103.104.74.215:3003/api/get_single_video", formData).then((res)=>{
      setplay_video(res?.data.data)
    }).catch((error)=>{
      console.log(error)
    })
  })

  // user_id, channel_id & video_id
  useEffect(()=>{
    const data ={
      user_id : userid,
      channel_id : channle_id,
      video_id : v_id
    }

    axios.post("http://103.104.74.215:3003/api/create_history", data).then((res)=>{
      // console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  // up next video fetching data
  const getdata = () => {         
    axios.post('http://103.104.74.215:3003/api/get_latest_video').then((res)=>{
      console.log(res.data?.data.slice(0, 10))
      set_upnext_video(res.data?.data.slice(0, 10))
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getdata();
  }, [])

  // function render_video() {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }
  
  return (
    <div>
      <Asidebar/>
      <div id="content-wrapper" style={{marginLeft:'230px' , marginTop:'20px'}}>
        <div className="container-fluid pb-0">
          <div className="video-block section-padding">
            <div className="row">
              <div className="col-md-8">
                <div className="single-video-left">
                  <div className="single-video">
                    <ReactPlayer url={`http://103.104.74.215:3003/uploads/` + play_video?.video[0]?.filename } width="100%" height={315} controls='true' playing='true' />
                  </div>
                  <div className="single-video-title box mb-3">
                    <h2><a href="#">{play_video?.video[0]?.originalname}</a></h2>
                    <p className="mb-0"><i className="fas fa-eye" /> {play_video?.video_views} views</p>
                  </div>
                  <div className="single-video-author box mb-3">
                    <div className="float-right"><button className="btn btn-danger" type="button">Subscribe &nbsp;<strong>{play_video?.channel_data[0]?.subscribe_count}M</strong></button> 
                    <button className="btn btn btn-outline-danger" type="button"><i className="fas fa-bell" /></button></div>
                    <img className="img-fluid" src={`http://103.104.74.215:3003/uploads/` + play_video?.channel_data[0]?.image[0]?.filename} alt="" />
                    <p><a href="#"><strong>{play_video?.channel_data[0]?.channel_name}</strong></a> <span title data-placement="top" data-toggle="tooltip" data-original-title="Verified"><i className="fas fa-check-circle text-success" /></span></p>
                    <small>Published on {play_video?.channel_data[0]?.current_date.slice(0, 10)}</small>
                  </div>
                  <div className="single-video-info-content box mb-3">
                    <h6>Title:</h6>
                    <p>{play_video?.video[0]?.originalname}</p>

                    <h6>Category :</h6>
                    <p>{play_video?.category_type}</p>

                    <h6>Description :</h6>
                    <p>{play_video?.description}</p>
                  </div>

                  {/* Comment section */}
                  <h5> Total Comment </h5><br/>
                  <div className="comment_section">
                    <div className="image right">
                      <img src="./img/s2.png" alt="image"/>
                    </div>

                    <form>
                      <div className="input_commetn">
                        <input type="text" placeholder="Add a comment..."/>
                      </div>

                      <div className="comment_bottam" >
                        <button type="submit" className="btn btn-danger">Cancel</button>
                        <button type="submit" className="btn btn-primary" >Comment</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="single-video-right">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="main-title">
                        {/* <div className="btn-group float-right right-action">
                          <a href="#" className="right-action-link text-gray" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort by <i className="fa fa-caret-down" aria-hidden="true" />
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-star" />
                              &nbsp; Top Rated</a>
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-signal" /> &nbsp; Viewed</a>
                            <a className="dropdown-item" href="#"><i className="fas fa-fw fa-times-circle" /> &nbsp; Close</a>
                          </div>
                        </div> */}
                        <h6>Up Next</h6>
                      </div>
                    </div>
                    <div className="col-md-12">
                    {upnext_video.map((item, index) => {
                      return(
                        <div className="video-card video-card-list">
                          <div className="video-card-image">
                            <a className="play-icon" href="#" onClick={() => {(localStorage.setItem("video_id", item?._id))}}><i className="fas fa-play-circle" /></a>
                            <a href="#"><img className="" src={`http://103.104.74.215:3003/uploads/` + item?.video[1]?.filename} alt="" /></a>
                            <div className="time">3:50</div>
                          </div>
                          <div className="video-card-body">
                            <div className="btn-group float-right right-action">
                              <a href="#" className="right-action-link text-gray" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-v" aria-hidden="true" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fas fa-fw fa-star" /> &nbsp; Top Rated</a>
                                <a className="dropdown-item" href="#"><i className="fas fa-fw fa-signal" /> &nbsp; Viewed</a>
                                <a className="dropdown-item" href="#"><i className="fas fa-fw fa-times-circle" /> &nbsp; Close</a>
                              </div>
                            </div>
                            <div className="video-title">
                              <a href="#">{item?.video[0]?.originalname.slice(0, 25)}...</a>
                            </div>
                            <div className="video-page text-success">
                              {item?.data[0]?.channel_name} <a title data-placement="top" data-toggle="tooltip" href="#" data-original-title="Verified"><i className="fas fa-check-circle text-success" /></a>
                            </div>
                            <div className="video-view">
                              1.8M views &nbsp;<i className="fas fa-calendar-alt" /> 11 Months ago
                            </div>
                          </div>
                        </div>                      
                      )                    
                    })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video_page
