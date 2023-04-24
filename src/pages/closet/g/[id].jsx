import React from "react";
import SideBar from "@/pages/components/Closet/SideBar";
import NavBar from "@/pages/components/NavBar/NavBar";
import axios from "axios";
import { auth } from "@/lib/firebase";

function Garment({ user }) {
  const [userFetched, setUserFetched] = React.useState({});

  React.useEffect(() => {
    setUserFetched(user);
  }, [user]);

  return (
    <>
      <NavBar user={userFetched} />
      <SideBar>Prenda</SideBar>
    </>
  );
}

export default Garment;

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

