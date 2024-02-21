import React, { useEffect, useState } from 'react'
import Asidebar from './Asidebar'
import axios from 'axios'
import { Button, Modal } from "react-bootstrap";

function History_page(){
  const [open_modal, setopen_modal]= useState(false)
  const [video_id, setvideo_id] = useState("")
  const [history_data, sethistory_data] = useState([]);

  const userid = localStorage.getItem("_id")

  const get_history = () => {    
    const post_id = {
    user_id : userid,
    }
    axios.post("http://103.104.74.215:3003/api/get_history", post_id).then((res)=>{
      // console.log(res?.data?.data)
      sethistory_data(res?.data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
   get_history();
  }, [])


  // parameter required user_id & video_id.. 
  const delete_history_video = () => {    
    const post_id = {
      user_id : userid,
      video_id : video_id
    }
    
    console.log(post_id)
    axios.post("http://103.104.74.215:3003/api/delete_history", post_id).then((res)=>{
      console.log(res)
      get_history();
      handleModal(false)
    }).catch((err)=>{
      console.log(err)
    })
  }

  function handleModal(){
   setopen_modal(!open_modal)
  }

  return (
    <div>
      <Asidebar/>
      <div id="content-wrapper" style={{marginLeft:'250px', marginTop:'15px'}}>
        <div className="container-fluid">
          <div className="video-block section-padding">
            <div className="row">
              <div className="col-md-12">
                <div className="main-title">
                  <div className="btn-group float-right right-action">
                    <a href="#" className="right-action-link text-gray" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Sort by <i className="fa fa-caret-down" aria-hidden="true" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#"><i className="fas fa-fw fa-star" /> &nbsp; Top Rated</a>
                      <a className="dropdown-item" href="#"><i className="fas fa-fw fa-signal" /> &nbsp;  Viewed</a>
                      <a className="dropdown-item" href="#"><i className="fas fa-fw fa-times-circle" /> &nbsp; Close</a>
                    </div>
                  </div>
                  <h6>Watch History</h6>
                </div>
              </div>
              {history_data.map((history_api, index)=>{
                return(
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="video-card history-video">
                      <div className="video-card-image">
                        <a className="video-close" onClick={()=>{handleModal(setvideo_id(history_api.video_id))}} ><i className="fas fa-times-circle" /></a>
                        <a className="play-icon" href="#"><i className="fas fa-play-circle" /></a>
                        <a href="#"><img className="img-fluid"src={history_api?.data[0]?.video[1]?.filename ? `http://103.104.74.215:3003/uploads/` + history_api?.data[0]?.video[1]?.filename : "img/v7.png"} style={{width:'300px', height:'150px'}} /></a>
                        <div className="time">3:50</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>1:40</div>
                      </div>
                      <div className="video-card-body">
                        <div className="video-title">
                          <a href="#">There are many variations of passages of Lorem</a>
                        </div>
                        <div className="video-page text-success">
                          Education <a title data-placement="top" data-toggle="tooltip" href="#" data-original-title="Verified"><i className="fas fa-check-circle text-success" /></a>
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

      <Modal show={open_modal} onHide={()=>{handleModal()}}>
        <Modal.Header >
          <h4>Confirmation</h4>
        </Modal.Header>

        <Modal.Body>
          <h4>Do you want to delete these <mark>histry video</mark></h4>    
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn btn-primary" onClick={()=>{delete_history_video()}}>Yes</Button>
          <Button className="btn btn-primary" onClick={()=>{handleModal(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default History_page
