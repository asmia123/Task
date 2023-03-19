import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";

import NavandSide from "./nav&side";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token) {
      authCtx.login(token);
    } else {
      authCtx.logout();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line eqeqeq
    <div>{authCtx.isLoggedIn == true && <NavandSide />}</div>
   
  );
};

export default MainNavigation;