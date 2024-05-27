/* eslint-disable react/prop-types */
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import sliderOne from "../../../assets/slader1.png";

const EditGallary = ({ images, removeGallaryImage }) => {
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
        className="mySwiper ">
        {images?.map((image, index) => (
          <>
            <SwiperSlide key={index}>
              {image ? (
                <div className="position-relative">
                  <button
                    type="button"
                    className="p-1 px-2  bg-black text-white position-absolute"
                    style={{
                      right: "5px",
                      top: "5px",
                      fontSize: "10px",
                      borderRadius: "100%",
                    }}
                    onClick={() => removeGallaryImage(index)}>
                    X
                  </button>
                  <img
                    className="slide_gallary_image"
                    src={
                      typeof image === "string"
                        ? `${import.meta.env.VITE_FILE_ROOT_PATH}/${image}`
                        : URL.createObjectURL(image)
                    }
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ) : (
                <img className="slide_gallary_image" src={sliderOne} alt="" />
              )}
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default EditGallary;
