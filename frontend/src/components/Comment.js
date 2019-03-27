import React, { Component } from 'react';
import { connect } from 'react-redux';
import Votes from "./Votes";
import { formatDate } from "../utils/helpers";
import { handleDeleteComment, handleDownvoteComment, handleUpvoteComment } from "../actions/comments";
import { withRouter } from 'react-router-dom';

class Comment extends Component {
    handleEdit = () => {
        const { comment, history } = this.props;
        if (comment && comment.id && history) {
            this.props.history.push(`/comment/${comment.id}/edit`);
        }
    };
    handleDeleteComment = () => {
        const { comment, dispatch } = this.props;
        if (comment && comment.id) {
            dispatch(handleDeleteComment(comment));
        }
    };
    handleUpvote = (id) => {
        this.props.dispatch(handleUpvoteComment(id));
    };
    handleDownvote = (id) => {
        this.props.dispatch(handleDownvoteComment(id));
    };
    render() {
        const { comment } = this.props;
        if (!comment || comment.deleted || comment.parentDeleted) {
            return null;
        }
        const { id, timestamp, body, author, voteScore } = comment;
        return (
            <div className='row comment-wrapper'>
                <Votes
                    voteScore={voteScore}
                    upVote={() => this.handleUpvote(id)}
                    downVote={() => this.handleDownvote(id)}
                />
                <div className='column'>
                    <div>
                        <span className='post-author'>{author}</span>
                        <span className='post-timestamp'>{formatDate(timestamp)}</span>
                    </div>
                    <div className='comment-body'> {body} </div>
                    <div className='row'>
                        <div className='edit-btn' onClick={this.handleEdit}>Edit Comment</div>
                        <div className='delete-btn' onClick={this.handleDeleteComment}>Delete Comment</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({comments}, {id}) => {
    const comment = id ? comments[id] : null;
    return {
        comment,
    }
};
export default withRouter(connect(mapStateToProps)(Comment));