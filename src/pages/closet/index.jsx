import React from "react";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/Closet/SideBar";

function ClosetIndex() {
  return <></>;
}

export default ClosetIndex;

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/closet/g",
      permanent: true,
    },
  };
};
