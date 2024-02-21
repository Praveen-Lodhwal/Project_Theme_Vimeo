import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Asidebar.css';
import axios from 'axios';

function Asidebar() {
  const [data, setdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [user_data, setuser_data] = useState("");   

  const navigate = useNavigate();

  let userid = localStorage.getItem("_id")

  const formData = {
    _id : userid
  }

  const getdata = () => {    
    axios.post("http://103.104.74.215:3003/api/view_profile", formData).then((res)=>{
      // console.log(res?.data?.data);
      setuser_data(res?.data?.data);
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(()=>{
    getdata();
  }, [])

  function user_logout() {
    const confirmLogout = window.confirm("Do you want to Log Out");
    if (confirmLogout) {
      localStorage.removeItem("_id");
      navigate('/home')
      toast.success("Logged out successfully");
    }
  }

  ////search function 
  useEffect(()=>{
    axios.get("http://103.104.74.215:3003/api/search").then((res)=>{
      setdata(res?.data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  }, [])

  const handlefilter = (event) =>{
    const result = data.filter(item => item?.video[0]?.originalname.toLowerCase().includes(event.target.value))
    setfilterdata(result)
  } 

  function handlenavigate(){
    const idss = filterdata[0]._id
    localStorage.setItem("filter_search_id", idss)
    navigate('/searching_video_page')
  }

  return(
    <>
      <ToastContainer />
      {userid ? (
        <nav className="navbar navbar-expand static-top osahan-nav sticky-top" style={{height:"60px"}}>
        &nbsp;&nbsp;
        <Link className="navbar-brand mr-1" to="/">
          <img className="img-fluid" alt="" src="img/logo.png"/>
        </Link>
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-5 my-2 my-md-0 osahan-navbar-search"  >
          <div className="input-group" style={{marginRight:"0px"}} >
            <Dropdown>
              <Dropdown.Toggle  id="dropdown-basic" style={{height:"48px", background: "none"}}>
							  <input type="text"  onChange={handlefilter} className="form-control" style={{borderRadius:"0px"}}  />
							</Dropdown.Toggle>
							<Dropdown.Menu >
                {filterdata.map((item, index)=>{
                  return(
                    <li key={index} onClick={handlenavigate}>
                      <Dropdown.Item  style={{color:"black", fontSize:"15px"}}>
                        <img alt="Avatar" src={`http://103.104.74.215:3003/uploads/` + item?.video[1]?.filename}  style={{height:"30px", width:"30px"}}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {item?.video[0]?.originalname}
                      </Dropdown.Item>
                    </li>
                  )
                })}
							</Dropdown.Menu>
						</Dropdown>
            <div className="input-group-append" style={{marginTop:"7px", marginLeft:"-28px", border:"none"}} >
              <button  type="button" className="btn btn-light" style={{height:"35px",}}><i className="fas fa-search" /></button>
            </div>
          </div>
        </form>

        <ul className="navbar-nav ml-auto ml-md-0 osahan-right-navbar">
          <li className="nav-item mx-1">
            <Link className="nav-link" to="/upload">
              <i className="fas fa-plus-circle fa-fw" />
              Upload Video
            </Link>
          </li>
          <li className="">
						<Dropdown>
							<Dropdown.Toggle className='dropdown_basic' id="dropdown-basic" style={{height:"50px", background: "none"}}>
								<img alt="Avatar" src={`http://103.104.74.215:3003/uploads/` + user_data?.profile_image?.filename} 
                style={{height:"45px", width:"50px" ,marginRight:"10px", borderRadius: "50%"}}/>
                {user_data?.username}
							</Dropdown.Toggle>
							<Dropdown.Menu style={{width:"10px", background:"whitesmoke", borderRadius:"5%"}}>
								<Dropdown.Item><Link to="/create_channel" style={{fontSize:"13px", color:"black"}}>Create_channel</Link></Dropdown.Item>
								<Dropdown.Item><Link to="/update_channel" style={{fontSize:"13px", color:"black"}}>Update_channel</Link></Dropdown.Item>
								<Dropdown.Item><Link to="/get_my_channel" style={{fontSize:"13px", color:"black"}}>Get My Channel</Link></Dropdown.Item>
								<Dropdown.Item><Link to="/get_profile" style={{fontSize:"13px", color:"black"}}>Get Profile</Link></Dropdown.Item>
								<Dropdown.Item><Link to="/profile_update" style={{fontSize:"13px", color:"black"}}>Profile Update</Link></Dropdown.Item>
								<Dropdown.Item><Link to="/home" style={{borderStyle:"none"}}><button onClick={user_logout}>Log out</button></Link></Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
          </li>
        </ul>
      </nav>) : (
      <nav className="navbar navbar-expand static-top osahan-nav sticky-top" style={{height:"60px"}}>
        &nbsp;&nbsp;
        <button className="btn btn-link btn-sm text-secondary order-1 order-sm-0" id="sidebarToggle" >
          <i className="fas fa-bars" />
        </button> &nbsp;&nbsp;
        <Link className="navbar-brand mr-1" to="/"><img className="img-fluid" alt="" src="img/logo.png" /></Link>
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-5 my-2 my-md-0 osahan-navbar-search">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for..." style={{borderRadius:"0px"}} />
            <div className="input-group-append">
              <button className="btn btn-light" type="button">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form>
        <ul className="navbar-nav ml-auto ml-md-0 osahan-right-navbar">
          <li className="nav-item mx-1">
            <Link className="nav-link" to="/upload">
              <i className="fas fa-plus-circle fa-fw" />
              Upload Video
            </Link>
          </li>
          <li class="nav-item active">
						<Link to='/login' class="nav-link" >
							<span>Login</span>
						</Link>
					</li>
          <li className="">
						<a><img alt="Avatar" src="img/user_logo.png" style={{height:"40px", marginTop:"8px" ,marginRight:"12px", borderRadius: "50%"}}/></a>
          </li>
        </ul>
      </nav>)}

      <div id="wrapper">
				<ul class="sidebar navbar-nav">
					<li class="nav-item active" >
						<Link to='/home' class="nav-link">
							<i class="fas fa-fw fa-home"></i>
							<span >Home</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/video_page' class="nav-link" >
							<i class="fas fa-fw fa-video"></i>
							<span>Video Page</span>
						</Link>
					</li> 
					<li class="nav-item active">
						<Link to='/upload' class="nav-link" >
							<i class="fas fa-fw fa-cloud-upload-alt"></i>
							<span>Upload Videos</span>
						</Link>
	 				</li>
					<li class="nav-item active">
						<Link to='/upload_music' class="nav-link" >
							<i class="fas fa-fw fa-cloud-upload-alt"></i>
							<span>Upload Music</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/music_player' class="nav-link" >
							<i class="fas fa-music"></i>              
							<span>Music</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/play_single_music' class="nav-link" >
							<i class="fas fa-headphones-alt"></i>
							<span>Music page</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/history_page' class="nav-link" >
							<i class="fas fa-history"></i>
							<span>History page</span>
						</Link>
					</li>
        	<li class="nav-item active">
						<Link to='/channels' class="nav-link" >
							<i class="fas fa-fw fa-users"></i>
							<span>Channels</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/help' class="nav-link" >
							<i class="fas fa-hands-helping"></i>
							<span>Help</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/about' class="nav-link" >
							<i class="fas fa-history"></i>
							<span>About</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/login' class="nav-link" >
							<i class="fas fa-sign-in-alt"></i>
							<span>Login</span>
						</Link>
					</li>
					<li class="nav-item active">
						<Link to='/register' class="nav-link" >
							<i class="fas fa-sign-out-alt"></i>
							<span>SignUP</span>
						</Link>
					</li>
				</ul>
      </div>
    </>
  )
}

export default Asidebar
