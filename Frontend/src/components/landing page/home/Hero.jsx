import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="carousel-container-landing">
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
            <img src="/assets/Volleyball.jpg" alt="Beach Volleyball" />
            <div className="overlay-landing">
              <h2>
                GameOn: <i>Where Every Click is a Victory!</i>
              </h2>
              <p>
                Step into the ultimate gaming universe with <b>GameOn</b>, where
                passion meets competition, and every player has a chance to
                shine. Whether you're a casual gamer looking for fun or a
                hardcore competitor ready to dominate the leaderboards, GameOn
                is your ultimate battleground.
                <br />
                <br />
                🎮 <b>Unleash your skills</b> in action-packed battles, race
                against time, and outplay your rivals in thrilling tournaments.
                Every move you make brings you closer to glory! 🚀
                <br />
                Ready to level up? **Play. Compete. Conquer.** 💥
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="slide">
            <img src="/assets/Basketball Court.jpg" alt="Deep Ocean" />
            <div className="overlay-landing">
              <h2>⚔️ One Game, Endless Glory! ⚔️</h2>
              <p>
                Step into the arena where legends are forged. Rise through the
                ranks, challenge the best, and become the ultimate champion! 🏆
                <br />
                <br />
                Every battle is a test of skill, strategy, and determination.
                Whether you're a lone warrior or part of an unstoppable squad,
                the journey to greatness begins here. Face off against
                formidable opponents, master your tactics, and prove your
                dominance in every match!
                <br />
                💥 Every move counts. Every victory brings rewards. **Will you
                rise to the challenge and claim your place among the elite?**
                The battlefield awaits—step in and make history! ⚡🔥
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="slide">
            <img src="/assets/Cycleing.jpg" alt="Ship Adventure" />
            <div className="overlay-landing">
              <h2>🚀 Level Up. Dominate. Repeat. 🚀</h2>
              <p>
                Power up your skills, crush your opponents, and climb the
                leaderboard. The road to greatness begins here! 💪
                <br />
                Whether you're battling solo or teaming up with allies, every
                match is a chance to prove your dominance. Sharpen your
                reflexes, strategize your moves, and unleash your full
                potential. From casual duels to high-stakes tournaments, the
                competition never stops!
                <br />
                💥 **Grind harder. Play smarter. Win bigger.** Are you ready to
                rise through the ranks and cement your legacy? **Your moment is
                now!** 🔥🎮
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
