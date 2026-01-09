import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../api/User";
import axios from "axios";

export const Createaccount = () => {

  const [userId, setUserId] = useState(''); // ユーザーIDを保持するstate

  const [usermail, setUsermail] = useState(''); // パスワードを保持するstate

  const [pass1, setPass1] = useState(''); // パスワードを保持するstate

  const [pass2, setPass2] = useState(''); // パスワードを保持するstate

  const navigate = useNavigate();  // navigateオブジェクトを作成する

  const Create = async() => {
    if(pass1!=pass2){
        window.alert("パスワードが異なっています。");   
    }else if(userId==""||pass1==""){
        window.alert("IDまたはパスワードが未入力です。")
    }else {
        try{
            await postUser(userId,pass1,usermail);
            window.alert("ユーザーの登録が完了しました。");
            navigate("/");
        }catch(error){
    if(axios.isAxiosError(error)){
    const status = error.response?.status;
    if(status == 409){
      window.alert("IDがすでに利用されています。");
    }
  }
}

  }
}

return (
    <SSignInFrame>
      <h2>アカウントを作成</h2>

      <SSignInRow>

      <SSignInLabel>
        <label htmlFor="id">ID</label>
      </SSignInLabel> 

        <SSignInInput>
          <input id="id" value={userId} type="text" onChange={(evt)=>setUserId(evt.target.value)}/>
        </SSignInInput>

      </SSignInRow>

      <SSignInRow>

      <SSignInLabel>
        <label htmlFor="password1">password</label>
      </SSignInLabel>

      <SSignInInput>
        <input id="password1" value={pass1} type="text" onChange={(evt)=>setPass1(evt.target.value)}/>
      </SSignInInput>

      </SSignInRow>

      <SSignInLabel>
        <label htmlFor="password2">password(確認用)</label>
      </SSignInLabel> 

        <SSignInInput>
          <input id="password2" value={pass2} type="text" onChange={(evt)=>setPass2(evt.target.value)}/>
        </SSignInInput>

        <Redtext>※ID/パスワードはログインの際に必要になります。</Redtext>


        <SSignInRow>
        <SSignInLabel>
          <label htmlFor="usermail">Email</label>
        </SSignInLabel> 
        <SSignInInput>
          <input id="usermail" value={usermail} type="text" onChange={(evt)=>setUsermail(evt.target.value)}/>
        </SSignInInput>
      </SSignInRow>
      

      <SSignInRow>
        <br></br>
        <SLoginButton type="button" onClick={Create}>新規登録</SLoginButton>

      </SSignInRow>
      <NewaccountLink onClick={()=>{navigate("/");}}>戻る</NewaccountLink>

    </SSignInFrame>
  );

}
const Redtext = styled.p`
font-size:12px;
color:red;
margin-top:8px;
margin-bottom:15px;
`


const NewaccountLink = styled.p`
  font-size:13px;
  text-decoration:underline;
  margin-top:8px;
  margin-bottom:3px;
  
`

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