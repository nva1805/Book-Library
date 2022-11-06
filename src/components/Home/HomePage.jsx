import React from 'react'
import VideoHomePage from '../../asset/video/video-1920.mp4'
import '../../asset/css/components/home/home.scss'

const HomePage = (props) => {
    return (
        <div className='homepage-container'>
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
                <button className='btn btn-dark'>Read Now</button>
            </div>
        </div>
    )
}
export default HomePage;
