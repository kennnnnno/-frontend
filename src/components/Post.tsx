import React, { useContext } from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { UserContext } from "../provider/UserProvider";
import { deletePost } from "../api/Post";
import { UserProfileContext } from "../provider/UserProfileProvider";
import { getUserinfo } from "../api/User";
import { useNavigate } from "react-router-dom";


export const Post = (props:any) => {
  
  const navigate = useNavigate();

    const { post,getPostList} = props;
    const{userInfo} = useContext(UserContext);
    const {userprofile,setUserprofile} = useContext(UserProfileContext);
  
    const getDateStr = (dateObj: Date) => {

    const year = post.created_at.getFullYear();
    const month = post.created_at.getMonth() + 1;
    const date = post.created_at.getDate();
    const hour = post.created_at.getHours()+ 9;
    const min = post.created_at.getMinutes();
    const sec = post.created_at.getSeconds();

    return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;

  };
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
  const onClickname = async(name:string) => {

    if(userprofile.name!=name){
      const user = await getUserinfo(name,userInfo.token);
    setUserprofile(user);
    navigate("/main/info");
    }
  }

  const deleteLines = async(id:number,token:string) =>{
    let res=window.confirm("投稿を削除してもよろしいですか？");
    if(res){
      await deletePost(id,token);
      await getPostList();
      
    }
    
      
  }



    return (
        <SPost>
          <div>
            <SName onClick={()=>onClickname(post.user_name)}>{post.user_name}</SName>
           <SDate>{getDateStr(post.created_at)} </SDate>
           {post.user_name==userInfo.name?
            <Sdelete onClick={()=>{deleteLines(post.id,userInfo.token)}}>削除</Sdelete>:<></>
           }
          </div>
          {getLines(post.content)}
        </SPost>
    )
}


const Sdelete = styled.a`

  color: #000044;

  font-size:small;

  `

const SPost = styled.div`

  margin: 8px 0px;

  border-bottom: 1px solid #AAAAAA;

  text-align: left;

  padding-left: 8px;

`



const SName = styled.span`

  font-size: small;

  color: #000044;

`



const SDate = styled.span`

  margin-left: 8px;

  font-size: small;

  color: #000044;

`