import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

class Post extends Component {
    render() {
        const { post } = this.props;
        if (post == null) {
            return (<div>This post doesn't exist</div>);
        }
        const { id, timestamp, title, body, author, category, voteScore } = post;
        return (
            <Link to={`/post/${id}`} className='post'>
                test

            </Link>
        )
    }
}

const mapStateToProps = ({posts}, {id}) => {
    const post = posts[id];
    return {
        post
    }
};
export default withRouter(connect(mapStateToProps)(Post));