import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function CoverHeading() {
  const FullNameInitials = (...words) => {
    let initials = "";
    for (const word of words) {
      initials += word.charAt(0).toUpperCase();
    }
    return initials;
  };

  return (
    <div>
      <div
        className="rounded-lg"
        style={{
          height: 310,
          border: "1px solid #c2c2c2",
          backgroundColor: "#f2f2f2",
        }}
      >
        <Image
          src={"/bg.jpg"}
          alt="foto de portada de user"
          width={600}
          height={100}
          style={{
            objectFit: "cover",
            objectPosition: "top",
            width: "100%",
            height: "250px",
          }}
          className="rounded-t-lg"
        />
        <div className="flex items-center justify-start">
          <div className="flex flex-row items-center">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
              sx={{
                width: 150,
                height: 150,
                backgroundColor: "#2c6bed",
                border: "4px solid #fff",
                margin: "auto",
                marginTop: "-45px",
                marginLeft: "20px",
              }}
              alt="Axel Chávez"
            >
              <p className="text-white text-4xl">
                {FullNameInitials("Axel", "Chávez")}
              </p>
            </Avatar>
            <div
              className="text-left"
              style={{
                marginLeft: "10px",
                marginTop: "-50px",
              }}
            >
              <Typography variant="h5">Axel Chávez</Typography>
              <Typography variant="body2" className="italic -mt-1.5">
                @holayosoyaxel
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
