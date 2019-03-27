# Readable Project

This is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code both for the backend API Server and also the front-end interfaces.

## Getting Started

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, start the front-end webapp
    - `cd frontend`
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Front-end Webapp

The Front-end webapp will have following pages:
- `/`  Root page showing all posts
- `/new` The page for creating a post
- `/comment/:id/edit` The page for editing a comment
- `/post/:id/edit` The page for editing a post
- `/:category/:id` The post detail page showing details of a post and all the comments on the post
- `/:category` Showing all the posts which are in certain category.

## File Structure

The file structure of Front-end webapp.

```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions
    │   ├── categories.js # Categories related actions
    │   ├── comments.js # Comments related actions
    │   └── posts.js # Posts related actions
    ├── components # All components of this app
    │   ├── App.js # Entry point of all components
    │   ├── Comment.js # Component for showing one comment under the post
    │   ├── CreateUpdateComment.js # Component for creating / editing a comment. Used both in post detail page and separate comment editing page
    │   ├── CreateUpdatePost.js # Component for creating / editing post. Used in new post page and post edit page.
    │   ├── Nav.js # Component for navigation bar, listing all the categories
    │   ├── Post.js # Component for showing one post in the post list.
    │   ├── PostDetail.js # Component for showing post detail page.
    │   ├── PostList.js # Component for showing a list of posts.
    │   ├── PostListPage.js # Component for post list page, used in root path and each category.
    │   └── Votes.js # Component for showing vote count and upvote downvote button.
    ├── middleware
    │   ├── index.js # Apply middleware
    │   └── logger.js # Logger middleware to log all actions and state change
    ├── reducers
    │   ├── categories.js # Reducer to handle categories. State store is an object with category by id.
    │   ├── categoriesToPosts.js # Reducer to handle categories to posts mapping. 
    │   ├── comments.js # Reducer to handle comments actions.
    │   ├── index.js # Combined reducer
    │   ├── posts.js # Reducer to handle posts related actions
    │   └── postsToComments.js # Reducer to handle posts to comments mapping.
    ├── utils
    │   ├── helpers.js # all the helper functions such as formatting or generating id
    │   └── ReadableAPI.js # A JavaScript API for the provided Udacity backend.
    ├── index.css # This file contains all the css used in the project
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
