import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function FooterComponent() {
  return (
    <Box
      sx={{
        width: "100%",
        pb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        src={"/OFNI-LOGOJUNTO.svg"}
        width="160"
        height={"100"}
        alt="OFNI-LOGO"
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Link href="/privacy-policy">
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Política de privacidad
          </Typography>
        </Link>
        <Link href="/terms-and-conditions">
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Términos y condiciones
          </Typography>
        </Link>
        <Typography variant="caption" color="text.secondary">
          © 2023 OFNI.
        </Typography>
      </Box>
    </Box>
  );
}

export default FooterComponent;
