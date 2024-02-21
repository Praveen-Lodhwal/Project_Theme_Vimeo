import { useEffect, useState } from 'react';
import Asidebar from './Asidebar'
import "./Get_profile.css"
import axios from 'axios';

function Get_profile() {
  const [data, setdata] = useState("");

  const userid = localStorage.getItem("_id");

  const formData = {
    _id : userid,
  }

  useEffect(()=>{  
    axios.post("http://103.104.74.215:3003/api/view_profile", formData).then((response)=>{
      console.log(response.data?.data)
      setdata(response.data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  }, [])


  return (
    <>
      <Asidebar/>
      <div style={{marginLeft:'250px', marginRight:'15px', marginTop:'15px'}}>
        <section className="vh-100" style={{backgroundColor: '#f4f5f7'}}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-lg-6 mb-4 mb-lg-0">
                <div className="card mb-3" style={{borderRadius: '.5rem'}}>
                  <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center text-white" style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
                      <img src={`http://103.104.74.215:3003/uploads/` + data?.profile_image?.filename} alt="Avatar" className="img-fluid my-5" style={{width: "150px", height:"150px", borderRadius:"15px"}} />
                      <h5>{data.username}</h5>
                      <p>{data.email}</p>
                      <i className="far fa-edit mb-5" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{data.email}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Gender</h6>
                            <p className="text-muted">{data.gender}</p>
                          </div>
                        </div>
                        <h6>Projects</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Recent</h6>
                            <p className="text-muted">Lorem ipsum</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Most Viewed</h6>
                            <p className="text-muted">Dolor sit amet</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start">
                          <a href="#!"><i className="fab fa-facebook-f fa-lg me-3" /></a>
                          <a href="#!"><i className="fab fa-twitter fa-lg me-3" /></a>
                          <a href="#!"><i className="fab fa-instagram fa-lg" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  )
}

export default Get_profile
