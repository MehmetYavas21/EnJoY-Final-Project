import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Img } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const HeroSection = (events) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slideEvents = events.events.slice(0, 4);

  return (
    <Box width="400px" height="300px">
      <Slider {...settings}>
        {slideEvents.map((e) => (
          <Box key={e.id}>
            <Link to={`/event/${e.id}`}>
              <Img
                src={e.image}
                alt={e.title}
                borderRadius="10px"
                w="400px"
                h="300px"
              />
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
