import { createContext, Dispatch, SetStateAction, useState } from "react";

type UserInfo ={
    id:number;
    name:string;
    token:string;
    mail:string;
};

export const UserContext = createContext(
    {} as{
        userInfo:UserInfo;
        setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    },
);

// UserProviderの定義

export const UserProvider = (props: any) => {

  const { children } = props;

  // UserInfoを保持する変数と更新関数の作成

  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, name: "",token: "",mail:""});

  return (


    <UserContext.Provider value={{ userInfo, setUserInfo }}>

      {children}

    </UserContext.Provider>

  );
};