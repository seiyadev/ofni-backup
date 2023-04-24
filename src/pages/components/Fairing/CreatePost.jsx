import { Box, Button, Divider, Fab, Typography } from "@mui/material";
import Dropzone from "../General/Dropzone";
import React from "react";
import IsWide from "../General/isWide";
import { BiEdit } from "react-icons/bi";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import ModalGeneral from "../General/Modal";

function CreatePost() {
  const isWide = IsWide();
  const modalCreatePostRef = React.useRef();
  const modalChooseGarmentByClosetRef = React.useRef();
  const [postImages, setPostImages] = React.useState([]);

  const onUpdate = (value) => {
    setPostImages(value);
    console.log(value);
  };

  const chooseGarmentByCloset = () => {
    return <div className="flex flex-col gap-1">Armario</div>;
  };

  const createPostContent = () => {
    return (
      <div className="flex flex-col gap-1">
        <Dropzone multiple={true} onUpdate={onUpdate} />
        <Divider>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            o
          </Typography>
        </Divider>
        <ModalGeneral
          Content={chooseGarmentByCloset}
          title="Elige una prenda de tu armario"
          padding="p-3"
          ref={modalChooseGarmentByClosetRef}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
            fullWidth
          >
            <CheckroomRoundedIcon />
            Elegir una prenda de tu armario
          </Button>
        </ModalGeneral>
      </div>
    );
  };

  return (
    <Box
      position={"fixed"}
      bottom={{
        xs: 80,
        lg: 16,
      }}
      right={20}
      zIndex={2}
    >
      <ModalGeneral
        Content={createPostContent}
        title="Crear publicación"
        padding="p-3"
        ref={modalCreatePostRef}
      >
        <Fab color="primary" aria-label="add" size="large">
          <BiEdit size={24} />
        </Fab>
      </ModalGeneral>
    </Box>
  );
}

export default CreatePost;
