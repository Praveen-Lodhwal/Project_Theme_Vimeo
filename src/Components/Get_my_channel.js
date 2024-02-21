import React, { useEffect, useState } from "react";
import Asidebar from "./Asidebar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Button, Modal } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Get_my_channel() {
  const [video_modal, setvideo_modal] = useState(false)
  const [music_modal, setmusic_modal] = useState(false)
  const [video_id, setvideo_id] = useState("")
  const [music_id, setmusic_id] = useState("")
  const [music, setmusic] = useState([]);
  const [data, setdata] = useState("");
  const [api_data, setapi_data] = useState([]);
  const [history_data, sethistory_data] = useState([]);

  const navigate = useNavigate();
  const channel_id = localStorage.getItem("channel_id");  

  const getmychannel = () => {
    const userid  = localStorage.getItem("_id");
    let userdata = {
      user_id: userid,
    };
    axios.post("http://103.104.74.215:3003/api/get_my_channel", userdata).then((res) => {
      localStorage.setItem("channel_id", res.data?.data[0]?._id);
      setdata(res.data.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
  };
  useEffect(() => {
    getmychannel();
  }, [0]);

  // my channel video
  const getdata = () => {
    const userid  = localStorage.getItem("_id");
    let id_s = {
      user_id: userid,
      channel_id: channel_id,
    };
    axios.post("http://103.104.74.215:3003/api/get_my_channel_video", id_s).then((res) => {
      setapi_data(res?.data?.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  //music data fetching
  const get_music=()=>{ 
    axios.get("http://103.104.74.215:3003/api/get_music").then((res)=>{
      // console.log("api response",  res)
      let data =  res?.data?.data.slice(16)
      setmusic(data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    get_music();
  }, [])
  
  function music_page(){
    navigate("/play_single_music")
  }

  // get my History
  const get_history = () => {  
    const userid = localStorage.getItem("_id")  
    const post_id = {
    user_id : userid,
    }
    axios.post("http://103.104.74.215:3003/api/get_history", post_id).then((res)=>{
    console.log(res?.data?.data)
      sethistory_data(res?.data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
   get_history();
  }, [])
  
  
  // delete video
  const handledelete_video=()=>{
    const userid = localStorage.getItem("_id")
    const formdata = {
    user_id : userid,
    video_id: video_id
    }
    axios.post("http://103.104.74.215:3003/api/delete_my_video", formdata).then((res)=>{
      // console.log(res)   
      toast.success(res.data.msg)
      getdata();
      handleModal(false);
    }).catch((err)=>{
      console.log(err)
    })  
  }
  function handleModal(){
    setvideo_modal(!video_modal)
  }

  // delete music
  const handledelete_music=()=>{
    const userid = localStorage.getItem("_id")
    const formdata = {
      user_id : userid,
      _id : music_id
    }
    axios.post("http://103.104.74.215:3003/api/delete_music", formdata).then((res)=>{
      // console.log(res)
      toast.success(res.data.msg)
      get_music();
      handle_music_Modal(false)
    }).catch((err)=>{
      console.log(err)
    })
  }

  function handle_music_Modal(){
    setmusic_modal(!music_modal)
  }

  function video_play_page(){
    navigate("/video_page")
  }

  ///////////////////  render part
  return (
    <>
      <ToastContainer/>
      <Asidebar />
      <div style={{ marginLeft: "5px", marginTop: "5px" }}>
        <div className="single-channel-page" id="content-wrapper">
          <div className="single-channel-image">
            <img className="img" alt="" src={`http://103.104.74.215:3003/uploads/` + data[0]?.image[1]?.filename } style={{ height:"250px", width:"1120px" }}/>
            <div className="channel-profile">
              <img className="img-thumbnail" alt="" src={`http://103.104.74.215:3003/uploads/` +data[0]?.image[0]?.filename} style={{ width: "150px", height: "150px", borderRadius: "50%" }}/>
            </div>
          </div>

          <div className="single-channel-nav ">
            <br/>
            <a className="channel-brand"  >{data[0]?.channel_name}</a>
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="mt-2">
                <ul className="nav nav-tabs">
                  <Tabs>
                    <TabList style={{color:"darkgreen", fontSize:"14px", fontWeight:"600"}}>
                      <Tab>My Videos</Tab>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Tab>My Music</Tab>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Tab>My History</Tab>
                    </TabList>

                    <TabPanel>
                      <div className="container-fluid "  style={{marginLeft:"-30px", width:"1000px"}}>
                        <div className="video-block section-padding"style={{ marginTop:'15px'}}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="main-title">
                                {/* <h3>Videos</h3> */}
                              </div>
                            </div>
                            {api_data?.map((api_data, index) => {
                              return (
                                <div className="col-xl-4 col-sm-6 mb-3">
                                  <div className="video-card h-100">                                    
                                    <div className="video-card-image">
                                      <a className="play-icon" onClick={()=>video_play_page(localStorage.setItem("video_id", api_data?._id))}>
                                        <i className="fas fa-play-circle" />
                                      </a>
                                      <a className="video-close" onClick={()=>{handleModal(setvideo_id(api_data._id))}}><i className="fas fa-times-circle" /></a>
                                      <a  ><img className="img-fluid"src={ `http://103.104.74.215:3003/uploads/` + api_data?.video[1]?.filename} alt="" /></a><div className="time">3:50</div>
                                    </div>
                                    <div className="video-card-body">
                                      <div className="video-title">
                                        <a  >{api_data?.video[0]?.originalname.slice(0, 30) + "..."}</a>
                                      </div>
                                      <div className="video-page text-success">
                                        {api_data?.video_name}
                                        <a title data-placement="top"  data-toggle="tooltip"   data-original-title="Verified"  >
                                          <i className="fas fa-check-circle text-success" />
                                        </a>
                                      </div>
                                      <div className="video-view">
                                        {api_data?.video_views}&nbsp; M views &nbsp;
                                        <i className="fas fa-calendar-alt" />
                                        &nbsp;{api_data?.time_zone}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>                      
                      <Modal show={video_modal} onHide={()=>{handleModal()}}>
                        <Modal.Header >
                          <h5>Confirmation</h5>
                        </Modal.Header>

                        <Modal.Body>
                          <h5>Do you want to delete these <mark>video</mark></h5>    
                        </Modal.Body>

                        <Modal.Footer>
                          <Button className="btn btn-primary" onClick={()=>{handledelete_video()}}>Yes</Button>
                          <Button className="btn btn-primary" onClick={()=>{handleModal(false)}}>Close</Button>
                        </Modal.Footer>
                      </Modal>                   
                    </TabPanel>
                  
                    <TabPanel>
                      <div style={{marginLeft:'', marginRight:'', marginTop:'0px'}}>
                        <div className="video-block section-padding" >
                          <div className="row">
                            {music.map((music_data, index)=>{
                              return (
                                <div key={index} className="col-xl-3 col-sm-6 mb-3">
                                  <div className="channels-card bg-light shadow-lg ">                                  
                                    <a style={{marginTop:"-10px"}} onClick={()=>{handle_music_Modal(setmusic_id(music_data._id))}} className="video-close">
                                      <i className="fas fa-times-circle" style={{ color:"gray"}} />
                                    </a>                                  
                                    <div className="channels-card-image">
                                      <a  ><img className="img-fluid" src={music_data?.music[1]?.filename ? 'http://103.104.74.215:3003/uploads/' + music_data?.music[1]?.filename : "img/s2.png"} alt="" style={{width: "100px", height:"100px"}}/></a>
                                      <div className="channels-card-image-btn">
                                        <button type="button" onClick={()=>music_page(localStorage.setItem("music_id", music_data?._id))} className="btn btn-outline-danger btn-lg"><strong>Play Music</strong></button>
                                        
                                      </div>
                                    </div>
                                    <div className="channels-card-body">
                                      <div className="channels-title">
                                        <a  >{music_data?.music[0]?.originalname.slice(0, 20) + "..."}</a>
                                      </div>
                                      <div className="channels-view">Anything </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      <Modal show={music_modal} onHide={()=>{handle_music_Modal()}}>
                        <Modal.Header >
                          <h5>Confirmation</h5>
                        </Modal.Header>

                        <Modal.Body>
                          <h5>Do you want to delete these <mark>Music</mark></h5>     
                        </Modal.Body>
                        
                        <Modal.Footer>
                          <Button className="btn btn-primary" onClick={()=>{handledelete_music()}}>Yes</Button>
                          <Button className="btn btn-primary" onClick={()=>{handle_music_Modal(false)}}>Close</Button>
                        </Modal.Footer>
                      </Modal>  
                    </TabPanel>

                    <TabPanel>
                      <div id="content-wrapper" style={{marginLeft:'-40px', marginTop:'15px'}}>
                        <div className="container-fluid">
                          <div className="video-block section-padding">
                            <div className="row">
                              {history_data.map((history_api, index)=>{
                                return(
                                  <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="video-card history-video">
                                      <div className="video-card-image">
                                        <a className="video-close" onClick={()=>{handleModal(setvideo_id(history_api.video_id))}} ><i className="fas fa-times-circle" /></a>
                                        <a className="play-icon" onClick={()=>video_play_page(localStorage.setItem("video_id", history_api?.video_id))}><i className="fas fa-play-circle" /></a>
                                        <a  ><img className="img-fluid"src={history_api?.data[0]?.video[1]?.filename ? `http://103.104.74.215:3003/uploads/` + history_api?.data[0]?.video[1]?.filename : "img/v7.png"} style={{width:'300px', height:'150px'}} /></a>
                                        <div className="time">3:50</div>
                                      </div>
                                      <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>1:40</div>
                                      </div>
                                      <div className="video-card-body">
                                        <div className="video-title">
                                          <a  >There are many variations of passages of Lorem</a>
                                        </div>
                                        <div className="video-page text-success">
                                          Education <a title data-placement="top" data-toggle="tooltip"   data-original-title="Verified"><i className="fas fa-check-circle text-success" /></a>
                                        </div>
                                        <div className="video-view">
                                          1.8M views &nbsp;<i className="fas fa-calendar-alt" /> 11 Months ago
                                        </div>
                                      </div>
                                    </div>
                                  </div>                
                                )            
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Get_my_channel;
