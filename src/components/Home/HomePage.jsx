import React from 'react'
import VideoHomePage from '../../asset/video/video-1920.mp4'

const HomePage = (props) => {
    return (
        <div className='homepage-container'>
            <video autoPlay muted loop>
                <source src={VideoHomePage} type='video/mp4'/>
            </video>
        </div>
    )
}
export default HomePage;
