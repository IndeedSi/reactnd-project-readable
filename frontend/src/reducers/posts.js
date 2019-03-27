import {ADD_POST, DOWNVOTE_POST, RECEIVE_ALL_POSTS, UPDATE_POST, UPVOTE_POST} from "../actions/posts";

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return action.posts.reduce((object, value)=> {
                object[value.id] = value;
                return object;
            }, {});
        case ADD_POST:
        case UPDATE_POST:
            const post = action.post;
            return {
                ...state,
                [post.id]: post
            };
        case UPVOTE_POST:
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
        case DOWNVOTE_POST:
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
        default:
            return state;
    }
}