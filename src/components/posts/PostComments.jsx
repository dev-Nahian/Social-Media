import PostCommentList from "./PostCommentList";
import { useAvatar } from "../../hooks/useAvatar";
import { useState } from "react";

export default function PostComments({ post }) {
    const [isComment, setIsComment] = useState(false)
    const {avatarURL} = useAvatar(post);

    const handleShowComment = () => {
        setIsComment(!isComment)
    }
    

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
          />
        </div>
      </div>

      <div className="mt-4">
        <button onClick={handleShowComment} className="text-gray-300 max-md:text-sm">All Comment ▾</button>
      </div>

        {isComment && (
            <PostCommentList comments={post?.comments} />
        )}
    </div>
  );
}
