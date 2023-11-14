import React from 'react';
import Post from './Post';

function PostList() {
  // Dummy data for posts
  const posts = [
    { id: 1, title: "Who is your favorite historical figure?", upvotes: 3, timestamp: "Posted 21 hours ago" },
    { id: 2, title: "I'm in love with the Renaissance period", upvotes: 23, timestamp: "Posted 5 days ago" },
    // ... other posts
  ];

  return (
    <section className="post-list">
      <div className="sorting-buttons">
        <button>Newest</button>
        <button>Most Popular</button>
      </div>
      {posts.map(post => (
        <Post key={post.id} title={post.title} upvotes={post.upvotes} timestamp={post.timestamp} />
      ))}
    </section>
  );
}

export default PostList;
