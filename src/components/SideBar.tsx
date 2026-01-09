import { useContext, useState } from "react";
import { UserContext } from "../provider/UserProvider";
import { getList, post } from "../api/Post";
import { PostListContext, PostType } from "../provider/PostListProvider";
import styled from "styled-components";
import { Listnum} from "./PostList";
import { NowPostContext } from "../provider/NowPostProvider";

export const SideBar = () => {
    const [msg, setMsg] = useState("");
    const {userInfo}=useContext(UserContext);
    const {setPostList}=useContext(PostListContext);
    const {setStart} = useContext(NowPostContext);

    const getPostList = async () => {
        console.log(userInfo)
        const posts = await getList(userInfo.token,0,Listnum);
        const records = posts[0];

        let postList: Array<PostType> = [];

        if (records) {

            console.log(records);

                records.forEach((p: any) => {

                    postList.push({

                        id: p.id,

                         user_name: p.user_name,

                        content: p.content,

                        created_at: new Date(p.created_at),

                });

      });
    }

    setPostList(postList);

  };
    const onSendClick = async() => {
        await post(userInfo.token, msg);
        await getPostList();
        setMsg("");
        setStart(0);
        
  };


    return(
        <SSideBar>

            <SSideBarRow>{userInfo.name}</SSideBarRow>

            <SSideBarRow>{userInfo.mail}</SSideBarRow>

                <SSideBarRow>

                    <SSideBarTextArea
                        rows={4}
                        placeholder="投稿内容を入力"
                        value={msg}
                        onChange={(evt) => setMsg(evt.target.value)}
             ></SSideBarTextArea>

      </SSideBarRow>

      <SSideBarRow>

        <SSideBarButton onClick={()=>{onSendClick();}}>送信</SSideBarButton>

      </SSideBarRow>

    </SSideBar>
    )
}

const SSideBar = styled.div`

  padding: 8px;

`



const SSideBarRow = styled.div`

  margin-top: 4px;

  margin-bottom: 4px;

  text-align: left;

`

const SSideBarTextArea = styled.textarea`

  border-radius: 4px;

  box-shadow: inset 0 2px 4px #CCCCCC;

  width: 100%;

  resize: vertical;

`



const SSideBarButton = styled.button`

  background-color: #222222;

  padding: 4px;

  border-radius: 8px;

  color: #FAFAFA;

  width: 100%;

`