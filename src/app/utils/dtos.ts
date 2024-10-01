export interface UserUpdate {
  userName?: string;
  email?: string;
  password?: string;
}

export interface CommentBody {
  commentText: string;
  articleId: number;
}

export interface UpdatedComment {
  CommentText: string;
}
