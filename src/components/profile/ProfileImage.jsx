import { useProfile } from "../../hooks/useProfile";
import editIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { useRef } from "react";
import { actions } from "../../actions";
import RandomImage from "../../assets/images/avatars/RANDOM.png"

export default function ProfileImage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const fileUploadRef = useRef();

  const handleImageUpload = (evt) => {
    evt.preventDefault();
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploadRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(`/profile/${state?.user?.id}/avatar`, formData);

      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
      }
    } catch (error) {
      dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: error.message });
    }
  };

  return (
    <div className="relative mb-8 h-[180px] w-[180px] rounded-full lg:mb-11 lg:h-[218px] lg:w-[218px]">
      {state?.user?.avatar ? (
        <img
        className="h-full w-full object-cover rounded-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />
      ) : (
        <img
        className="h-full w-full object-cover rounded-full"
        src={RandomImage}
        alt={state?.user?.firstName}
        />
      )}
      

      <button
        type="button"
        onClick={handleImageUpload}
        className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
      >
        <img src={editIcon} alt="Edit" />
      </button>

      <input
        id="file"
        type="file"
        hidden
        ref={fileUploadRef}
        onChange={updateImageDisplay}
      />
    </div>
  );
}
