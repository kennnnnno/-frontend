import { useContext, useEffect, useState } from "react";
import { Post } from "./Post";
import { UserContext } from "../provider/UserProvider";
import { PostType } from "../provider/PostListProvider";
import { getUserList } from "../api/Post";
import styled from "styled-components";
import { UserProfileContext } from "../provider/UserProfileProvider";

//一画面に何個のポストを表示するかの定数
export const Listnum = 10;

export const ProfilePostList = () => {
  const [start, setStart] = useState(0);
  const { userInfo } = useContext(UserContext);
  const { userprofile } = useContext(UserProfileContext);
  const [profilepostList, setprofilePostList] = useState<PostType[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  // ポスト一覧を取得する関数

  const getPostList = async () => {
    let posts;

    posts = await getUserList(userInfo.token, start, Listnum, userprofile.id);

    const records = posts[0];
    const postnum = posts[1];

    const num = Math.ceil(postnum / Listnum);
    if (num == 0) {
      setTotalPages(1);
    } else {
      setTotalPages(Math.ceil(postnum / Listnum));
    }
    console.log(records);
    // getListで取得したポスト配列をコンテキストに保存する

    let postList: Array<PostType> = [];

    if (records) {
      records.forEach((p: any) => {
        postList.push({
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        });
      });
    }

    setprofilePostList(postList);
  };

  //最初の一回だけ実行
  useEffect(() => {
    getPostList();
  }, [start]);

  return (
    <>
      <h2>{userprofile.name}の投稿一覧</h2>
      <SPostList>
        {profilepostList.map((p) => (
          <Post key={p.id} post={p} getPostList={getPostList} />
        ))}
        <ButtonBox>
          {start !== 0 ? (
            <SnextbackButton onClick={() => setStart(start - Listnum)}>
              ＜＜前のページ
            </SnextbackButton>
          ) : (
            <Span />
          )}
          {Math.floor(start / Listnum) + 1}/{totalPages}
          {Math.floor(start / Listnum) + 1 < totalPages ? (
            <SnextbackButton
              onClick={() => {
                setStart(start + Listnum);
              }}
            >
              次のページ＞＞
            </SnextbackButton>
          ) : (
            <Span />
          )}
        </ButtonBox>
      </SPostList>
    </>
  );
};
const Span = styled.span`
  width: 18%;
`;

const SPostList = styled.div`
  margin-top: 16px;

  height: 100%;

  overflow-y: scroll;
`;

const SnextbackButton = styled.button`
  background-color: #222222;

  padding: 4px;

  border-radius: 8px;

  color: #fafafa;

  width: 18%;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
