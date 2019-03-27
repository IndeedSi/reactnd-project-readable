import {ADD_POST, RECEIVE_ALL_POSTS} from "../actions/posts";

export default function categoriesToPosts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return action.posts.reduce((object, value)=> {
                if (object[value.category]) {
                    object[value.category].push(value.id);
                } else {
                    object[value.category] = [value.id];
                }
                return object;
            }, {});
        case ADD_POST:
            const post = action.post;
            return {
                ...state,
                [post.category]: state[post.category] ? state[post.category].concat(post.id) : [post.id]
            };
        default:
            return state;
    }
}