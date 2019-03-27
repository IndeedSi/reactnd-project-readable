import React from 'react';

const Votes  = ({ voteScore, upVote, downVote}) => (
    <div className='column vote'>
        <div onClick={upVote} className='upvote'>▲</div>
        <div>{voteScore}</div>
        <div onClick={downVote} className='downvote'>▼</div>
    </div>
);


export default Votes;