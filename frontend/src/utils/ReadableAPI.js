const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';

let token = localStorage.token;

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
};

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then((result) => result.json())
        .then(data => data.categories);

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then((result) => result.json());

export const createPost = (post) =>
    fetch(`${api}/posts`, { method: "POST", body: JSON.stringify(post), headers })
        .then((result) => result.json());

export const updatePostContent = ({id, title, body}) =>
    fetch(`${api}/posts/${id}`, { method: "PUT", body: JSON.stringify({title, body}), headers })
        .then((result) => result.json());

export const upvotePost = (id) =>
    fetch(`${api}/posts/${id}`, { method: "POST", body: JSON.stringify({option: 'upVote'}), headers })
        .then((result) => result.json());


export const downvotePost = (id) =>
    fetch(`${api}/posts/${id}`, { method: "POST", body: JSON.stringify({option: 'downVote'}), headers })
        .then((result) => result.json());

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, { method: "DELETE", headers })
        .then((result) => result.json());

export const getCommentsFromPost = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then((result) => result.json());

export const createComment = (comment) =>
    fetch(`${api}/comments`, { method: "POST", body: JSON.stringify(comment), headers })
        .then((result) => result.json());

export const updateCommentContent = ({id, body}) =>
    fetch(`${api}/comments/${id}`, { method: "PUT", body: JSON.stringify({body}), headers })
        .then((result) => result.json());

export const upvoteComment = (id) =>
    fetch(`${api}/comments/${id}`, { method: "POST", body: JSON.stringify({option: 'upVote'}), headers })
        .then((result) => result.json());


export const downvoteComment = (id) =>
    fetch(`${api}/comments/${id}`, { method: "POST", body: JSON.stringify({option: 'downVote'}), headers })
        .then((result) => result.json());

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, { method: "DELETE", headers })
        .then((result) => result.json());