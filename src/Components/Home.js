import React, { useEffect, useState } from 'react'
import Asidebar from './Asidebar'
import axios from 'axios'
import { CgAlarm } from "react-icons/cg";
import { MdOutlineNotInterested } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import './Home.css'

function Home() {
  const [open_modal, set_open_modal] = useState("")
  const [api_data, setapi_data] = useState([]);

  const [save_watch_video, set_save_watch_video] = useState('');
  const [not_to_intrested, set_not_to_intrested] = useState('');
  const [share_watch_video, set_share_watch_video] = useState('');
  const [download_watch_video, set_download_watch_video] = useState('');
  const [clickedItemId, setClickedItemId] = useState('');

  const navigate = useNavigate();

  // functions
  const getdata = () => {         
    axios.post('http://103.104.74.215:3003/api/get_latest_video').then((res)=>{
      setapi_data(res.data?.data.slice(0, 12))
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getdata();
  }, [])

  function video_page () {
    navigate("/video_page")
  }

  function handleModal(videoId) {
    set_open_modal(!open_modal)
    setClickedItemId(videoId); // Store the clicked item ID
  }

  const save_to_watch = () => {
    console.log(save_watch_video)
  }

  const not_intrested = () => {
    console.log(not_to_intrested)
  }  

  const share_video = () => {
    console.log(share_watch_video)
  }

  const download_video = () => {
    console.log(download_watch_video)
  }


  return (
    <>
      <div>
        <Asidebar/> 
        <div id="content-wrapper" style={{marginLeft:'230px' , marginTop:'15px'}}>
          <div className="container-fluid">
            <div className="video-block section-padding">
              <div className="row">
                <div className="col-md-12">
                  <div className="main-title">
                    <h4 style={{color:"black", fontWeight:"200"}}>Videos</h4>
                  </div>
                </div>
                {api_data.map((fetch_data) => {
                  return (
                    <div className="col-xl-3 col-sm-6 mb-3" key={fetch_data._id}>
                      <div className="video-card history-video home_video_card" style={{borderRadius:"15px"}}>
                        <div className="video-card-image">
                          <a className="video-close" onClick={()=>{handleModal(fetch_data._id)}}><i className="fas fa-ellipsis-v" style={{color:"white", fontSize:"15px"}}/></a>                            
                          <a href="#" className="play-icon" onClick={()=>video_page(localStorage.setItem("video_id", fetch_data?._id))}>
                          
                            <i className="fas fa-play-circle" />
                          </a>
                          <a href="#"><img className="img-fluid" src={fetch_data?.video[1]?.filename ? `http://103.104.74.215:3003/uploads/` + fetch_data?.video[1]?.filename : "img/v7.png" }  alt="" style={{width:'300px', height:'150px'}} /></a>
                          <div className="time">3:50</div>
                        </div>

                        <div className="video-card-body">
                          <div className="video-title">
                            <a href="#">{fetch_data?.video[0]?.originalname.slice(0, 30)+ "..."}</a>
                          </div>
                          <div className="video-page text-success">
                            {fetch_data?.channel_name} <a title data-placement="top" data-toggle="tooltip" href="#" data-original-title="Verified"><i className="fas fa-check-circle text-success" /></a>
                          </div>
                          <div className="video-view">
                          {fetch_data?.video_views}&nbsp; views &nbsp;<i className="fas fa-calendar-alt" /> {fetch_data?.time_zone}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Modal show={open_modal} onHide={()=>{handleModal()}}>
                  <Modal.Body>
                    <ul style={{lineHeight:"2rem", fontSize:"20px", color:"black", listStyle:"none", cursor:"pointer"}}>
                      <li onClick={()=>{save_to_watch(set_save_watch_video(clickedItemId))}}><CgAlarm/><i>&nbsp;&nbsp;&nbsp; Save to Watch later</i></li>
                      <li onClick={()=>{not_intrested(set_not_to_intrested(clickedItemId))}}><MdOutlineNotInterested /><i>&nbsp;&nbsp;&nbsp; Not interested</i></li>
                      <li onClick={()=>{share_video(set_share_watch_video(clickedItemId))}}><CiShare2 /><i>&nbsp;&nbsp;&nbsp; share</i></li>
                      <li onClick={()=>{download_video(set_download_watch_video(clickedItemId))}}><IoDownloadOutline/><i >&nbsp;&nbsp;&nbsp; Download</i></li>
                    </ul>  
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className='btn btn-primary' onClick={()=>{handleModal(false)}}>close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
