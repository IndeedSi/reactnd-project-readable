import { getCategories } from '../utils/ReadableAPI'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories,
});

export const initializeCategories = () => {
    return (dispatch) =>
        getCategories()
            .then((categories) => dispatch(receiveCategories(categories)))
};