import { getAllPosts, createPost, updatePostContent, upvotePost, downvotePost } from '../utils/ReadableAPI'
import {generateUID} from "../utils/helpers";

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

export const ADD_POST = 'ADD_POST';

const addPost = (post) => ({
    type: ADD_POST,
    post,
});

export const handleAddPost = (post) => {
    const createdPost = {
        ...post,
        timestamp: Date.now(),
        id: generateUID(),
    };
    return (dispatch) =>
        createPost(createdPost)
            .then((data) => dispatch(addPost(data)));
};

export const UPDATE_POST = 'UPDATE_POST';

const updatePost = (post) => ({
    type: UPDATE_POST,
    post,
});

export const handleUpdatePost = (existingPost, updatedPost) => {
    return (dispatch) => {
        dispatch(updatePost(updatedPost));
        updatePostContent(updatedPost)
            .catch(error => {
                console.log(error);
                alert("Failed to update post ");
                dispatch(updatePost(existingPost));
            });
    }
};

export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

const upvotePostAction = (id) => ({
    type: UPVOTE_POST,
    id,
});

const downvotePostAction = (id) => ({
    type: DOWNVOTE_POST,
    id,
});

export const handleUpvotePost = (id) => {
    return (dispatch) => {
        dispatch(upvotePostAction(id));
        upvotePost(id)
            .catch(error => {
                console.log(error);
                alert("Failed to upvote post ");
                dispatch(downvotePostAction(id));
            })
    }
};

export const handleDownvotePost = (id) => {
    return (dispatch) => {
        dispatch(downvotePostAction(id));
        downvotePost(id)
            .catch(error => {
                console.log(error);
                alert("Failed to upvote post ");
                dispatch(upvotePostAction(id));
            })
    }
};