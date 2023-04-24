import React from "react";
import IsWide from "../components/General/isWide";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/Settings/SideBar";
import axios from "axios";

function Index({ user }) {
  const isWide = IsWide();
  const [userFetched, setUserFetched] = React.useState({});

  React.useEffect(() => {
    setUserFetched(user);
  }, [user]);

  return (
    <>
      <NavBar user={userFetched} />
      <SideBar>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nam illo,
        magnam earum nobis esse ducimus animi. Architecto laudantium, incidunt
        quod deleniti magnam porro itaque hic, odio rem id quia!
      </SideBar>
    </>
  );
}

export default Index;

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
