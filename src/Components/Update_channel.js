import React from 'react'
import Asidebar from './Asidebar'
import { useState } from 'react';
import axios from 'axios'

function Update_channel() {
  const [channelname, setchannelname] = useState();
  const [coverimage, setcoverimage] = useState();
  const [profileimage, setprofileimage] = useState();

  let setid = localStorage.getItem("_id");
  console.log("sdaasdasd", setid)

  const updatechannel = (e) => {
    e.preventDefault();
    const data = {
      user_id: setid,
      channel_name: channelname,
      cover_image: coverimage,
      profile_image: profileimage,
      handle: "asdasdas",
    };

    console.log("saddata", data);

    axios.post("http://103.104.74.215:3003/api/create_channel", data).then((res) => {
      console.log("resss", res.data.data._id);
      localStorage.getItem("channel_id", res.data.data._id)
    })
    .catch((error) => {
      console.log("error", error);
    });
  };

  
  ///////////////  render part
  return (
    <>
      <Asidebar />
      <div style={{ marginLeft: "20px", marginRight: "20px", marginTop: "" }}>
        <div className="single-channel-page" id="content-wrapper">
          <h4>Update channel</h4>
          <form onSubmit={updatechannel}>
            <div class="card-header" style={{ color: "black", backgroundColor: "light" }} >
              <h6>channel_name</h6>
              <input type="channel_name" name="channel_name" value={channelname} onChange={(e) => {setchannelname(e.target.value); }}
                className="form-control col-md-4"
                placeholder="channel_name"
              /><br/>
              <div class="channels-card-image-btn" style={{ width: "100%" }}>
                <h6>cover_image</h6>
                <input name="profile_image" onChange={(e) => {setcoverimage(e.target.files[0]); }} type="file" ></input> <br />
                <button type="btn btn-outline-info btn-sm" class="btn btn-sm">
                </button>
              </div>
              <div class="channels-card-image-btn" style={{ width: "100%" }}>
                <h6> profile_image</h6>
                <input name="profile_image" onChange={(e) => setprofileimage(e.target.files[0])} type="file"></input><br />
                <button type="btn btn-outline-info btn-sm" class="btn btn-sm">
                </button>
              </div>
              <button style={{ marginLeft: "70px", color: "", background: "yellow" }} type="submit" > Create_channel </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


export default Update_channel
