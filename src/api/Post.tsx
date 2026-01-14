import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export const post = async (token: string, content: string) => {
  const url = `${API_BASE_URL}/post?token=${token}`;
  const res = await axios.post(url, { message: content });
  return res.data;
};

export const getList = async (
  token: string,
  start: number,
  records: number
) => {
  const url = `${API_BASE_URL}/post?token=${token}&start=${start}&records=${records}`;
  const res = await axios.get(url);
  return res.data;
};

export const getUserList = async (
  token: string,
  start: number,
  records: number,
  id: number
) => {
  const url = `${API_BASE_URL}/post/${id}?token=${token}&start=${start}&records=${records}`;
  const res = await axios.get(url);
  return res.data;
};

export const getSerchList = async (
  token: string,
  start: number,
  records: number,
  keyword: string
) => {
  const url = `${API_BASE_URL}/post?token=${token}&start=${start}&records=${records}&keyword=${keyword}`;
  const res = await axios.get(url);
  return res.data;
};

export const deletePost = async (id: number, token: string) => {
  const url = `${API_BASE_URL}/post?id=${id}&token=${token}`;
  await axios.delete(url);
};
