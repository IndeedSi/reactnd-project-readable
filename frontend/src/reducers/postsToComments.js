import {ADD_COMMENT, RECEIVE_COMMENTS} from "../actions/comments";

export default function postsToComments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                [action.id]: action.comments.map(comment => comment.id)
            };
        case ADD_COMMENT:
            const comment = action.comment;
            return {
                ...state,
                [comment.parentId]: state[comment.parentId] ? state[comment.parentId].concat(comment.id) : [comment.id]
            };
        default:
            return state;
    }
}