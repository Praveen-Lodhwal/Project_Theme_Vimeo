import React, { useEffect, useState } from 'react'
import Asidebar from './Asidebar'
import ReactPlayer from 'react-player' 
import axios from 'axios';

function Searching_video_page() {
  const [data, setdata] = useState([])
  
  useEffect(()=>{
    axios.get("http://103.104.74.215:3003/api/search").then((res)=>{
      console.log(res?.data?.data)
      setdata(res?.data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  }, [])

  return (
    <>
      <div>
        <Asidebar/>
        <div id="content-wrapper" style={{marginLeft:'230px' , marginTop:'20px'}}>
          <div className="container-fluid pb-0 ">
            <div className="video-block section-padding">
              <div className="row ">
                <div className="col-md-12">
                  {data.map((api_data)=>{
                    return(
                      <div className=" d-flex col-md-12 p-2 ">
                        <div className="single-video-left">
                          <ReactPlayer url={`http://103.104.74.215:3003/uploads/` + api_data?.video[0]?.filename} width="300px" height="200px" controls='true' />
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="box" style={{width:"600px"}}>
                          <h6>Title:</h6>
                          <p style={{fontSize:"15px"}}>{api_data?.video[0]?.originalname}</p>
                          <h6>Category :</h6>
                          <p>{api_data?.category_type}</p>
                          <h6>Description :</h6>
                          <p>{api_data?.description}</p>
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
    </>
  )
}

export default Searching_video_page
