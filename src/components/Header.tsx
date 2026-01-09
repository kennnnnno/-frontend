import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";
import { getUser, getUserinfo } from "../api/User";
import styled from "styled-components";
import { UserProfileContext } from "../provider/UserProfileProvider";


export const  Header = () => {

  const navigate = useNavigate();

  const [userName, setUserName] =useState("");
  const { userInfo,setUserInfo } = useContext(UserContext);
  const {setUserprofile} = useContext(UserProfileContext);

  const logout = () => {
    setUserInfo({ id: 0,name:"", token: "",mail:"",});
    navigate("/");
  };

    useEffect(() => {
    const myGetUser = async () => {
      const user = await getUser(Number(userInfo.id), userInfo.token);
      setUserName(user.name);
    };

    myGetUser();

  }, []);

  const onClickProfile= async()=>{
      const user = await getUserinfo(userInfo.name,userInfo.token);
      setUserprofile(user);
    navigate("info");
  }



  return (

    <SHeader>

      <SLogo>MicroPost</SLogo>
      <SRightItem>

      <SName onClick={onClickProfile}>{userName}</SName>

      <SLogout onClick={logout}>ログアウト</SLogout>

      </SRightItem>

    </SHeader>

  );

}

const SHeader = styled.div`

  background-color: #222222;

  display: flex;

  flex-direction: row;

  color: #F8F8F8;

  padding-left: 8px;

  padding-right: 8px;

  height: 100%;

`



const SLogo = styled.div`

  padding-top: 8px;

  padding-bottom: 8px;

  text-align: center;

  justyify-content: start;

`



const SRightItem = styled.div`

  width:100%;

  display: flex;

  flex-direction: row;

  justify-content: end;

`



const SName = styled.div`

  padding-top: 8px;

  padding-bottom: 8px;

  text-align: center;

  margin-right: 8px;

`



const SLogout = styled.div`

  padding-top: 8px;

  padding-bottom: 8px;

  text-align: center;

`