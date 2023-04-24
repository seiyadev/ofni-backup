import SideBar from "@/pages/components/Closet/SideBar";
import NavBar from "@/pages/components/NavBar/NavBar";
import axios from "axios";
import React from "react";
import { auth } from "@/lib/firebase";

function Garments() {
  const [userFetched, setUserFetched] = React.useState({});
  return (
    <>
      <NavBar user={userFetched} />
      <SideBar>Prendas</SideBar>
    </>
  );
}

export default Garments;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
