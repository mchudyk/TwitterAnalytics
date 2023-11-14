import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client'; // Import your Supabase instance
import './CreatePost.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both title and content are provided
    if (!title || !content) {
      alert('Please provide both title and content');
      return;
    }

    try {
      // Insert the new post into the 'posts' table in Supabase
      const { data, error } = await supabase
        .from('posts')
        .upsert([{ title, content }], { returning: 'representation' });

      if (error) {
        console.error('Error creating post:', error.message);
      } else {
        console.log('Post created successfully:', data);
        // No useHistory: Use Link to navigate to the home page after creating the post
        // Assuming your home route is '/'
        // Adjust the link path accordingly if it's different
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <div className="CreatePost">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
