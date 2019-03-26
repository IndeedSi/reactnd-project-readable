const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';

let token = localStorage.token;

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then((result) => result.json())
        .then(data => data.categories);

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then((result) => result.json());


export const getPostsInCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then((result) => result.json());