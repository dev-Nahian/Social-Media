import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import { usePost } from "../../hooks/usePost";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import Field from "../common/Field";

export default function PostEntry() {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handlePostSubmit = (formData) => {
    console.log(formData);
    dispatch({type: actions.post.DATA_FETCHING})
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>

      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:h-[58px] lg:w-[58px] object-cover"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            for="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input type="file" name="photo" id="photo" className="hidden" />
        </div>

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="mb-4 h-[120px] w-full bg-transparent focus:outline-none lg:mb-6 lg:h-[160px] resize-none"
          ></textarea>
        </Field>

        <div class="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            class="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
