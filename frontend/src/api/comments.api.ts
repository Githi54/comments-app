import axios, { AxiosResponse } from "axios";
import { IComment } from "../types/comment.type";

export const getAllComments = async () => {
  try {
    const response: AxiosResponse<IComment[]> = await axios.get("http://localhost:3000/comments");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postComment = async (comment: IComment) => {
  try {
  const response = await axios.post("http://localhost:3000/comments", comment);

  return response.data;
  } catch (error) {
    throw error;
  }
}
