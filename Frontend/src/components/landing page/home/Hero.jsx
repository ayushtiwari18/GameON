import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        className="custom-swiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD2TUGso62Ba120dR-4mS0LQgWNx5zNgpHTw&s"
              alt="Beach Volleyball"
            />
            <div className="overlay">
              <h2>
                GameOn: <i>Where Every Click is a Victory!</i>
              </h2>
              <p>
                Step into the ultimate gaming universe with GameOn, where
                passion meets competition, and every player has a chance to
                shine. Whether you're a casual gamer
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD2TUGso62Ba120dR-4mS0LQgWNx5zNgpHTw&s"
              alt="Deep Ocean"
            />
            <div className="overlay">
              <h2>Explore the Ocean Depths</h2>
              <p>
                Dive into thrilling ocean adventures and explore the mysteries
                beneath the waves.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD2TUGso62Ba120dR-4mS0LQgWNx5zNgpHTw&s"
              alt="Ship Adventure"
            />
            <div className="overlay">
              <h2>Captain Your Own Ship</h2>
              <p>
                Navigate the high seas, take on challenges, and build your
                legacy in the GameOn world.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
