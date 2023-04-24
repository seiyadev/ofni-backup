import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  useTheme,
  Paper,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import VerifyTheme from "../components/General/verifyTheme";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { jwtVerify } from "jose";
const googleProvider = new GoogleAuthProvider();

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/,
      "El nombre solo puede contener letras y espacios."
    )
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener menos de 30 caracteres")
    .required("Campo requerido."),
  username_ofni: Yup.string()
    .matches(/^[a-z0-9_]+\.*[a-z0-9_]*[a-z0-9]+$/, {
      message: "Nombre de usuario inválido.",
      excludeEmptyString: true,
    })
    .min(5, "El nombre de usuario debe tener al menos 5 caracteres")
    .max(18, "El nombre de usuario debe tener menos de 18 caracteres")
    .required("Campo requerido."),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Campo requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(64, "La contraseña debe tener menos de 64 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "La contraseña debe tener al menos una letra mayúscula, una minúscula y un número"
    )
    .required("Campo requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Campo requerido"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const theme = VerifyTheme();
  const themeMUI = useTheme();
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
        initialValues={{
          email: "",
          password: "",
          name: "",
          username_ofni: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await axios.post("/api/auth/verifyUsernameExists", values);
            await setPersistence(auth, browserLocalPersistence);
            const createUserAuth = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            await updateProfile(createUserAuth.user, {
              displayName: values.name,
            });
            await axios.post("/api/auth/createUser", {
              currentUser: createUserAuth.user,
              username: values.username_ofni,
            });
          } catch (error) {
            console.log(error);
            if (error.response) {
              setSnackText(error.response.data.message);
            }
            if (error.message.includes("auth/email-already-in-use")) {
              setSnackText("El correo electrónico ingresado ya está en uso.");
            }
            setOpenSnack(true);
          }
        }}
      >
        {(formik) => (
          <Form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Paper
              className="flex flex-col rounded-lg mt-5 w-full pl-5 pr-5 m-auto"
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
                  color={"text.secondary"}
                >
                  Registrar nuevo usuario
                </Typography>
              </div>
              <div className="flex flex-col mt-4">
                <div className="grid grid-cols-1 gap-2">
                  <Field
                    as={TextField}
                    name="name"
                    placeholder="Nombre completo"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.name && formik.errors.name}
                    helperText={<ErrorMessage name="name" />}
                  />
                  <Field
                    as={TextField}
                    name="username_ofni"
                    placeholder="Nombre de usuario"
                    variant="outlined"
                    fullWidth
                    type="text"
                    helperText={<ErrorMessage name="username_ofni" />}
                    error={
                      formik.touched.username_ofni &&
                      formik.errors.username_ofni
                    }
                    autoComplete="off"
                    sx={{
                      "& .MuiInputBase-input:-webkit-autofill": {
                        backgroundColor: "transparent",
                      },
                    }}
                  />
                </div>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  type="email"
                  error={formik.touched.email && formik.errors.email}
                  className="mb-2 mt-2"
                  helperText={<ErrorMessage name="email" />}
                />
                <div className="flex flex-col gap-2 justify-between">
                  <Field
                    as={TextField}
                    name="password"
                    placeholder="Contraseña"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    error={formik.touched.password && formik.errors.password}
                    helperText={<ErrorMessage name="password" />}
                    sx={{
                      "& .MuiInputBase-input:-webkit-autofill": {
                        backgroundColor: "transparent",
                      },
                    }}
                  />
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    helperText={<ErrorMessage name="confirmPassword" />}
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
                  className="mt-0.5 w-fit"
                  label={
                    <Typography className="text-xs text-gray-500 -ml-1 mt-0.5 w-fit">
                      Mostrar contraseñas
                    </Typography>
                  }
                />
              </div>

              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "#2c6bed",
                  "&:hover": {
                    backgroundColor: "#1e5cdb",
                  },
                }}
                size="large"
                fullWidth
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Registrarse
              </Button>
              <div className="flex justify-end">
                <Link href={"/auth/login"}>
                  <Typography className="text-xs md:text-sm hover:text-blue-800 text-blue-600 -mt-3">
                    ¿Ya tienes una cuenta?
                  </Typography>
                </Link>
              </div>
              <Divider className="text-xs mt-2">O continúa con:</Divider>
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
                <Button variant="text" size="small" className="rounded-full">
                  <Image
                    src={"/microsoft-icon.svg"}
                    width={18}
                    height={18}
                    alt="MicrosoftIcon"
                  />
                </Button>
              </div>
            </Paper>
            <div
              className="flex justify-center text-center m-auto mt-2 mb-4"
              style={{
                minWidth: "300px",
                maxWidth: "450px",
              }}
            >
              <Typography
                variant="caption"
                color={"text.secondary"}
                sx={{
                  fontSize: "0.8rem",
                }}
              >
                Al continuar, aceptas los{" "}
                <Link
                  href={"/terms-and-conditions"}
                  style={{
                    color: "#2c6bed",
                    "&:hover": {
                      color: "#1e5cdb",
                    },
                  }}
                >
                  Términos y Condiciones
                </Link>{" "}
                de OFNI y confirmas que has leido la{" "}
                <Link
                  href="/privacy-policy"
                  style={{
                    color: "#2c6bed",
                    "&:hover": {
                      color: "#1e5cdb",
                    },
                  }}
                >
                  Política de Privacidad
                </Link>{" "}
                de OFNI
              </Typography>
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
