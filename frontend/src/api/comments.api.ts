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
