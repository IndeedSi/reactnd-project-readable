import React, {Component} from 'react';
import Nav from './Nav';
import Post from './Post';
import { connect } from 'react-redux';
import { initializeCategories } from "../actions/categories";
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(initializeCategories());
    }
    render() {
        const { categories } = this.props
        return (
            <Router>
                <div className="App">
                    <Nav categories={categories} />
                    <Post/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = ({ categories }) => ({
    categories,
});
export default connect(mapStateToProps)(App);
