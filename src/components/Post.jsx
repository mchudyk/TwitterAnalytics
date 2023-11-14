import React from 'react';

function Post({ title, upvotes, timestamp }) {
  return (
    <div className="post">
      <div className="time">{timestamp}</div>
      <h2 className="title">{title}</h2>
      <div className="upvotes">{upvotes} upvotes</div>
    </div>
  );
}

export default Post;
