import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import categoriesToPosts from './categoriesToPosts';
import postsToComments from './postsToComments';
import comments from './comments';

export default combineReducers({
    categories,
    posts,
    comments,
    categoriesToPosts,
    postsToComments,
});