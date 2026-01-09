import styled from "styled-components"
import { UserContext } from "../provider/UserProvider";
import { ReactNode, useContext, useRef, useState } from "react";
import { UserProfileContext } from "../provider/UserProfileProvider";
import { putUserinfo } from "../api/User";
import React from "react";
import { photoupload, photourl } from "./photoupload";

export const ProfileSideBar = () => {

    const {userprofile} = useContext(UserProfileContext);
    const {userInfo} = useContext(UserContext);
    const [setting,setSetting] = useState(false);
    const [umail,setUmail] = useState(userprofile.umail);
    const [introductiontext,setIntroductiontext]=useState(userprofile.text);
    const [photoid, setPhotoid] = useState(userprofile.Photoid);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    console.log(userprofile);

    //ファイルを選択するボタンが押された時の関数
    const fileClick = () => {
        if (fileInputRef.current) {
        fileInputRef.current.click();
        }
    }
    // ファイルが選択されたときにファイルをストレージに保存する関数
  const handleFileChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files ? files[0] : null;
    
    if (file) {
      try {
        const result = await photoupload(file);

        alert('アイコンが正常に設定されました！');
        console.log(result.url);
        setPhotoid(result.publicId);
        return result;
    } catch (error) {
        alert('アイコン設定に失敗しました。');
    }

      
    }
  }



    const getLines = (src: string):ReactNode => {
    
        return src.split('\n').map((line, index) => {
    
          return (
    
            <React.Fragment key={index}>
    
              {line}
    
              <br />
    
            </React.Fragment>
    
          )
    
        });
    
    }

    const Clicksetting = async() => {
        await putUserinfo(userInfo.id,userInfo.token,photoid,umail,introductiontext);
        setSetting(false);
    }

    return(
        <>
       {photoid?<Photo src={photourl(photoid)}/>:<Photo src={photourl("0684456b-aa2b-4631-86f7-93ceaf33303c_ziuody")}/>}
       {setting?<><HiddenFileInput type="file" accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}/><CustomButton onClick={fileClick}>写真を選択</CustomButton></>:<></>}
       <Name>{userprofile.name}</Name>
       {setting?<Sinput value={umail} placeholder="メールアドレスを入力" onChange={(evt) => setUmail(evt.target.value) }></Sinput>:<Data>{umail}</Data>}
       {setting?
       <SSideBarTextArea rows={4} value={introductiontext} placeholder="プロフィールテキストを入力" onChange={(evt) => setIntroductiontext(evt.target.value)}></SSideBarTextArea>:
             (introductiontext?<Intro>{getLines(introductiontext)}</Intro>:<></>)
        }
       <br></br>
       {userInfo.id==userprofile.id?(setting?<Sbutton onClick={Clicksetting}>編集を保存</Sbutton>:<Sbutton onClick={()=>{setSetting(true)}}>プロフィールを編集</Sbutton>):<></>}
       </>
    )

}

const HiddenFileInput = styled.input`
  display: none;
`;

// 代わりにユーザーに見せるカスタムボタン
const CustomButton = styled.button`
  padding: 5px 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  margin-top:10px;
`;

const Photo = styled.img`
    width: 70%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    margin-top:20px;
    border-radius:50%
`
const Name = styled.div`
    font-size:30px;    
`
const Data = styled.div`
    font-size:20px; 
    color:grey;
`
const Intro = styled.div`
    font-size:15px; 
    margin:left:10px;
    
`
const Sbutton = styled.button`

  background-color: #222222;

  font-size:14px;

  border-radius: 4px;

  color: #FAFAFA;

  width: 60%;

`
const Sinput = styled.input`
    font-size:15px;
    margin-top:10px;
    margin-bottom:15px;
`
const SSideBarTextArea = styled.textarea`

  border-radius: 4px;

  box-shadow: inset 0 2px 4px #CCCCCC;

  width: 90%;

  resize: vertical;

`