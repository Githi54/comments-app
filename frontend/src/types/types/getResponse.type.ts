import { IComment } from "./comment.type";

export interface GetResponse {
    items: IComment[];
    totalPages: number;
    limit: number;
};