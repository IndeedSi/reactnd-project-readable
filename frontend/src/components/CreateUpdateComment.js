import React, {Component} from "react";
import { connect } from 'react-redux';
import { handleAddComment, handleUpdateComment } from "../actions/comments";

class CreateUpdateComment extends Component {
    state = {
        body: '',
        author: '',
    };
    componentDidMount() {
        const { existingComment } = this.props;
        if (existingComment) {
            this.setState({
                ...existingComment
            });
        }
    };
    handleInputChange = (e, field) => {
        const value = e.target.value;
        this.setState({[field]: value});
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { existingComment, dispatch, history, parentId } = this.props;
        const newComment = this.state;
        if (existingComment) {
            dispatch(handleUpdateComment(existingComment, newComment));
        } else {
            dispatch(handleAddComment(newComment, parentId));
        }

        // clear state
        this.setState({
            body: '',
            author: '',
        });

        if (existingComment) {
            history.goBack();
        }
    };
    render() {
        const { id, body, author } = this.state;
        return (<form onSubmit={this.handleSubmit} className='column post-form'>
            <textarea
                placeholder="Any comment for the post?"
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
            <button
                className='btn'
                type='submit'
                disabled={ body === '' || author === '' }
            >Submit</button>
        </form>)
    }
}

const mapStateToProps = ({ comments, categories }, props) => {
    const id = props.match && props.match.params ? props.match.params.id : null;
    const parentId = props.parentId;
    return {
        existingComment: id ? comments[id] : null,
        parentId,
    };
};

export default connect(mapStateToProps)(CreateUpdateComment);