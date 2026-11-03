import { MessageSquare } from "lucide-react";
import { useProductComments } from "./hooks/useProductComments";
import CommentItem from "./components/CommentItem";
import CommentForm from "./components/CommentForm";

interface Props {
  productId: string;
}

export default function ProductCommentsSection({ productId }: Props) {
  const { comments, isLoading, error } = useProductComments(productId);

  return (
    <div className="mt-10">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-white/80">
        <MessageSquare size={16} className="text-brand" />
        نظرات کاربران
        {comments.length > 0 && (
          <span className="text-xs font-normal text-white/35">
            ({comments.length.toLocaleString("fa-IR")})
          </span>
        )}
      </h2>

      {isLoading && (
        <p className="text-xs text-white/35">در حال بارگذاری نظرات...</p>
      )}

      {!isLoading && error && <p className="text-xs text-red-300/80">{error}</p>}

      {!isLoading && !error && comments.length === 0 && (
        <p className="mb-4 text-xs text-white/35">
          هنوز نظری برای این محصول ثبت نشده. اولین نفر باش!
        </p>
      )}

      {!isLoading && !error && comments.length > 0 && (
        <div className="mb-5 space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}

      <CommentForm productId={productId} />
    </div>
  );
}
