import React, { Component } from 'react';
import { connect } from 'react-redux';
import {formatDate} from "../utils/helpers";
import Votes from "./Votes";
import {handleDownvotePost, handleUpvotePost} from "../actions/posts";

class PostDetail extends Component {
    handleEdit = () => {
        const { post, history } = this.props;
        if (post && post.id && history) {
            this.props.history.push(`/post/${post.id}/edit`);
        }
    };
    handleDeletePost = () => {

    };
    handleUpvote = (id) => {
        this.props.dispatch(handleUpvotePost(id));
    };
    handleDownvote = (id) => {
        this.props.dispatch(handleDownvotePost(id));
    };
    render() {
        const { post } = this.props;
        if (post == null) {
            return (<div>This post doesn't exist</div>);
        }
        const { id, timestamp, title, body, author, commentCount, voteScore } = post;
        return (
            <div className='row'>
                <Votes
                    voteScore={voteScore}
                    upVote={() => this.handleUpvote(id)}
                    downVote={() => this.handleDownvote(id)}
                />
                <div className='column'>
                    <div> {title} </div>
                    <div>
                        <span>Posted by {author} </span>
                        <span>{formatDate(timestamp)}</span>
                    </div>
                    <div> {body} </div>
                    <div>
                        <div>{commentCount} comments</div>
                        <div onClick={this.handleEdit}>Edit Post</div>
                        <div>Delete Post</div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({posts}, props) => {
    const id = props.match && props.match.params ? props.match.params.id : null;
    const post = id ? posts[id] : null;
    return {
        post,
    }
};
export default connect(mapStateToProps)(PostDetail);