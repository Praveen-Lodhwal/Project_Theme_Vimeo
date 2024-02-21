import React from 'react'
import {Routes , Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Components/Home';
import Video_page from './Components/Video_page';
import Upload_videos from './Components/Upload_videos';
import Login from './Components/Login';
import Register from './Components/Register';
import History_page from './Components/History_page';
import Help from './Components/Help';
import About from './Components/About';
import Forgot_password from './Components/Forgot_password';
import Music_player from './Components/Music_player';
import Get_my_channel from './Components/Get_my_channel';
import Create_channel from './Components/Create_channel'
import Upload_music from './Components/Upload_music'
import Get_profile from './Components/Get_profile'
import Profile_update from './Components/Profile_update'
import Update_channel from './Components/Update_channel';
import Play_single_music from './Components/Play_single_music';
import Searching_video_page from './Components/Searching_video_page';


function App(){
  return(
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/home' element={<Home />}> </Route>
        <Route path='/video_page' element={<Video_page/>}> </Route>
        <Route path='/upload' element={<Upload_videos/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/register' element={<Register/>}> </Route>
        <Route path='/History_page' element={<History_page/>}> </Route>
        <Route path='/help' element={<Help/>}> </Route>
        <Route path='/about' element={<About/>}> </Route>
        <Route path='/forgot_password' element={<Forgot_password/>}> </Route>
        <Route path='/music_player' element={<Music_player/>}> </Route>
        <Route path='/get_my_channel' element={<Get_my_channel/>}> </Route>
        <Route path='/get_profile' element={<Get_profile/>}> </Route>
        <Route path='/profile_update' element={<Profile_update/>}> </Route>
        <Route path='/create_channel' element={<Create_channel/>}> </Route>
        <Route path='/upload_music' element={<Upload_music/>}> </Route>
        <Route path='/update_channel' element={<Update_channel/>}> </Route>
        <Route path='/play_single_music' element={<Play_single_music/>}> </Route>
        <Route path='/searching_video_page' element={<Searching_video_page/>}> </Route>
      </Routes>
    </>
  )
}

export default App
