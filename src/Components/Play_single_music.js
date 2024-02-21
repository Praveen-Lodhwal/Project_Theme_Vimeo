import React, { useEffect } from "react";
import Asidebar from "./Asidebar";
import { useState } from "react";
import './Play_single_music.css'
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";

function Play_single_music() {
  let [music_data, setmusic_data] = useState();
  const [upnext_music, set_up_next_music] = useState([])

  let music_id = localStorage.getItem("music_id");

  let music_data_id = {
    _id: music_id,
  };

  useEffect(() => {
    getdata();
  });

  const getdata = () => {
    axios.post("http://103.104.74.215:3003/api/get_single_music", music_data_id).then((res) => {
        // console.log(res?.data?.data)
        setmusic_data(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
    });
  };

  useEffect(()=>{  
    axios.get("http://103.104.74.215:3003/api/get_music").then((res)=>{
      // console.log(res?.data?.data.slice(16));
      let data =  res?.data?.data.slice(16)
      set_up_next_music(data)
    }).catch((error)=>{
      console.log(error)
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  ///////////////////
  return (
    <div>
      <Asidebar />
      <div id="content-wrapper" style={{ marginLeft: "230px", marginTop: "20px" }}>
        <div className="container-fluid pb-0">
          <div className="video-block section-padding">
            <div className="row">
              <div className="col-md-8">
                <div className="single-video-left">
                  <div className="single-video">
                    <img src={'http://103.104.74.215:3003/uploads/'+ music_data?.music[1]?.filename} style={{ width:"100%", height:"300px" }}/>
                    <ReactAudioPlayer src={'http://103.104.74.215:3003/uploads/'+ music_data?.music[0]?.filename}  style={{ width: "100%" }} autoPlay controls />
                  </div>
                  <div className="single-video-title box mb-3">
                    <h2><a href="#">{music_data?.music[0]?.originalname}</a></h2>
                    <p className="mb-0"><i className="fas fa-eye" />&nbsp;{music_data?.audio_views} views</p>
                  </div>
                  <div className="single-video-author box mb-3">
                    <div className="float-right">
                      <button className="btn btn-danger" type="button">Subscribe&nbsp;<strong>{music_data?.data[0]?.subscribe_count}M</strong></button>
                      <button className="btn btn btn-outline-danger" type="button">
                        <i className="fas fa-bell"/>
                      </button>
                    </div>
                    <img className="img-fluid" src={'http://103.104.74.215:3003/uploads/'+ music_data?.data[0]?.image[0]?.filename} alt=""/>
                    <p><a href="#"><strong>{music_data?.data[0]?.channel_name}</strong></a>
                      <span title data-placement="top" data-toggle="tooltip" data-original-title="Verified">
                        <i className="fas fa-check-circle text-success" />
                      </span>
                    </p>
                    <small>Published on {music_data?.data[0]?.current_date.slice(0,10)}</small>
                  </div>
                  <div className="single-video-info-content box mb-3">
                    <h6>Title:</h6>
                    <p>{music_data?.music[0]?.originalname}</p>

                    <h6>Category :</h6>
                    <p>bollywood</p>

                    <h6>Description :</h6>
                    <p>songs</p>
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
                          <a
                            href="#"
                            className="right-action-link text-gray"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Sort by
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            />
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-fw fa-star" />
                              &nbsp; Top Rated
                            </a>
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-fw fa-signal" /> &nbsp;
                              Viewed
                            </a>
                            <a className="dropdown-item" href="#">
                              <i className="fas fa-fw fa-times-circle" /> &nbsp;
                              Close
                            </a>
                          </div>
                        </div> */}
                        <h6>Up Next</h6>
                      </div>
                    </div>
                    <div className="col-md-12">
                    {upnext_music.map((item, index) => {
                      return(
                        <div className="video-card video-card-list">
                          <div className="video-card-image">                         
                            <a className="play-icon" onClick={() => {scrollToTop(localStorage.setItem("music_id", item?._id))}}>
                              <i className="fas fa-play-circle" />
                            </a>
                            <a href="#"><img className="" src={`http://103.104.74.215:3003/uploads/` + item?.music[1]?.filename} alt="" /></a>
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
                              <a href="#">{item?.music[0]?.originalname.slice(0, 25)}...</a>
                            </div>
                            <div className="video-page text-success">
                              {item?.music_title} <a title data-placement="top" data-toggle="tooltip" href="#" data-original-title="Verified"><i className="fas fa-check-circle text-success" /></a>
                            </div>
                            <div className="video-view">
                              {item?.audio_views}&nbsp; views <i className="fas fa-calendar-alt" />&nbsp;
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
  );
}

export default Play_single_music;
