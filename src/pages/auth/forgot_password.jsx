import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Modal,
  Radio,
  RadioGroup,
  Slide,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { jwtVerify } from "jose";

function ForgotPassword() {
  // Router hook
  const router = useRouter();

  // Avatar text
  const FullNameInitials = (...words) => {
    let initials = "";
    for (const word of words) {
      initials += word.charAt(0).toUpperCase();
    }
    return initials;
  };

  // User data
  const [user, setUser] = React.useState(null);

  // Form states
  const [formStep, setFormStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [valueChoose, setValueChoose] = React.useState("email");
  const handleChangeChoose = (event) => {
    setValueChoose(event.target.value);
  };
  const validationSchemaVerifyEmail = Yup.object().shape({
    input_account: Yup.string().required("Campo requerido"),
    /* .matches(
          /^(?:\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          "Correo electrónico o número de teléfono inválido"
        ), */
  });
  const handleFormVerifyEmailSubmit = async (values, { setErrors }) => {
    try {
      // Consulta a la API para verificar si el usuario existe o no, si existe devuelve los datos del usuario
      const user = await axios.post(
        "https://jsonplaceholder.typicode.com/users/",
        values.input_account
      );
      setUser(user.data);
      setFormStep(1);
    } catch (error) {
      setErrors({ input_account: "No pudimos encontrar una cuenta OFNI" });
    }
  };

  const sendCode = (e) => {
    setFormStep(2);
  };

  const InsertEmail = () => {
    return (
      <Formik
        initialValues={{ input_account: "" }}
        validationSchema={validationSchemaVerifyEmail}
        onSubmit={handleFormVerifyEmailSubmit}
      >
        {(formik) => (
          <>
            <div className="">
              <Typography variant="h6" className="text-center">
                Recuperación de contraseña
              </Typography>
              <Typography variant="body2" className="text-center">
                Ingresa tu correo electrónico o número telefónico
              </Typography>
            </div>
            <div className="mt-5 w-80 m-auto">
              <Field
                as={TextField}
                name="input_account"
                label="Correo electrónico o número telefónico"
                variant="outlined"
                fullWidth
                error={
                  formik.touched.input_account &&
                  Boolean(formik.errors.input_account)
                }
                helperText={
                  <Typography
                    variant="caption"
                    className="-ml-3.5"
                    color={"error"}
                  >
                    {formik.errors.input_account}
                  </Typography>
                }
                disabled={formik.isSubmitting}
                value={formik.values.input_account}
                onChange={formik.handleChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    formik.handleSubmit();
                  }
                }}
              />
              <div className="flex justify-end pb-4">
                <Button
                  className=""
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#2c6bed",
                    "&:hover": {
                      backgroundColor: "#1e5cdb",
                    },
                  }}
                  type="submit"
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </>
        )}
      </Formik>
    );
  };

  const ChooseMethod = () => {
    return (
      <div className="m-auto">
        <div className="flex items-center">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
            sx={{
              width: 52,
              height: 52,
              backgroundColor: "#2c6bed",
            }}
            alt="Axel Chávez"
            className=""
          >
            <p className="text-white text-4xl">
              {FullNameInitials("Axel", "Chávez")}
            </p>
          </Avatar>
          <div className="ml-2 grid grid-cols-1 gap-0">
            <Typography variant="body2">Axel Chávez</Typography>
            <Typography variant="caption">axelherrerauwu@gmail.com</Typography>
          </div>
        </div>
        <Divider className="mt-2 mb-2" />
        <div className="w-80">
          <FormControl>
            <Typography variant="body2" className="">
              ¿Cómo quieres recuperar tu contraseña?
            </Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              className="grid grid-cols-1 gap-0.5 mt-2"
              value={valueChoose}
              onChange={handleChangeChoose}
            >
              <FormControlLabel
                value="sms"
                control={<Radio />}
                label={
                  <Typography variant="caption">
                    Enviar un código de verificación a mi número telefónico vía
                    SMS
                  </Typography>
                }
                className="hover:bg-gray-100 m-auto"
              />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label={
                  <Typography variant="caption">
                    Enviar un código de verificación a mi correo electrónico
                  </Typography>
                }
                className="hover:bg-gray-100 m-auto"
              />
            </RadioGroup>
          </FormControl>
          <div className="flex justify-end pb-4">
            <Button
              className=""
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#2c6bed",
                "&:hover": {
                  backgroundColor: "#1e5cdb",
                },
              }}
              onClick={sendCode}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const validationSchemaSendCode = Yup.object().shape({
    verification_code: Yup.string()
      .required("Campo requerido")
      .matches(/^[0-9]+$/, "Solo se permiten números"),
  });
  const handleFormSendCodeSubmit = async (values, { setErrors }) => {
    try {
      // Consulta a la API para validar el código de verificación
      const ver_code_req = await axios.post(
        "https://jsonplaceholder.typicode.com/users/",
        values
      );
      if (ver_code_req.status === 201) {
        setFormStep(3);
      } else {
        throw new Error("Código de verificación inválido");
      }
    } catch (error) {
      setErrors({ verification_code: "Código de verificación inválido" });
    }
  };
  const InsertCode = () => {
    return (
      <Formik
        initialValues={{ verification_code: "" }}
        validationSchema={validationSchemaSendCode}
        onSubmit={handleFormSendCodeSubmit}
      >
        {(formik) => (
          <div className="m-auto">
            <div className="flex items-center">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
                sx={{
                  width: 52,
                  height: 52,
                  backgroundColor: "#2c6bed",
                }}
                alt="Axel Chávez"
                className=""
              >
                <p className="text-white text-4xl">
                  {FullNameInitials("Axel", "Chávez")}
                </p>
              </Avatar>
              <div className="ml-2 grid grid-cols-1 gap-0">
                <Typography variant="body2">Axel Chávez</Typography>
                <Typography variant="caption">
                  axelherrerauwu@gmail.com
                </Typography>
              </div>
            </div>
            <Divider className="mt-2 mb-2" />
            <div className="w-80">
              <FormControl>
                <Typography variant="body2" className="">
                  Se envió un código de verificación de seis dígitos a tu{" "}
                  {valueChoose === "sms"
                    ? "número telefónico"
                    : "correo electrónico"}
                </Typography>
                <div className="mt-2">
                  <Field
                    as={TextField}
                    name="verification_code"
                    label="Ingresa el código de verificación"
                    variant="outlined"
                    fullWidth
                    disabled={formik.isSubmitting}
                    error={
                      formik.touched.verification_code &&
                      Boolean(formik.errors.verification_code)
                    }
                    helperText={
                      <Typography
                        variant="caption"
                        className="-ml-3.5"
                        color={"error"}
                      >
                        {formik.errors.verification_code}
                      </Typography>
                    }
                    value={formik.values.verification_code}
                    onChange={formik.handleChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        formik.handleSubmit();
                      }
                    }}
                    maxLength={6}
                  />
                </div>
              </FormControl>
              <div className="flex justify-end pb-4">
                <Button
                  className=""
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#2c6bed",
                    "&:hover": {
                      backgroundColor: "#1e5cdb",
                    },
                  }}
                  type="submit"
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    );
  };

  const validationNewPassword = Yup.object().shape({
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(64, "La contraseña debe tener menos de 64 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "La contraseña debe tener al menos una letra mayúscula, una minúscula y un número"
      )
      .required("Campo requerido"),
    confirmPassword: Yup.string()
      .required("Campo requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
  });
  const handleFormNewPasswordSubmit = async (values, { setErrors }) => {
    try {
      // Consulta a la API para cambiar la contraseña
      const change_pass_req = await axios.post(
        "https://jsonplaceholder.typicode.com/users/",
        values
      );
      if (change_pass_req.status === 201) {
        setFormStep(4);
      } else {
        throw new Error("Algo salió mal");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const InsertNewPassword = () => {
    return (
      <Formik
        initialValues={{ password: "", confirmPassword: undefined }}
        validationSchema={validationNewPassword}
        onSubmit={handleFormNewPasswordSubmit}
      >
        {(formik) => (
          <div className="m-auto">
            <div className="flex items-center">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
                sx={{
                  width: 52,
                  height: 52,
                  backgroundColor: "#2c6bed",
                }}
                alt="Axel Chávez"
                className=""
              >
                <p className="text-white text-4xl">
                  {FullNameInitials("Axel", "Chávez")}
                </p>
              </Avatar>
              <div className="ml-2 grid grid-cols-1 gap-0">
                <Typography variant="body2">Axel Chávez</Typography>
                <Typography variant="caption">
                  axelherrerauwu@gmail.com
                </Typography>
              </div>
            </div>
            <Divider className="mt-2 mb-2" />
            <div className="w-80">
              <FormControl>
                <div className="mt-2">
                  <Field
                    as={TextField}
                    name="password"
                    label="Nueva contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      <Typography
                        variant="caption"
                        className="-ml-3.5"
                        color={"error"}
                      >
                        {formik.errors.password}
                      </Typography>
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                  />

                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      <Typography
                        variant="caption"
                        className="-ml-3.5"
                        color={"error"}
                      >
                        {formik.errors.confirmPassword}
                      </Typography>
                    }
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        formik.handleSubmit();
                      }
                    }}
                    disabled={formik.isSubmitting}
                  />
                </div>
              </FormControl>
              <div className="flex justify-end pb-4">
                <Button
                  className=""
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#2c6bed",
                    "&:hover": {
                      backgroundColor: "#1e5cdb",
                    },
                  }}
                  type="submit"
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    );
  };

  const logIn = async () => {
    // Consulta a la API para iniciar sesión
    router.push("/closet");
  };
  const Success = () => {
    return (
      <div className="m-auto">
        <div className="flex flex-col items-center mt-2">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
            sx={{
              width: 150,
              height: 150,
              backgroundColor: "#2c6bed",
            }}
            alt="Axel Chávez"
            className=""
          >
            <p className="text-white text-4xl">
              {FullNameInitials("Axel", "Chávez")}
            </p>
          </Avatar>
          <div className="grid grid-cols-1 gap-0 text-center mt-2">
            <Typography variant="body1">
              ¡Tu contraseña ha sido cambiada con éxito!
            </Typography>
          </div>
        </div>
        <div className="w-80 mt-2">
          <div className="flex justify-end pb-4">
            <Button
              className=""
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#2c6bed",
                "&:hover": {
                  backgroundColor: "#1e5cdb",
                },
              }}
              onClick={logIn}
            >
              Ir a Armario
            </Button>
          </div>
        </div>
      </div>
    );
  };

  switch (formStep) {
    case 1:
      return (
        <div
          className="shadow-sm flex flex-col m-auto mt-10 rounded-lg w-96"
          style={{
            border: "1px solid #e4e4e4",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <div className="flex flex-col pt-4 pl-2 pr-2">
            <Image
              src={"/OFNI-LOGOJUNTO.svg"}
              width={150}
              height={50}
              alt="OFNI-LOGO"
              className="mb-2 m-auto"
            />
            <ChooseMethod />
          </div>
        </div>
      );
      break;

    case 2:
      return (
        <div
          className="shadow-sm flex flex-col m-auto mt-10 rounded-lg w-96"
          style={{
            border: "1px solid #e4e4e4",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <div className="flex flex-col pt-4 pl-2 pr-2">
            <Image
              src={"/OFNI-LOGOJUNTO.svg"}
              width={150}
              height={50}
              alt="OFNI-LOGO"
              className="mb-2 m-auto"
            />
            <InsertCode />
          </div>
        </div>
      );
      break;

    case 3:
      return (
        <div
          className="shadow-sm flex flex-col m-auto mt-10 rounded-lg w-96"
          style={{
            border: "1px solid #e4e4e4",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <div className="flex flex-col pt-4 pl-2 pr-2">
            <Image
              src={"/OFNI-LOGOJUNTO.svg"}
              width={150}
              height={50}
              alt="OFNI-LOGO"
              className="mb-2 m-auto"
            />
            <InsertNewPassword />
          </div>
        </div>
      );
      break;

    case 4:
      return (
        <div
          className="shadow-sm flex flex-col m-auto mt-10 rounded-lg w-96"
          style={{
            border: "1px solid #e4e4e4",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <div className="flex flex-col pt-4 pl-2 pr-2">
            <Image
              src={"/OFNI-LOGOJUNTO.svg"}
              width={150}
              height={50}
              alt="OFNI-LOGO"
              className="mb-2 m-auto"
            />
            <Success />
          </div>
        </div>
      );
      break;

    default:
      return (
        <div
          className="shadow-sm flex flex-col m-auto mt-10 rounded-lg w-96 relative"
          style={{
            border: "1px solid #e4e4e4",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <div className="flex flex-col pt-4 pl-2 pr-2">
            <Image
              src={"/OFNI-LOGOJUNTO.svg"}
              width={150}
              height={50}
              alt="OFNI-LOGO"
              className="mb-2 m-auto"
            />
            <InsertEmail />
          </div>
        </div>
      );
      break;
  }
}

export default ForgotPassword;

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
