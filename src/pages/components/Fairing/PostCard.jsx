import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import ToggleFavorite from "../General/ToggleFavorite";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import ModalGeneral from "../General/Modal";
import ModalItem from "./Item/ModalItem";

export default function PostCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const mediaRef = useRef();
  const modalRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 250,
          margin: "auto",
        }}
        variant="elevation"
        elevation={0}
      >
        <>
          {isLoading ? (
            <Box
              sx={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
            >
              <Skeleton variant="rectangular">
                <CardMedia
                  component="img"
                  image="https://via.placeholder.com/250"
                  alt="Paella dish"
                  ref={mediaRef}
                />
              </Skeleton>
            </Box>
          ) : (
            <Box
              sx={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
            >
              <ModalGeneral
                ref={modalRef}
                Content={ModalItem}
                title="Publicación"
                padding="p-0"
                width={{
                  xs: "100vw",
                  sm: "calc(100vw - 20rem)",
                }}
                height={{
                  xs: "calc(100vh - 4rem)",
                  sm: "100%",
                }}
                onCloseModal={async () => {
                  await router.push(router.pathname);
                  await modalRef.current.handleClose();
                }}
              >
                <Link
                  href={router.pathname + "?item=1"}
                  as={router.pathname + "/item/1"}
                >
                  <CardMedia
                    component="img"
                    image="https://via.placeholder.com/250"
                    alt="Paella dish"
                    ref={mediaRef}
                    className="hover:opacity-75"
                  />
                </Link>
              </ModalGeneral>
            </Box>
          )}
          <div className="pt-4 lg:pt-1 flex justify-between">
            <div className="w-full">
              {isLoading ? (
                <>
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="30%" />
                </>
              ) : (
                <>
                  <Typography variant="h6" fontWeight={"bold"}>
                    10000 MXN
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero consequatur a molestiae libero? Omnis dolores at eos
                    itaque beatae non! Exercitationem velit aperiam repellendus
                    deleniti! Similique nemo consectetur quis perspiciatis.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tipo de prenda
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usada
                  </Typography>
                </>
              )}
            </div>
            <div className="w-fit">
              {isLoading ? (
                <Skeleton variant="circular">
                  <ToggleFavorite />
                </Skeleton>
              ) : (
                <ToggleFavorite animation={true} />
              )}
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}
