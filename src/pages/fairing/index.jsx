import React from "react";
import NavBar from "../components/NavBar/NavBar";
import IsWide from "../components/General/isWide";
import PostCard from "../components/Fairing/PostCard";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavBarFairing from "../components/Fairing/NavBarFairing";
import FilterDrawer from "../components/Fairing/FilterDrawer";
import CreatePost from "../components/Fairing/CreatePost";
import axios from "axios";
import { root } from "postcss";
import { auth } from "@/lib/firebase";

function Index({ priceRange, user }) {
  const isWide = IsWide();
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
          className="flex flex-col w-full pr-2 pl-2 lg:pr-6 lg:pl-6 overflow-y-scroll"
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
          <div className="flex justify-between lg:mb-1 items-center">
            <Typography variant="h6" fontWeight={"bold"}>
              Inicio
            </Typography>
            <FilterDrawer />
          </div>
          <div
            className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6 2xl:mx-auto mb-20 lg:mb-10"
            style={{
              maxWidth: "3000px",
            }}
          >
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
        <CreatePost />
      </div>
    </>
  );
}

export default Index;

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

