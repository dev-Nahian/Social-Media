import PostCommentList from "./PostCommentList";
import { useAvatar } from "../../hooks/useAvatar";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

export default function PostComments({ post }) {
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { avatarURL } = useAvatar(post);
  const { api } = useAxios();

  const handleShowComment = () => {
    setIsComment(!isComment);
  };

const addComment = async (event) => {
  const keyCode = event.keyCode;

  if (keyCode === 13 && comment.trim() !== "") {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
        { comment }
      );

      if (response.status === 200) {
        setComments([...response.data.comments]);
        setComment(""); // Clear input box
      }
    } catch (error) {
      console.error(error);
    }
  }
};

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="w-7 h-7 rounded-full lg:h-[34px] lg:w-[34px] object-cover"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleShowComment}
          className="text-gray-300 max-md:text-sm"
        >
          All Comment ▾
        </button>
      </div>

      {isComment && <PostCommentList comments={comments} />}
    </div>
  );
}
