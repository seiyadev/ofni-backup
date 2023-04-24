import React from "react";
import NavBar from "./components/Landing/NavBar";
import HomeComponent from "./components/Landing/HomeComponent";
import { Divider } from "@mui/material";
import FootprintComponent from "./components/Landing/FootprintComponent";
import AboutAppComponent from "./components/Landing/AboutAppComponent";
import { jwtVerify } from "jose";
import AboutUsComponent from "./components/Landing/AboutUsComponent";
import { auth } from "@/lib/firebase";
import FooterComponent from "./components/Landing/FooterComponent";

export default function Home() {
  React.useEffect(() => {
    auth.signOut();
  }, []);

  return (
    <NavBar>
      <div className="pt-2 pb-10">
        <HomeComponent />
      </div>
      <Divider />
      <div className="pt-10 pb-10">
        <FootprintComponent />
      </div>
      <div id="about-ofni"></div>
      <div></div>
      <div></div>
      <Divider />
      <div className="pt-10 pb-10">
        <AboutAppComponent />
      </div>
      <div id="about-us"></div>
      <div></div>
      <div></div>
      <Divider />
      <div className="pt-10 pb-10">
        <AboutUsComponent />
      </div>
      <div className="pt-5">
        <FooterComponent />
      </div>
    </NavBar>
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
