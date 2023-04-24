import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDbUser, setLoadingUser } from "@/features/auth/userSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function GetUser({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      router.pathname !== "/" &&
      !router.pathname.includes("/auth")
    ) {
      const getUser = async () => {
        try {
          const result = await axios.post("/api/getUser", {
            uid: auth.currentUser.uid,
          });
          const dbUserResult = result.data.dbUser;
          await dispatch(setDbUser(dbUserResult));
          await dispatch(setLoadingUser(false));
        } catch (error) {
          setOpen(true);
        }
      };
      getUser();
    }
  }, [router.pathname, dispatch]);
  return (
    <>
      {children}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Error de autenticación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ha ocurrido un error al autenticar tu cuenta. Por favor, inicia
            sesión nuevamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              router.push("/auth/login");
            }}
            sx={{
              textTransform: "none",
            }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GetUser;
