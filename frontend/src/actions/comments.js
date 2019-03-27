import {
    upvoteComment,
    getCommentsFromPost,
    downvoteComment,
    createComment,
    updateCommentContent,
    deleteComment
} from "../utils/ReadableAPI";
import {generateUID} from "../utils/helpers";

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

const receiveComments = (id, comments) => ({
    type: RECEIVE_COMMENTS,
    id,
    comments,
});

export const handleGetComentsFromPost = (id) => {
    return (dispatch) =>
        getCommentsFromPost(id)
            .then((comments) => dispatch(receiveComments(id, comments)));
};

export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';

const upvoteCommentAction = (id) => ({
    type: UPVOTE_COMMENT,
    id,
});

const downvoteCommentAction = (id) => ({
    type: DOWNVOTE_COMMENT,
    id,
});

export const handleUpvoteComment = (id) => {
    return (dispatch) => {
        dispatch(upvoteCommentAction(id));
        upvoteComment(id)
            .catch(error => {
                console.log(error);
                alert("Failed to up-vote comment ");
                dispatch(downvoteCommentAction(id));
            })
    }
};

export const handleDownvoteComment = (id) => {
    return (dispatch) => {
        dispatch(downvoteCommentAction(id));
        downvoteComment(id)
            .catch(error => {
                console.log(error);
                alert("Failed to down-vote post ");
                dispatch(upvoteCommentAction(id));
            })
    }
};

export const ADD_COMMENT = 'ADD_COMMENT';

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment,
});

export const handleAddComment = (comment, parentId) => {
    const createdComment = {
        ...comment,
        parentId,
        timestamp: Date.now(),
        id: generateUID(),
    };
    return (dispatch) =>
        createComment(createdComment)
            .then((data) => dispatch(addComment(data)));
};

export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
});

export const handleUpdateComment = (existingComment, updatedComment) => {
    return (dispatch) => {
        dispatch(updateComment(updatedComment));
        updateCommentContent(updatedComment)
            .catch(error => {
                console.log(error);
                alert("Failed to update comment ");
                dispatch(updateComment(existingComment));
            });
    }
};

export const DELETE_COMMENT = 'DELETE_COMMENT';

const deleteCommentAction = (comment) => ({
    type: DELETE_COMMENT,
    comment,
});

export const handleDeleteComment = (comment) => {
    return (dispatch) => {
        dispatch(deleteCommentAction(comment));
        deleteComment(comment.id)
            .catch(error => {
                console.log(error);
                alert("Failed to delete comment ");
                dispatch(addComment(comment));
            })
    }
};