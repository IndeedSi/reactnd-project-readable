import React, {Component} from "react";
import { connect } from 'react-redux';
import {handleAddPost, handleUpdatePost} from "../actions/posts";

class CreateUpdatePost extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: 'react',
    };
    componentDidMount() {
        const { existingPost } = this.props;
        if (existingPost) {
            this.setState({
                ...existingPost
            });
        }
    };
    handleInputChange = (e, field) => {
        const value = e.target.value;
        this.setState({[field]: value});
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { existingPost, dispatch, history } = this.props;
        const newPost = this.state;
        if (existingPost) {
            dispatch(handleUpdatePost(existingPost, newPost));
        } else {
            dispatch(handleAddPost(newPost));
        }

        // clear state
        this.setState({
            title: '',
            body: '',
            author: '',
            category: 'react',
        });

        if (existingPost) {
            history.goBack();
        } else {
            history.push('/');
        }
    };
    render() {
        const { id, title, body, author, category } = this.state;
        const { categories } = this.props;
        return (<form onSubmit={this.handleSubmit} className='column post-form'>
            <input
                type='text'
                placeholder='Title of your post'
                value={title}
                onChange={(e) => this.handleInputChange(e, 'title')}
                className='text-input'
            />
            <textarea
                placeholder="What do you want to post?"
                value={body}
                onChange={(e) => this.handleInputChange(e, 'body')}
                className='textarea'
            />
            <input
                type='text'
                placeholder='Author Name'
                value={author}
                onChange={(e) => this.handleInputChange(e, 'author')}
                disabled={!!id}
                className='text-input'
            />
            <select
                onChange={(e) => this.handleInputChange(e, 'category')}
                disabled={!!id}
                className='select-input'
            >
                {categories && categories.map(category =>
                    (<option key={category.name} value={category.name}>{category.name}</option>))}
            </select>
            <button
                className='btn'
                type='submit'
                disabled={ title === '' || body === '' || author === '' || category === '' }
            >Submit</button>
        </form>)
    }
}

const mapStateToProps = ({ posts, categories }, props) => {
    const id = props.match && props.match.params ? props.match.params.id : null;
    return {
        existingPost: id ? posts[id] : null,
        categories,
    };
};

export default connect(mapStateToProps)(CreateUpdatePost);