import { useContext, useState } from "react";
import { sign_in } from "../api/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";
import styled from "styled-components";
import axios, { isAxiosError } from "axios";

export default function SignIn() {
  const navigate = useNavigate(); // navigateオブジェクトを作成する

  const [userId, setUserId] = useState(""); // ユーザーIDを保持するstate

  const [pass, setPass] = useState(""); // パスワードを保持するstate

  const { setUserInfo } = useContext(UserContext);

  const onSignInClick = async () => {
    try {
      const ret = await sign_in(userId, pass);

      console.log(ret);

      if (ret.data && ret.data.token) {
        // setUserInfoを使用してコンテキストにユーザー情報を保存する

        setUserInfo({
          id: ret.data.user_id,

          name: ret.data.user_name,

          token: ret.data.token,

          mail: ret.data.user_mail,
        });
        navigate("/main");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status == 401) {
          window.alert("IDまたはパスワードが正しくありません。");
        }
      }
    }
  };

  return (
    <SSignInFrame>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="id">ID</label>
        </SSignInLabel>

        <SSignInInput>
          <input
            id="id"
            value={userId}
            type="text"
            onChange={(evt) => setUserId(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="password">Password</label>
        </SSignInLabel>

        <SSignInInput>
          <input
            id="password"
            value={pass}
            type="text"
            onChange={(evt) => setPass(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        <SLoginButton type="button" onClick={onSignInClick}>
          Login
        </SLoginButton>
      </SSignInRow>

      <NewaccountLink
        onClick={() => {
          navigate("/createaccount");
        }}
      >
        新規登録はこちら
      </NewaccountLink>
    </SSignInFrame>
  );
}

const NewaccountLink = styled.p`
  font-size: 13px;
  text-decoration: underline;
  margin-top: 8px;
  margin-bottom: 3px;
`;

const SSignInFrame = styled.div`
  background-color: #f8f8f8;

  margin: 80px;

  padding-top: 8px;

  padding-bottom: 8px;

  border-radius: 8px;

  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  dixplay: inline-block;

  margin-top: 4px;

  margin-bottom: 4px;
`;

const SSignInLabel = styled.span`
  display: inline-block;

  width: 25%;

  vertical-align: top;

  text-align: right;

  margin-right: 4px;
`;

const SSignInInput = styled.span`
  display: inline-block;

  width: auto;

  vertical-align: top;

  margin-left: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;

  color: #f0f0f0;

  padding: 4px 16px;

  border-radius: 8px;
`;
