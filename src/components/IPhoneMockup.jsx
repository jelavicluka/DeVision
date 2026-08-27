import iPhoneMockupImage from '../assets/iphone.png';
import iPhonePromoVideo from '../assets/iphone-promo-video.mp4';
import './IPhoneMockup.css';

const IPhoneMockup = () => {

  return (
    <div className="iphone-mockup" aria-label="DeVision content shown on an iPhone">
      <img src={iPhoneMockupImage} alt="" aria-hidden="true" draggable="false" />
      <video className="video" src={iPhonePromoVideo} autoPlay loop muted playsInline />
    </div>
  );
};

export default IPhoneMockup;
