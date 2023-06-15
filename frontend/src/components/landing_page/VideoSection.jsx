import React from 'react';
import'../../App.css'
import {Button} from './Button'
import './VideoSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

function VideoSection() {
  return (
    <div className='video_container'>
      <video src='/videos/6.mp4' autoPlay loop muted/>
      <div className='title'>
        <h1>Welcome to SINS-LAB</h1>
        <p>Come to learn with US</p>
           
      <div className='video_btns'>
        <Button className='btns' buttonStyle='btn_outline' buttonSize='btn_large'>GET STARTED</Button>
        <Button className='btns' buttonStyle='btn_primary' buttonSize='btn_large'>WATCH TRAILER </Button>
      </div>
      </div>
    </div>
  )
}

export default VideoSection
