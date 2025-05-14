import { actions } from "../actions";

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.post.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
                error: null // Optionally reset error
            };
        }

        case actions.post.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                posts: action.data,
                error: null
            };
        }

        case actions.post.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        case actions.post.DATA_CREATED: {
            return {
                ...state,
                loading: false,
                posts: [...state.posts, action.data]
            }
        }

        case actions.post.DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.data
            }
        }

        default: {
            return state;
        }
    }
};

export { initialState, postReducer };
