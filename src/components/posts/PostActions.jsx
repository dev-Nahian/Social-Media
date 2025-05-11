import LikeSvg from "../../assets/icons/like.svg"
import CommentSvg from "../../assets/icons/comment.svg"
import ShareSvg from "../../assets/icons/share.svg"

export default function PostActions({ postId, commentCount }) {
  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={LikeSvg} alt="Like" />
        <span>Like</span>
      </button>

      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={CommentSvg} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>

      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={ShareSvg} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
}
