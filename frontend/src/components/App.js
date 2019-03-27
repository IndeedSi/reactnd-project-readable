import React, {Component} from 'react';
import Nav from './Nav';
import PostListPage from './PostListPage';
import { connect } from 'react-redux';
import { initializeCategories } from "../actions/categories";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleGetPosts } from "../actions/posts";
import CreateUpdatePost from "./CreateUpdatePost";
import PostDetail from "./PostDetail";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(initializeCategories());
        this.props.dispatch(handleGetPosts());
    }
    render() {
        const { categories } = this.props;
        return (
            <Router>
                <div className="App">
                    <Nav categories={categories} />
                    <Route exact path='/' component={PostListPage} />
                    <Route exact path='/new' component={CreateUpdatePost} />
                    <Route path='/category/:category' component={PostListPage} />
                    <Route exact path='/post/:id' component={PostDetail} />
                    <Route path='/post/:id/edit' component={CreateUpdatePost} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = ({ categories }) => ({
    categories,
});
export default connect(mapStateToProps)(App);
