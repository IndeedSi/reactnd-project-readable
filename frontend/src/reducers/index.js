import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import categoriesToPosts from './categoriesToPosts';

export default combineReducers({
    categories,
    posts,
    categoriesToPosts,
});