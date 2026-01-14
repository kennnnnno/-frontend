import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProfileSideBar } from "./ProfileSideBar";
import { useContext } from "react";
import { ProfilePostList } from "./ProfilePostList";
import { UserProfileContext } from "../provider/UserProfileProvider";

export const Info = () => {
  const navigate = useNavigate();
  const { setUserprofile } = useContext(UserProfileContext);

  return (
    <>
      <SHeader>
        <Title>Profile</Title>

        <Back
          onClick={() => {
            setUserprofile({
              id: 0,
              name: "",
              Photoid: "",
              text: "",
              umail: "",
            });
            navigate("/main");
          }}
        >
          戻る
        </Back>
      </SHeader>

      <SBody>
        <SSideBar>
          <ProfileSideBar></ProfileSideBar>
        </SSideBar>

        <SContents>
          <ProfilePostList></ProfilePostList>
        </SContents>
      </SBody>
    </>
  );
};
const Title = styled.h2`
  font-size: 24px;
  margin-left: 10px;
`;
const Back = styled.p`
  margin-right: 10px;
`;

const SHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 32px;
  justify-content: space-between;

  box-shadow: 0px 4px 4px #aaaaaa;
`;

const SBody = styled.div`
  width: 100%;

  height: calc(100vh - 32px);

  display: flex;

  flex-direction: row;
`;

const SSideBar = styled.div`
  border-right: 1px solid #222222;

  width: 40%;

  height: 100%;
`;

const SContents = styled.div`
  width: 100%;

  height: 100%;
`;
