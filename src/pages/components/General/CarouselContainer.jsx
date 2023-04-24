import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, IconButton } from "@mui/material";

function CarouselContainer({ images }) {
  const [imagesArr, setImagesArr] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    setImagesArr(images);
  }, [images]);

  const handlePrevClick = () => {
    setCurrentIndex(
      currentIndex - 1 < 0 ? imagesArr.length - 1 : currentIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(
      currentIndex + 1 > imagesArr.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="flex flew-row m-auto">
      <Box
        sx={{
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
        }}
      >
        <IconButton onClick={handlePrevClick}>
          <FaChevronLeft />
        </IconButton>
      </Box>
      <Carousel
        dynamicHeight={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        style={{ height: "100%", width: "100%" }}
      >
        {imagesArr.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt="Imagen"
              width={500}
              height={500}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        ))}
      </Carousel>
      <Box
        sx={{
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
        }}
      >
        <IconButton onClick={handleNextClick}>
          <FaChevronRight />
        </IconButton>
      </Box>
    </div>
  );
}

export default CarouselContainer;
