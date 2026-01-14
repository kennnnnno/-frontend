import { useContext } from "react";
import { Info } from "../components/Info";
import { UserContext } from "../provider/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";

export const Infom = () => {
  const { userInfo } = useContext(UserContext);
  const loggedIn = userInfo.token !== "";
  return <>{loggedIn ? <Info /> : <Navigate replace to="/" />}</>;
};
