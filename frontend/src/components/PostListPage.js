import React, {Component} from "react";
import { connect } from 'react-redux';
import PostList from "./PostList";

class PostListPage extends Component {
    render() {
        const {postIds} = this.props;
        return (<PostList postIds={postIds} />)
    }
}

const mapStateToProps = ({ posts, categoriesToPosts }, props) => {
    const category = props.match && props.match.params ? props.match.params.category : null;
    return {
        postIds: category ? categoriesToPosts[category] : Object.keys(posts)
    };
};

export default connect(mapStateToProps)(PostListPage);