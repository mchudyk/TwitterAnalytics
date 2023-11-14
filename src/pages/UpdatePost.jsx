// UpdatePost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdatePost.css'; // Ensure the CSS is similar to CreatePost.css
import { supabase } from '../client';

function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the post details to edit
    const fetchPostDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching post details:', error.message);
          return;
        }

        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching post details:', error.message);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Title and content are required.');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error.message);
    } else {
      alert('Post updated successfully!');
      navigate(`/post/${id}`);
    }
  };

  return (
    <div className="UpdatePost">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Update Post</button>
      </form>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
}

export default UpdatePost;
