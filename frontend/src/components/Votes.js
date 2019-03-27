import React from 'react';

const Votes  = ({ voteScore, upVote, downVote}) => (
    <div className='column'>
        <div onClick={upVote}>▲</div>
        <div>{voteScore}</div>
        <div onClick={downVote}>▼</div>
    </div>
);


export default Votes;