import { useContext, useState } from "react";
import { sign_in } from "../api/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";
import axios, { isAxiosError } from "axios";
import * as S from "../styles/styled";

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
    <S.SSignInFrame>
      <S.SSignInRow>
        <S.SSignInLabel>
          <label htmlFor="id">ID</label>
        </S.SSignInLabel>

        <S.SSignInInput>
          <input
            id="id"
            value={userId}
            type="text"
            onChange={(evt) => setUserId(evt.target.value)}
          />
        </S.SSignInInput>
      </S.SSignInRow>

      <S.SSignInRow>
        <S.SSignInLabel>
          <label htmlFor="password">Password</label>
        </S.SSignInLabel>

        <S.SSignInInput>
          <input
            id="password"
            value={pass}
            type="text"
            onChange={(evt) => setPass(evt.target.value)}
          />
        </S.SSignInInput>
      </S.SSignInRow>

      <S.SSignInRow>
        <S.SLoginButton type="button" onClick={onSignInClick}>
          Login
        </S.SLoginButton>
      </S.SSignInRow>

      <S.NewaccountLink
        onClick={() => {
          navigate("/createaccount");
        }}
      >
        新規登録はこちら
      </S.NewaccountLink>
    </S.SSignInFrame>
  );
}
