import NavBarFairing from "@/pages/components/Fairing/NavBarFairing";
import CarouselContainer from "@/pages/components/General/CarouselContainer";
import ToggleFavorite from "@/pages/components/General/ToggleFavorite";
import IsWide from "@/pages/components/General/isWide";
import VerifyTheme from "@/pages/components/General/verifyTheme";
import NavBar from "@/pages/components/NavBar/NavBar";
import {
  Avatar,
  Button,
  Divider,
  Rating,
  Typography,
  Box,
  useTheme,
  Paper,
  Container,
} from "@mui/material";
import { auth } from "@/lib/firebase";
import axios from "axios";
import React from "react";
import { FiSend } from "react-icons/fi";

function ItemFairing({ user }) {
  const isWide = IsWide();
  const theme = VerifyTheme();
  const overflowStyle = theme === "dark" ? "dark-scrollbar" : "light-scrollbar";
  const themeMUI = useTheme();
  const [userFetched, setUserFetched] = React.useState({});

  React.useEffect(() => {
    setUserFetched(user);
  }, [user]);

  return (
    <>
      <NavBar user={userFetched} />
      <div
        className="flex flex-col"
        style={{
          height: "calc(100vh - 60px)",
        }}
      >
        <NavBarFairing />
        <div
          className="flex flex-col w-full pr-2 pl-2 lg:pr-6 lg:pl-6"
          style={
            isWide
              ? {
                  marginTop: "56px",
                }
              : {
                  marginTop: "100px",
                }
          }
        >
          <div
            className="w-full flex flex-col md:flex-row"
            style={{
              height: "calc(100vh - 116px)",
              borderRight: "1px solid " + themeMUI.palette.divider,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Container>
                <CarouselContainer
                  images={[
                    {
                      id: 1,
                      src: "https://via.placeholder.com/400x400",
                      alt: "Slide 1",
                    },
                    {
                      id: 2,
                      src: "https://via.placeholder.com/400x400",
                      alt: "Slide 2",
                    },
                    {
                      id: 3,
                      src: "https://via.placeholder.com/400x400",
                      alt: "Slide 3",
                    },
                  ]}
                />
              </Container>
            </Box>
            <Box
              className={`overflow-auto flex flex-col p-3 ${overflowStyle}`}
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
                height: "calc(100vh - 170px)",
              }}
            >
              <div>
                <Box
                  sx={{
                    marginBottom: -0.8,
                  }}
                >
                  <Typography
                    variant="caption"
                    color={"text.secondary"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      maxWidth: "80%",
                    }}
                  >
                    Publicado hace 2 horas en{" "}
                    <Typography
                      variant="caption"
                      title="Zumpango, MEX 49, Los Ovalle, ZAC, México"
                      sx={{
                        color: themeMUI.palette.primary.main,
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Zumpango, MEX 49, Los Ovalle, ZAC, México
                    </Typography>
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={"bold"}>
                  Camisa con mangas
                </Typography>
                <Typography
                  variant="body1"
                  color={"text.secondary"}
                  sx={{
                    marginTop: -0.8,
                  }}
                >
                  Prendas superiores
                </Typography>
                <Typography variant="body2" color={"text.primary"}>
                  Vendo camisa con mangas largas, color azul, talla M, en buen
                  estado. Marca Gap. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Natus officiis quos, commodi enim aliquam
                  aut consectetur animi inventore asperiores. Consequuntur
                  beatae, debitis quasi voluptate voluptatum nam perspiciatis
                  repellendus. Voluptatem, doloribus. Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Error nisi quae aperiam
                  quam quos quis nemo nam, est assumenda dolor ratione a.
                  Incidunt repudiandae blanditiis ducimus dolorem debitis non
                  velit.
                </Typography>
              </div>
              <div className="flex flex-col mt-4">
                <Typography variant="body1" fontWeight={"bold"}>
                  Detalles de la publicación
                </Typography>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="body2" color={"text.secondary"}>
                    Precio:
                  </Typography>
                  <Typography variant="body2" color={"text.primary"}>
                    1000 MXN
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="body2" color={"text.secondary"}>
                    Estado:
                  </Typography>
                  <Typography variant="body2" color={"text.primary"}>
                    Nuevo
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="body2" color={"text.secondary"}>
                    Material:
                  </Typography>
                  <Typography variant="body2" color={"text.primary"}>
                    Algodón
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="body2" color={"text.secondary"}>
                    Patrón:
                  </Typography>
                  <Typography variant="body2" color={"text.primary"}>
                    Rayas
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="body2" color={"text.secondary"}>
                    Color:
                  </Typography>
                  <Typography variant="body2" color={"text.primary"}>
                    Azul
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="body2" color={"text.secondary"}>
                    Ocasión de uso:
                  </Typography>
                  <Typography variant="body2" color={"text.primary"}>
                    Casual
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Divider />
                <Typography variant="body1" fontWeight={"bold"}>
                  Detalles del vendedor
                </Typography>
                <div className="flex flex-row justify-start items-center gap-2">
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
                    alt="Sabas Campuzano"
                    sx={{
                      width: 64,
                      height: 64,
                    }}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200 ease-in-out cursor-pointer"
                  />
                  <div className="flex flex-col items-start">
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Sabas Campuzano
                    </Typography>
                    <Typography variant="caption" color={"text.secondary"}>
                      @sabas.campuzano
                    </Typography>
                    <Rating name="read-only" value={4} readOnly size="medium" />
                  </div>
                </div>
                <div className="flex flex-row justify-start gap-2 items-center pb-2 md:absolute bottom-0">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FiSend />}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Enviar mensaje al vendedor
                  </Button>
                  <ToggleFavorite animation={true} />
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemFairing;

export async function getServerSideProps(context) {
  if (!auth.currentUser) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
