import { useContext, useEffect, useState } from "react";
import { Post } from "./Post";
import { UserContext } from "../provider/UserProvider";
import { PostListContext, PostType } from "../provider/PostListProvider";
import { getList, getSerchList } from "../api/Post";
import styled from "styled-components";
import { NowPostContext } from "../provider/NowPostProvider";

//一画面に何個のポストを表示するかの定数
export const Listnum = 10;

export const PostList = () => {
  const { start, setStart } = useContext(NowPostContext);
  const { postList, setPostList } = useContext(PostListContext);
  const { userInfo } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  // ポスト一覧を取得する関数

  const getPostList = async (key: string) => {
    let posts;

    if (key) {
      posts = await getSerchList(userInfo.token, start, Listnum, key);
    } else {
      posts = await getList(userInfo.token, start, Listnum);
    }
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

    setPostList(postList);
  };

  //最初の一回だけ実行
  useEffect(() => {
    getPostList(keyword);
  }, [start]);

  const serchclick = () => {
    if (keyword == "") {
      window.alert("キーワードを入力してください。");
    } else {
      if (start !== 0) {
        setStart(0);
      } else {
        getPostList(keyword);
      }
    }
  };
  const relordclick = () => {
    setKeyword("");
    if (start !== 0) {
      setStart(0);
    }
    getPostList("");
  };

  return (
    <SPostList>
      <p>
        <input
          placeholder="検索するキーワードを入力"
          value={keyword}
          onChange={(evt) => setKeyword(evt.target.value)}
        ></input>
        <SserchButton onClick={serchclick}>検索</SserchButton>
        <SrelordButton onClick={relordclick}>⟳</SrelordButton>
      </p>
      {postList.map((p) => (
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
const SserchButton = styled.button`
  background-color: #222222;

  padding: 1px;

  border-radius: 4px;

  color: #fafafa;

  width: 5%;

  margin-left: 5px;
`;

const SrelordButton = styled.button`
  background-color: #222222;

  padding: 0px;

  border-radius: 8px;

  color: #fafafa;

  width: 5%;
  font-size: 20px;
  margin-left: 40px;
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
