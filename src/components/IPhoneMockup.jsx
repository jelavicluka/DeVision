import React from 'react';
import iPhoneMockupImage from '../assets/iphone-mockup.png'
import iPhonePromoVideo from '../assets/iphone-promo-video.mp4'
import './IPhoneMockup.css'

const IPhoneMockup = () => {

  return (
    <>
      <div className='iPhone-mockup'>
        <img src={ iPhoneMockupImage } alt="iPhoneMockup" />
        <video className="video" src={ iPhonePromoVideo } autoPlay loop muted></video>
      </div>
    </>
  )
}

export default IPhoneMockup;
