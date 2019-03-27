import React, { Component } from 'react';
import { connect } from 'react-redux';
import {formatDate} from "../utils/helpers";
import Votes from "./Votes";
import {handleDeletePost, handleDownvotePost, handleUpvotePost} from "../actions/posts";
import {handleGetComentsFromPost} from "../actions/comments";
import Comment from "./Comment";
import CreateUpdateComment from "./CreateUpdateComment";

class PostDetail extends Component {
    handleEdit = () => {
        const { post, history } = this.props;
        if (post && post.id && history) {
            history.push(`/post/${post.id}/edit`);
        }
    };
    handleDeletePost = () => {
        const { post, dispatch, history } = this.props;
        if (post && post.id) {
            dispatch(handleDeletePost(post));
            history.push(`/`);
        }
    };
    handleUpvote = (id) => {
        this.props.dispatch(handleUpvotePost(id));
    };
    handleDownvote = (id) => {
        this.props.dispatch(handleDownvotePost(id));
    };
    componentDidMount() {
        const { id, dispatch, commentIds } = this.props;
        if (id && !commentIds) {
            dispatch(handleGetComentsFromPost(id))
        }
    }
    render() {
        const { post, commentIds } = this.props;
        if (post == null) {
            return (<div className='not-found'>This post doesn't exist</div>);
        }
        const { id, timestamp, title, body, author, commentCount, voteScore } = post;
        return (
            <div className='post-detail'>
                <div className='row post-wrapper'>
                    <Votes
                        voteScore={voteScore}
                        upVote={() => this.handleUpvote(id)}
                        downVote={() => this.handleDownvote(id)}
                    />
                    <div className='column'>
                        <div className='post-detail-title'> {title} </div>
                        <div>
                            <span className='post-author'>Posted by {author} </span>
                            <span className='post-timestamp'>{formatDate(timestamp)}</span>
                        </div>
                        <div className='post-detail-body '> {body} </div>
                        <div className='row'>
                            <div className='post-comment-count'>{commentCount} comments</div>
                            <div className='edit-btn' onClick={this.handleEdit}>Edit Post</div>
                            <div className='delete-btn' onClick={this.handleDeletePost}>Delete Post</div>
                        </div>
                    </div>
                </div>
                <h3 className='align-left'>Comments</h3>
                <div>
                    {commentIds && commentIds.map((id) => <Comment key={id} id={id}/>)}
                </div>
                <h3 className='align-left'>Add New Comment</h3>
                <CreateUpdateComment parentId={id} />
            </div>
        );
    }
}

const mapStateToProps = ({posts, postsToComments}, props) => {
    const id = props.match && props.match.params ? props.match.params.id : null;
    const post = id ? posts[id] : null;
    const commentIds = id ? postsToComments[id] : null;
    return {
        id,
        post,
        commentIds,
    }
};
export default connect(mapStateToProps)(PostDetail);