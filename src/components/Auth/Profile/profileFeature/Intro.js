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
        <p>Nếu anh/chị là nhà tuyển dụng thì em phải gửi "a big big big" lời cảm ơn ấy ạ, em rất vui khi anh/chị đã
          bỏ thời gian ghé thăm trang web của em. 
          Đây là sản phẩm mà em tự làm một mình nên khá lâu để hoàn thành nó tốt nhất, mặc dù chưa hoàn thành và còn 
          nhiều tính năng có thể phát triển nhưng em sẽ cố gắng phát triển và cập nhật trong tương lai.
        </p>
        <p> 
          Em biết rằng việc lựa chọn ứng viên là việc rất tốn công sức đối với anh chị bởi vì
          có hàng trăm CV ở level của em gửi về khiến việc đưa ra lựa chọn trở nên khó khăn. Hiện tại em rất muốn
          trải nghiệm được đi làm và được va chạm nhiều hơn. Vì vậy, nếu may mắn là người được chọn. 
          Em sẽ làm việc chăm chỉ và nỗ lực hết sức để đáp ứng các yêu cầu và mong đợi của công ty, đồng thời đóng góp tích cực cho
           sự phát triển của công ty!</p>
          <img 
          src={logo} 
          alt="" 
          style={{width: "400px", margin: "0 auto", display: "block"}}
          />
    </div>
  )
}

export default Intro