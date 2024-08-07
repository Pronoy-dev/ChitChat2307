import React, { useEffect, useState } from "react";
import HomwRightContent from "../../Components/HomeComponents/HomeRightComponents/HomeRightContent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotVerified from "../../Components/HomeComponents/HomeRightComponents/NotVerified/NotVerified";

const Home = () => {
  const auth = getAuth();
  const [isEmailVerified, setisEmailVerified] = useState({
    email: "",
    displayName: "displayName",
    emailVerified: false,
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setisEmailVerified({
        email: user.reloadUserInfo.email,
        displayName: user.reloadUserInfo.displayName,
        emailVerified: user.reloadUserInfo.emailVerified,
      });
      console.log(user.reloadUserInfo.emailVerified);
    });
  }, []);
  console.log(isEmailVerified);

  return (
    <>
      <div>
        {isEmailVerified.emailVerified ? (
          <HomwRightContent />
        ) : (
          <NotVerified userInfo={isEmailVerified} />
        )}
      </div>
    </>
  );
};

export default Home;
