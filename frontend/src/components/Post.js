import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { formatDate } from '../utils/helpers'
import {handleDownvotePost, handleUpvotePost} from "../actions/posts";
import Votes from './Votes';

class Post extends Component {
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
                <Link to={`/post/${id}`} className='post'>
                    <div className='column'>
                        <div> {title} </div>
                        <div>
                            <span>Posted by {author} </span>
                            <span>{formatDate(timestamp)}</span>
                        </div>
                        <div> {body} </div>
                        <div> {commentCount} comments</div>
                    </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = ({posts}, {id, hideBody}) => {
    const post = posts[id];
    return {
        post,
    }
};
export default withRouter(connect(mapStateToProps)(Post));