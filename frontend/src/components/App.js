import React, {Component} from 'react';
import Nav from './Nav';
import PostListPage from './PostListPage';
import { connect } from 'react-redux';
import { initializeCategories } from "../actions/categories";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleGetPosts } from "../actions/posts";
import CreateUpdatePost from "./CreateUpdatePost";
import PostDetail from "./PostDetail";
import CreateUpdateComment from "./CreateUpdateComment";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(initializeCategories());
        this.props.dispatch(handleGetPosts());
    }
    render() {
        const { categories } = this.props;
        return (
            <Router>
                <div>
                    <Nav categories={categories} />
                    <div className="app-body">
                        <Switch>
                            <Route exact path='/' component={PostListPage} />
                            <Route exact path='/new' component={CreateUpdatePost} />
                            <Route path='/comment/:id/edit' component={CreateUpdateComment} />
                            <Route path='/post/:id/edit' component={CreateUpdatePost} />
                            <Route exact path='/:category/:id' component={PostDetail} />
                            <Route path='/:category' component={PostListPage} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = ({ categories }) => ({
    categories,
});
export default connect(mapStateToProps)(App);
