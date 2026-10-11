
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MySlider(){
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    return<>
    
    <Slider {...settings}>
      <div>
        <img src={require('../../images/1.jpg')} className="w-100" style={{height:'400px'}} alt="" />
      </div>
      <div>
        <img src={require('../../images/2.jpg')} className="w-100" style={{height:'400px'}} alt="" />
      </div>
      <div>
        <img src={require('../../images/3.jpg')} className="w-100" style={{height:'400px'}} alt="" />
      </div>
      <div>
        <img src={require('../../images/4.jpg')} className="w-100" style={{height:'400px'}} alt="" />
      </div>
      <div>
        <img src={require('../../images/5.jpg')} className="w-100" style={{height:'400px'}} alt="" />
      </div>
      
    </Slider>

    </>
}