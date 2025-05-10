import editIcon from "../../assets/icons/edit.svg";
import checkIcon from "../../assets/icons/check.svg";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { actions } from "../../actions";


export default function Bio() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const [bio, setBio] = useState(state?.user?.Bio);
  const [editMode, setEditMode] = useState(false);

  const handleBioEdit = async () => {
    dispatch({type: actions.profile.DATA_FETCHING})

    try {
        const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`, {bio});

        if(response.status === 200) {
            dispatch({type: actions.profile.USER_DATA_EDITED, data: response.data})
        }
        setEditMode(false);
    } catch (error) {
        dispatch({type:actions.profile.DATA_FETCH_ERROR, error: error.message})
    }
  }

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className='p-2 bg-transparent resize-none border border-gray-600 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button onClick={()=> setEditMode(true)} className="flex-center h-7 w-7 rounded-full">
          <img src={editIcon} alt="Edit" />
        </button>
      ) : (
        <button onClick={handleBioEdit} className="flex-center h-7 w-7 rounded-full">
          <img src={checkIcon} alt="check" />
        </button>
      )}
    </div>
  );
}
