import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  ButtonGroup,
  Divider,
  useTheme,
  Paper,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLayoutEffect } from "react";
import axios from "axios";
import VerifyTheme from "../components/General/verifyTheme";
import { auth } from "@/lib/firebase";
import { jwtVerify } from "jose";
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  prompt: "consent",
  tenant: "f8cdef31-a31e-4b4a-93e4-5f571e91255a             ",
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
});

export default function Login() {
  const theme = VerifyTheme();
  const themeMUI = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackText, setSnackText] = useState("");

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            await axios.post("/api/auth/login", auth.currentUser);
            await router.push("/closet");
          } catch (e) {
            switch (e.code) {
              case "auth/invalid-email":
                setSnackText(
                  "Correo electrónico o contraseña incorrectos, intenta de nuevo."
                );
                break;
              case "auth/wrong-password":
                setSnackText(
                  "Correo electrónico o contraseña incorrectos, intenta de nuevo."
                );
                break;
              case "auth/user-not-found":
                setSnackText(
                  "Correo electrónico o contraseña incorrectos, intenta de nuevo."
                );
                break;
              case "auth/too-many-requests":
                setSnackText(
                  "Demasiados intentos fallidos, intenta de nuevo más tarde."
                );
                break;
              default:
                setSnackText(
                  "Ocurrió un error inesperado, intenta de nuevo más tarde"
                );
                break;
            }
            setOpenSnack(true);
          }
        }}
      >
        {(formik) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <Paper
                className="flex flex-col rounded-lg mt-5 w-full pl-5 pr-5"
                sx={{
                  border:
                    theme === "light"
                      ? "1px solid " + themeMUI.palette.divider
                      : "none",
                  minWidth: "300px",
                  maxWidth: "450px",
                }}
              >
                <div className="flex flex-col items-center justify-center mt-5 md:mt-3">
                  <Link href={"/"}>
                    <Image
                      src={"/OFNI-LOGO.svg"}
                      width="120"
                      height={"140"}
                      alt="OFNI-LOGO"
                      className=" md:mt-3"
                    />
                  </Link>
                  <Typography
                    variant="body1"
                    className="mt-3 text-center"
                    color={"text.primary"}
                  >
                    Iniciar sesión
                  </Typography>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <Field
                      as={TextField}
                      name="email"
                      placeholder="Correo electrónico"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={formik.touched.email && formik.errors.email}
                      helperText={<ErrorMessage name="email" />}
                      disabled={formik.isSubmitting}
                      className="no-autofill"
                    />
                    <Field
                      as={TextField}
                      name="password"
                      placeholder="Contraseña"
                      variant="outlined"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      error={formik.touched.password && formik.errors.password}
                      helperText={<ErrorMessage name="password" />}
                      disabled={formik.isSubmitting}
                      className="no-autofill"
                    />
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          setShowPassword((show) => !show);
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "rgb(37 99 235)",
                          },
                        }}
                        size="small"
                        className="h-4"
                      />
                    }
                    className="w-fit"
                    label={
                      <Typography className="text-xs text-gray-500 -ml-1 mt-0.5 w-fit">
                        Mostrar contraseña
                      </Typography>
                    }
                  />
                  <div className="flex justify-end">
                    <Link href={"/auth/forgot_password"}>
                      <Typography className="text-xs md:text-sm text-blue-600 hover:text-blue-800 w-fit">
                        ¿Olvidaste tu contraseña?
                      </Typography>
                    </Link>
                  </div>
                </div>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      textTransform: "none",
                      width: "100%",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      backgroundColor: "#2c6bed",
                      "&:hover": {
                        backgroundColor: "#1e5cdb",
                      },
                    }}
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Iniciar sesión
                  </Button>
                  <div className="flex justify-end -mt-3">
                    <Link href={"/auth/register"}>
                      <Typography className="text-xs md:text-sm hover:text-blue-800 text-blue-600">
                        ¿Aún no tienes cuenta?
                      </Typography>
                    </Link>
                  </div>
                </div>
                <Divider className="text-xs mt-4">O continúa con:</Divider>
                <div className="flex justify-evenly mt-2 mb-5">
                  <Button
                    variant="text"
                    className="w-5 rounded-full"
                    size="small"
                    onClick={async () => {
                      try {
                        await setPersistence(auth, browserLocalPersistence);
                        await signInWithPopup(auth, googleProvider);
                        await axios.post(
                          "/api/auth/providerLogin",
                          auth.currentUser
                        );
                        router.push("/closet");
                      } catch (error) {
                        setSnackText(
                          "Ocurrió un error inesperado, intenta de nuevo más tarde"
                        );
                        setOpenSnack(true);
                      }
                    }}
                  >
                    <Image
                      src={"/google-icon.svg"}
                      width={18}
                      height={18}
                      alt="GoogleIcon"
                    />
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    className="rounded-full"
                    onClick={async () => {
                      try {
                        await setPersistence(auth, browserLocalPersistence);
                        const result = await signInWithPopup(
                          auth,
                          microsoftProvider
                        );
                        console.log(result);
                      } catch (error) {
                        console.log(error);
                        setSnackText(
                          "Ocurrió un error inesperado, intenta de nuevo más tarde"
                        );
                        setOpenSnack(true);
                      }
                    }}
                  >
                    <Image
                      src={"/microsoft-icon.svg"}
                      width={18}
                      height={18}
                      alt="MicrosoftIcon"
                    />
                  </Button>
                </div>
              </Paper>
            </div>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackText}
        </Alert>
      </Snackbar>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET?.toString().trim();
  const jwt = cookies?.split("=")[1];

  if (jwt) {
    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret));
      return {
        redirect: {
          destination: "/closet",
          permanent: false,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
  return {
    props: {},
  };
}
