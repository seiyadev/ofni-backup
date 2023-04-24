import React from "react";
import SideBar from "@/pages/components/Closet/SideBar";
import NavBar from "@/pages/components/NavBar/NavBar";
import axios from "axios";

function Outfit({ user }) {
  const [userFetched, setUserFetched] = React.useState({});

  React.useEffect(() => {
    setUserFetched(user);
  }, [user]);
  return (
    <>
      <NavBar user={userFetched} />
      <SideBar>Atuendo</SideBar>
    </>
  );
}

export default Outfit;

export async function getServerSideProps(context) {
  let user = null;
  try {
    const token = context.req.cookies[process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const req = await axios.get("http://localhost:4000/closet", config);
    user = req.data;
    return {
      props: {
        user,
        priceRange: 2,
      },
    };
  } catch (error) {
/*     return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }; */
  }
}
