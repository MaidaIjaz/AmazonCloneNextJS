import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      {/* Self-closing div */}
      {/* Put an imaginary hidden container which is of a gradient from gray to transparent which will overlay and correct this transition effect*/}
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />

      {/* Powerful, lightweight and fully customizable carousel component for React apps. */}
      {/* autoPlay: Change the slide automatically based on interval prop. */}
      {/* infiniteLoop: Going after the last item will move back to the first slide. */}
      {/*  showStatus: Hide status bar */}
      {/* Check this link: https://www.npmjs.com/package/react-responsive-carousel */}
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        >
        <div className="h-96">
          <img loading="lazy" src="/banner1.jpg" alt="" />
        </div>
        <div className="h-96">
          <img loading="lazy" src="/banner2.jpg" alt="" />
        </div>
        <div className="h-96">
          <img loading="lazy" src="/banner3.jpg" alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
