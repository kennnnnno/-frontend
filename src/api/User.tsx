import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export const getUser = async (user_id: number, token: string) => {

  const url = `${API_BASE_URL}/user/${user_id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;

};

export const getUserinfo = async (name: string, token: string) => {

  const url = `${API_BASE_URL}/user/?name=${name}&token=${token}`;
  const res = await axios.get(url);
  return res.data;

};

export const postUser = async (name:string, pass: string, email:string) => {

  const url = `${API_BASE_URL}/user`;
  const userdata = {
    name:name,
    email:email,
    password:pass
  }
  const res = await axios.post(url,userdata);
  return res.data;

};

export const putUserinfo = async(user_id:number,token:string,Photoid:string,mail:string,text:string) => {

  const url=`${API_BASE_URL}/user/${user_id}/?token=${token}`;
  const res=await axios.put(url,{mail,text,Photoid});
  return res.data;

};