import { useContext } from "react";
import { MainLayout } from "../components/MainLayout";
import { PostListProvider } from "../provider/PostListProvider";
import { UserContext } from "../provider/UserProvider";
import { Navigate } from "react-router-dom";
import { NowPostProvider } from "../provider/NowPostProvider";

export default function Main() {
  const { userInfo } = useContext(UserContext);
  const loggedIn = userInfo.token !== "";

  return (
    <PostListProvider>
      <NowPostProvider>
        {loggedIn ? <MainLayout /> : <Navigate replace to="/" />}
      </NowPostProvider>
    </PostListProvider>
  );
}
