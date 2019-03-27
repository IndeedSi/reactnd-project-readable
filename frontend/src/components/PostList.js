import React, {Component} from 'react';
import { connect } from 'react-redux';
import Post from "./Post";

class PostList extends Component {
    state = {
        sortBy: 'voteScore',
    };
    handleSortChange = (e) => {
        const sortBy = e.target.value;
        this.setState({ sortBy });
    };
    render() {
        const { sortBy } = this.state;
        const { posts, postIds } = this.props;
        const sortedIds = postIds && postIds.sort((a, b) =>
            ( sortBy === 'voteScore'
                ? posts[b].voteScore - posts[a].voteScore
                : posts[b].timestamp - posts[a].timestamp));
        const filteredIds = sortedIds && sortedIds.filter((id) => (!posts[id].deleted));
        if (!filteredIds) {
            return (<div className='no-post-list'>No posts in current category</div>)
        }
        return (
            <div className='post-list-container'>
                <div className='post-list-header'>
                    <select onChange={this.handleSortChange}>
                        <option value='voteScore'>Sort by voteScore</option>
                        <option value='timestamp'>Sort by time</option>
                    </select>
                </div>
                <div className='post-list'>
                    { filteredIds && filteredIds.map(id => (<Post key={id} id={id} />)) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }, { postIds }) => ({
    posts,
    postIds,
});

export default connect(mapStateToProps)(PostList);