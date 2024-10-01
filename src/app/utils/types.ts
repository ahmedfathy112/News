import { Article, comment, User } from "@prisma/client";
export type Articles = {
  title: string;
  body: string;
  id: number;
  userId: number;
};
export type JWTpayload = {
  id: number;
  email: string;
  isAdmin: boolean;
  userName: string;
};

export type CommentWithUser = comment & { user: User };

export type SingleArticle = Article & { comments: CommentWithUser[] };
