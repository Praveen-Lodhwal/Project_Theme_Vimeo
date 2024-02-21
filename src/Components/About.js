import React from 'react'
import Asidebar from './Asidebar'

function About() {
  return (
    <div>
      <Asidebar/>
      <div style={{marginLeft:'250px', marginRight:'15px', marginTop:'15px'}}>
        <h3>About Vimeo</h3>
        <hr/>
        <p style={{fontSize:"20px", color:"black", fontFamily:"sans-serif"}}>
          The quality of video streaming, privacy options, and the community are the standout features 
          that make Vimeo worth trying out. Vimeo provides high-quality video streaming and a great viewing 
          experience for the audience. The videos look crisp and clear, and the platform offers lots of customization
          options.
        </p>
      </div>
    </div>
  )
}

export default About