/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import sliderOne from "../../../assets/slader1.png";

const EditGallary = ({ images }) => {
  return (
    <div className="ps-0 container experience_wrapper  mb-5">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          430: {
            slidesPerView: 3,
            spaceBetween: 12,
          },

          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        loop={true}
        className="mySwiper padding_left"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {image ? (
              <img
                className="slide_gallary_image"
                src={URL.createObjectURL(image)}
                alt={`Slide ${index + 1}`}
              />
            ) : (
              <img className="slide_gallary_image" src={sliderOne} alt="" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EditGallary;
