import { Divider, IconButton, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function RatingAndBio() {
  return (
    <div className="mt-2">
      <Divider />
      <div
        elevation={1}
        variant="outlined"
        style={{
          padding: "10px 20px",
        }}
        className="m-auto"
      >
        <div className="mb-2">
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Descripción
          </Typography>
          <Typography
            variant="body2"
            className="italic"
            sx={{
              marginLeft: "0.5rem",
            }}
          >
            Aún no hay una descripción
          </Typography>
        </div>
        <div className="">
          <Typography variant="body1">Rating de vendedor</Typography>
          <Rating
            name="user_rating"
            defaultValue={4}
            size="large"
            sx={{
              marginLeft: "0.5rem",
            }}
            readOnly
          />
        </div>
      </div>
      <Divider />
    </div>
  );
}
