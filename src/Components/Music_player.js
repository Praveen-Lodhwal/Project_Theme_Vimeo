import React, { useEffect, useState } from 'react'
import Asidebar from './Asidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Music_player(){

  const [music, setmusic] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{  
    axios.get("http://103.104.74.215:3003/api/get_music").then((res)=>{
      let data =  res?.data?.data.slice(16)
      setmusic(data)
    }).catch((error)=>{
      console.log(error)
    })
  }, [0])

  function music_page(){
    navigate("/play_single_music")
  }

  return (
    <>    
      <Asidebar/>
      <div style={{marginLeft:'', marginRight:'', marginTop:'15px'}}>
        <div className="video-block section-padding" style={{marginLeft:'250px', marginRight:'15px', marginTop:'15px'}}>
          <div className="row">
            <div className="col-md-12">
              <div className="main-title">    
                <h4>My Musics</h4>
              </div>
            </div>
            {music.map((music_data, index)=>{
              return (
                <div key={index} className="col-xl-3 col-sm-6 mb-3">
                  <div className="channels-card bg-light">
                    <div className="channels-card-image">
                      <a href="#"><img className="img-fluid" src={music_data?.music[1]?.filename ? 'http://103.104.74.215:3003/uploads/' + music_data?.music[1]?.filename : "img/s2.png"} alt="" style={{width: "100px", height:"100px"}}/></a>
                      <div className="channels-card-image-btn">
                        <button type="button" onClick={()=>music_page(localStorage.setItem("music_id", music_data?._id))} className="btn btn-outline-danger btn-lg"><strong>Play Music</strong></button>
                      </div>
                    </div>
                    <div className="channels-card-body">
                      <div className="channels-title">
                        <a href="#">{music_data?.music[0]?.originalname.slice(0, 20) + "..."}</a>
                      </div>
                      <div className="channels-view">Anything </div>
                    </div>
                  </div>
                </div>
              )
            })}


          </div>




          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center pagination-sm mb-4">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex={-1}>Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Music_player
