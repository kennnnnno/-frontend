import { createContext, Dispatch, SetStateAction, useState } from "react";

type UserInfo ={
    id:number;
    name:string;
    text:string;
    umail:string;
    Photoid:string;
};

export const UserProfileContext = createContext(
    {} as{
        userprofile:UserInfo;
        setUserprofile: Dispatch<SetStateAction<UserInfo>>;
    },
);

// UserProviderの定義

export const UserProfileProvider = (props: any) => {

  const { children } = props;

  // UserInfoを保持する変数と更新関数の作成

  const [userprofile, setUserprofile] = useState<UserInfo>({ id:0,name: "",text: "",umail:"",Photoid:""});

  return (


    <UserProfileContext.Provider value={{ userprofile, setUserprofile }}>

      {children}

    </UserProfileContext.Provider>

  );
};