import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image, ImageLayoutOption } from "@yext/pages/components";
import Cta from "./cta";
import HoursText from "./HoursText";
import { BsPhone } from "react-icons/bs";

const Carousel = (props: any) => {
  const { data } = props;
  console.log(JSON.stringify(data));

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data &&
        data.map((item: any, index: any) => (
          <div key={index} className="p-4 flex flex-row">
            <div className="textClass flex-col flex justify-between leading-6 font-normal">
              {item.logo && (
                <Image image={item.logo} className="!w-40 h-auto"></Image>
              )}
              <div className="flex flex-col text-center justify-center text-sm space-y-2 mt-4">
                <div className="font-bold h-8">{item.name}</div>
                {item.c_cuisine ? (
                  <div className="h-4">{item.c_cuisine[0].name}</div>
                ) : (
                  <div className="h-4 invisible">Hi</div>
                )}
                {item.menuUrl && (
                  <a
                    href={item.menuUrl.url}
                    className="p-4 border bg-black text-white hover:border hover:border-black hover:bg-white hover:text-black"
                  >
                    View menu
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default Carousel;
