import React from 'react'
import { useSelector } from 'react-redux';
import logo from '../../../../asset/picture/logo750.png'

const Intro = (props) => {
    const user = useSelector((state) => state.userReducer.account);
    console.log(user);
  return (
    <div>
        <p>Chà, Cảm ơn vì bạn đã ghé thăm trang web của mình! thật ra ở đây sẽ có một chức năng
          gì đấy nhưng thay vì vậy mình lại muốn gửi lời cảm ơn nếu bạn đã thử truy cập vào liên kết để đến đây! 
        </p>
          <img 
          src={logo} 
          alt="" 
          style={{width: "400px", margin: "0 auto", display: "block"}}
          />
    </div>
  )
}

export default Intro
