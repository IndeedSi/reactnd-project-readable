import {
    ADD_COMMENT,
    DELETE_COMMENT,
    DOWNVOTE_COMMENT,
    RECEIVE_COMMENTS,
    UPDATE_COMMENT,
    UPVOTE_COMMENT
} from "../actions/comments";

export default function comments(state = [], action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            const received = action.comments.reduce((object, value)=> {
                object[value.id] = value;
                return object;
            }, {});
            return {
                ...state,
                ...received,
            };
        case UPVOTE_COMMENT:
            const upvoteId = action.id;
            if (state[upvoteId]) {
                return {
                    ...state,
                    [upvoteId]: {
                        ...state[upvoteId],
                        voteScore: state[upvoteId].voteScore + 1
                    }
                }
            } else {
                return state;
            }
        case DOWNVOTE_COMMENT:
            const downvoteId = action.id;
            if (state[downvoteId]) {
                return {
                    ...state,
                    [downvoteId]: {
                        ...state[downvoteId],
                        voteScore: state[downvoteId].voteScore - 1
                    }
                }
            } else {
                return state;
            }
        case ADD_COMMENT:
        case UPDATE_COMMENT:
            const comment = action.comment;
            return {
                ...state,
                [comment.id]: comment
            };
        case DELETE_COMMENT:
            return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    deleted: true,
                }
            };
        default:
            return state;
    }
}