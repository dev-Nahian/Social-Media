import LikeSvg from "../../assets/icons/like.svg";
import CommentSvg from "../../assets/icons/comment.svg";
import ShareSvg from "../../assets/icons/share.svg";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import LikedFilled from "../../assets/icons/like-filled.svg";
import { useAuth } from "../../hooks/useAuth";

export default function PostActions({ post, commentCount }) {
  const {auth} = useAuth();
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
  const { api } = useAxios();

  const handleLiked = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
      );

      if (response.status === 200) {
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        onClick={handleLiked}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img className="w-6" src={liked ? LikedFilled : LikeSvg} alt="Like" />
        {!liked && <span>Like</span>}
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
