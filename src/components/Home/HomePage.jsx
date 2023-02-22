import React, { useEffect, useState } from 'react'
// import VideoHomePage from '../../asset/video/video-1920.mp4'
import VideoHomePage from '../../asset/video/video-Intro.mp4'
import '../../asset/css/components/home/home.scss'
import { useNavigate } from 'react-router-dom'


const HomePage = (props) => {
    const navigate = useNavigate()
    const [textColor, setTextColor] = useState('white');
  const [boxShadowColor, setBoxShadowColor] = useState('black');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextColor(textColor === 'white' ? 'black' : 'white');
      setBoxShadowColor(boxShadowColor === 'black' ? 'white' : 'black');
    }, 22860);

    return () => clearInterval(intervalId);
  }, [textColor, boxShadowColor]);

  useEffect(() => {
    const firstColorTimeoutId = setTimeout(() => {
      setTextColor('black');
      setBoxShadowColor('white');
    }, 3550);
    const secondColorTimeoutId = setTimeout(() => {
      setTextColor('white');
      setBoxShadowColor('black');
    }, 22860);

    return () => {
      clearTimeout(firstColorTimeoutId);
      clearTimeout(secondColorTimeoutId);
    }
  }, []);
    return (
        <div className='homepage-container' style={{ color: textColor, textShadow: `0px 0px 10px ${boxShadowColor}` }}>
            <div>
                <video autoPlay muted loop>
                    <source src={VideoHomePage} type='video/mp4' />
                </video>
            </div>
            <div className='container homepage-soloGan d-flex flex-column'>
                <h4>
                    Enjoy life with your book, turn your life into a library!
                </h4>
                <p>
                    One can gain admittance to different classifications of books and different assets in the library.
                    It avoids the need to purchase costly books and assets. Let the book connect to your inner self.
                </p>
                <button className='btn btn-dark'
                    onClick={() => navigate('novels')}
                >Read Now</button>
            </div>
        </div>
    )
}
export default HomePage;
