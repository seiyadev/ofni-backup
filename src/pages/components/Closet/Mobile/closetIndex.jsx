import { Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import VerifyTheme from "../../General/verifyTheme";

export default function ClosetIndex() {
  const router = useRouter();
  const theme = VerifyTheme();

  const BgPhoto = ({ rounded }) => {
    return (
      <Image
        src={theme === "light" ? "/bg-f8fafc.png" : "/bg-gray.png"}
        width={150}
        height={150}
        alt=""
        className={rounded}
        style={
          theme === "light"
            ? { border: "1px solid #E5E7EB" }
            : {
                border: "1px solid #4B5563",
              }
        }
      />
    );
  };
  const All = (
    <div>
      <div
        className="grid grid-cols-2 cursor-pointer rounded-lg"
        style={{
          width: "100px",
        }}
        onClick={() => {
          console.log('all')
        }}
      >
        <Image
          src="https://tecmonterreymx.vtexassets.com/arquivos/ids/169851/Playera-deportiva-BORREGOS-silueta-infantil-azul-2.jpg?v=637780420868400000"
          width={150}
          height={150}
          alt="prenda o atuendo"
          className="rounded-tl-lg"
          style={{
            border: "1px solid #E5E7EB",
          }}
        />
        <BgPhoto rounded={"rounded-tr-lg"} />
        <BgPhoto rounded={"rounded-bl-lg"} />
        <BgPhoto rounded={"rounded-br-lg"} />
      </div>
      <Typography variant="body2" className="mt-1">
        Ver todo
      </Typography>
      <div className="w-fit relative bottom-2">
        <Typography variant="caption" className="text-gray-500">
          1
        </Typography>
      </div>
    </div>
  );

  const Garment = (
    <div>
      <div
        className="grid grid-cols-2 cursor-pointer rounded-lg"
        style={{
          width: "100px",
        }}
        onClick={() => {
          console.log("prendas");
        }}
      >
        <Image
          src="https://tecmonterreymx.vtexassets.com/arquivos/ids/169851/Playera-deportiva-BORREGOS-silueta-infantil-azul-2.jpg?v=637780420868400000"
          width={150}
          height={150}
          alt="prenda o atuendo"
          className="rounded-tl-lg"
          style={{
            border: "1px solid #E5E7EB",
          }}
        />
        <BgPhoto rounded={"rounded-tr-lg"} />
        <BgPhoto rounded={"rounded-bl-lg"} />
        <BgPhoto rounded={"rounded-br-lg"} />
      </div>
      <Typography variant="body2" className="mt-1">
        Prendas
      </Typography>
      <div className="w-fit relative bottom-2">
        <Typography variant="caption" className="text-gray-500">
          1
        </Typography>
      </div>
    </div>
  );

  const Outfit = (
    <div>
      <div
        className="grid grid-cols-2 cursor-pointer rounded-lg"
        style={{
          width: "100px",
        }}
        onClick={() => {
          console.log("outfit");
        }}
      >
        <Image
          src="https://images.squarespace-cdn.com/content/v1/579202971b631b5dbc741986/1643806723597-19IAWFHTZP3C5LISY27M/2.png"
          width={150}
          height={150}
          alt="prenda o atuendo"
          className="rounded-tl-lg"
          style={{
            border: "1px solid #E5E7EB",
          }}
        />
        <BgPhoto rounded={"rounded-tr-lg"} />
        <BgPhoto rounded={"rounded-bl-lg"} />
        <BgPhoto rounded={"rounded-br-lg"} />
      </div>
      <Typography variant="body2" className="mt-1">
        Atuendos
      </Typography>
      <div className="w-fit relative bottom-2">
        <Typography variant="caption" className="text-gray-500">
          1
        </Typography>
      </div>
    </div>
  );

  const Tags = (
    <div>
      <div
        className="grid grid-cols-2 cursor-pointer rounded-lg"
        style={{
          width: "100px",
        }}
        onClick={() => {
          console.log("tags");
        }}
      >
        <Image
          src="https://tecmonterreymx.vtexassets.com/arquivos/ids/169851/Playera-deportiva-BORREGOS-silueta-infantil-azul-2.jpg?v=637780420868400000"
          width={150}
          height={150}
          alt="prenda o atuendo"
          className="rounded-tl-lg"
          style={{
            border: "1px solid #E5E7EB",
          }}
        />
        <BgPhoto rounded={"rounded-tr-lg"} />
        <BgPhoto rounded={"rounded-bl-lg"} />
        <BgPhoto rounded={"rounded-br-lg"} />
      </div>
      <Typography variant="body2" className="mt-1">
        Lorem ipsum dolor sit.
      </Typography>
      <div className="w-fit relative bottom-2">
        <Typography variant="caption" className="text-gray-500">
          1
        </Typography>
      </div>
    </div>
  );

  const Laundry = (
    <div>
      <div
        className="grid grid-cols-2 cursor-pointer rounded-lg"
        style={{
          width: "100px",
        }}
        onClick={() => {
          console.log("laundry");
        }}
      >
        <Image
          src="https://images.squarespace-cdn.com/content/v1/579202971b631b5dbc741986/1643806723597-19IAWFHTZP3C5LISY27M/2.png"
          width={150}
          height={150}
          alt="prenda o atuendo"
          className="rounded-tl-lg"
          style={{
            border: "1px solid #E5E7EB",
          }}
        />
        <BgPhoto rounded={"rounded-tr-lg"} />
        <BgPhoto rounded={"rounded-bl-lg"} />
        <BgPhoto rounded={"rounded-br-lg"} />
      </div>
      <Typography variant="body2" className="mt-1">
        Ropa sucia
      </Typography>
      <div className="w-fit relative bottom-2">
        <Typography variant="caption" className="text-gray-500">
          1
        </Typography>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 pt-2 w-fit gap-5 p-2 m-auto">
      {All}
      {Laundry}
      {Garment}
      {Outfit}
      {Tags}
    </div>
  );
}
