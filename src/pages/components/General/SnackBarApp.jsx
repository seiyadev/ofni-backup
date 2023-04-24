import React, { useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Grow, Slide } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="up" suppressHydrationWarning />;
}

function GrowTransition(props) {
  return <Grow {...props} suppressHydrationWarning />;
}

function CustomSnackbar(props) {
  const {
    message,
    severity,
    open,
    handleClose,
    vertical,
    horizontal,
    width,
    animation,
  } = props;
  const [messageState, setMessageState] = React.useState("");
  const [severityState, setSeverityState] = React.useState("");
  const [openState, setOpenState] = React.useState(false);

  React.useEffect(() => {
    if (message !== messageState) {
      setMessageState(message.toString());
    }
    if (severity !== severityState) {
      setSeverityState(severity);
    }
    if (open !== openState) {
      setOpenState(open);
    }
  }, [messageState, message, severityState, severity, openState, open]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      sx={{
        width,
      }}
      open={open}
      autoHideDuration={3500}
      onClose={handleSnackbarClose}
      TransitionComponent={animation ? SlideTransition : GrowTransition}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={severityState}
        sx={{
          width: "100%",
        }}
      >
        {messageState}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
