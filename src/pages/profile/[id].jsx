import React from "react";
import axios from "axios";
import IsWide from "../components/General/isWide";
import NavBar from "../components/NavBar/NavBar";
import CoverHeading from "../components/Profile/Desktop/CoverHeading";
import HeaderMobile from "../components/Profile/Mobile/Header";
import Posts from "../components/Profile/Mobile/Posts";
import RatingAndBio from "../components/Profile/Mobile/RatingAndBio";

export default function Account({ user }) {
  const isWide = IsWide();
  const [userFetched, setUserFetched] = React.useState({});

  React.useEffect(() => {
    setUserFetched(user);
  }, [user]);

  return (
    <>
      <NavBar user={userFetched} />
      {isWide ? (
        <>
          <div className="pl-24 pr-24 pt-5">
            <CoverHeading />
          </div>
        </>
      ) : (
        <>
          <HeaderMobile />
          <RatingAndBio />
          <Posts />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
