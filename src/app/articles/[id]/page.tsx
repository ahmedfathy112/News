import { getSingleArticle } from "../../../apiCalls/ArticleApiCalls";
import AddComment from "./comments/AddComment";
import { SingleArticle } from "../../utils/types";
import CommentForm from "./comments/CommentForm";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "../../utils/verifyToken";
import SwiperNews from "../../homePage/LatestNews";

interface SingleArticlePage {
  params: { id: string };
}
const postPage = async ({ params }: SingleArticlePage) => {
  const token = cookies().get("JwtToken")?.value || null;
  const payLoad = verifyTokenForPages(token);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const article: SingleArticle = await getSingleArticle(params.id);

  return (
    <div className="w-full h-screen">
      <div className="w-full text-left py-4 px-6">
        <h2 className="text-3xl my-4 font-semibold text-center">
          {article.title}
        </h2>
        <span className="text-[13px] text-center">
          Created At: {new Date(article.createdAt).toDateString()}
        </span>
        <div className="w-[100%] text-center flex justify-center items-center">
          <p className="text-[17px] font-semibold w-1/2 text-gray-600 leading-10 max-md:w-full">
            {article.body}
          </p>
        </div>
      </div>
      <SwiperNews />
      <div className="flex flex-col px-7 justify-start my-4">
        <h2 className="text-3xl font-semibold my-3">
          أضف <span className="text-orange-500"> تعليقك</span>
        </h2>

        <CommentForm articleId={article.id} />
        <h2 className="text-3xl font-semibold my-3">التعليقات</h2>
        {article.comments.map((comment) => (
          <AddComment key={comment.id} comment={comment} userId={payLoad?.id} />
        ))}
      </div>
    </div>
  );
};

export default postPage;
