import { getAllPosts } from '../utils/ReadableAPI'

export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';

const receiveAllPosts = (posts) => ({
    type: RECEIVE_ALL_POSTS,
    posts,
});

export const handleGetPosts = () => {
    return (dispatch) =>
        getAllPosts()
            .then((posts) => dispatch(receiveAllPosts(posts)));
};