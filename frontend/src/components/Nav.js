import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ categories }) => (
    <nav className='nav'>
        <ul>
            <li>
                <NavLink exact to='/' activeClassName='active'>
                    All Posts
                </NavLink>
            </li>
            <li>
                <NavLink to='/new' activeClassName='active'>
                    New Post
                </NavLink>
            </li>
            { categories && categories.map((category) => (
                <li key={category.path}>
                    <NavLink to={`/${category.path}`} activeClassName='active'>
                        {category.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);

export default Nav;