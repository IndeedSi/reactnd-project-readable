import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { formatDate } from '../utils/helpers'
import {handleDeletePost, handleDownvotePost, handleUpvotePost} from "../actions/posts";
import Votes from './Votes';

class Post extends Component {
    handleUpvote = (id) => {
        this.props.dispatch(handleUpvotePost(id));
    };
    handleDownvote = (id) => {
        this.props.dispatch(handleDownvotePost(id));
    };
    handleEdit = () => {
        const { post, history } = this.props;
        if (post && post.id && history) {
            history.push(`/post/${post.id}/edit`);
        }
    };
    handleDelete = () => {
        const { post, dispatch } = this.props;
        if (post && post.id) {
            dispatch(handleDeletePost(post));
        }
    };
    render() {
        const { post } = this.props;
        if (post == null) {
            return (<div>This post doesn't exist</div>);
        }
        const { id, timestamp, title, category, author, commentCount, voteScore } = post;
        return (
            <div className='row post-wrapper'>
                <Votes
                    voteScore={voteScore}
                    upVote={() => this.handleUpvote(id)}
                    downVote={() => this.handleDownvote(id)}
                />
                <div className='column post-column'>
                    <Link to={`/${category}/${id}`} className='post'>
                        <div className='post-title'> {title} </div>
                        <div>
                            <span className='post-author'>Posted by {author} </span>
                            <span className='post-timestamp'>{formatDate(timestamp)}</span>
                        </div>
                        <div className='post-body'>  </div>
                    </Link>
                    <div className='row'>
                        <div className='post-comment-count'>{commentCount} comments</div>
                        <div className='edit-btn' onClick={this.handleEdit}>Edit Post</div>
                        <div className='delete-btn' onClick={this.handleDelete}>Delete Post</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({posts}, {id}) => {
    const post = posts[id];
    return {
        post,
    }
};
export default withRouter(connect(mapStateToProps)(Post));