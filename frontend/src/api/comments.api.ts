import axios, { AxiosResponse } from "axios";
import { IComment } from "../types/comment.type";
import { GetResponse } from "../types/getResponse.type";

export const getAllComments = async (page = 1) => {
  try {
    const response: AxiosResponse<GetResponse> = await axios.get(`http://localhost:3000/comments?page=${page}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCaptcha = async () => {
  try {
    const response = await axios.get("http://localhost:3000/comments/captcha", { responseType: 'blob' })

    return response.data;
  } catch (error) {
    throw error;
  }
}


export const postComment = async (createCommentDto: IComment) => {
  try {
  const response = await axios.post("http://localhost:3000/comments", createCommentDto);

  return response.status;
  } catch (error) {
    throw error;
  }
}
