// PostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './PostPage.css';
import { supabase } from '../client';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      // Fetch post
      let { data: postData, error: postError } = await supabase.from('posts').select('*').eq('id', id).single();
      // Fetch comments
      let { data: commentsData, error: commentsError } = await supabase.from('comments').select('*').eq('post_id', id);

      if (postError) {
        console.error('Error fetching post:', postError.message);
      } else {
        setPost(postData);
      }

      if (commentsError) {
        console.error('Error fetching comments:', commentsError.message);
      } else {
        setComments(commentsData);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleUpvote = async () => {
    const newUpvotes = (post.upvotes || 0) + 1;
  
    const { error } = await supabase
      .from('posts')
      .update({ upvotes: newUpvotes })
      .eq('id', id);
  
    if (error) {
      console.error('Error updating upvotes:', error.message);
    } else {
      setPost({ ...post, upvotes: newUpvotes }); // Update state with new upvote count
    }
  };
  
  const handleDelete = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      navigate('/');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    const newCommentData = { post_id: id, content: newComment };
    const { error } = await supabase.from('comments').insert([newCommentData]);
  
    if (error) {
      console.error('Error adding comment:', error.message);
    } else {
      // Clear the newComment input
      setNewComment('');
    }
  };
  
  // Use useEffect to fetch comments after a new comment is submitted
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase.from('comments').select('*').eq('post_id', id);
  
        if (error) {
          console.error('Error fetching comments:', error.message);
        } else {
          // Update the local state with the latest comments
          setComments(data || []);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };
  
    fetchComments();
  }, [id, newComment]); // Trigger the effect whenever a new comment is added


  return (
    <div className="PostPage">
      {post && (
        <>
          <div className="post-details">
            <div className="post-time">Posted on: {new Date(post.created_at).toLocaleString()}</div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-upvotes">Upvotes: {post.upvotes || 0}</div>
            <button onClick={handleUpvote}>Upvote</button>
            <Link to={`/update/${id}`}>Edit Post</Link>
            <button onClick={handleDelete}>Delete Post</button>
          </div>
          
          <div className="comments-section">
            <h3>Comments:</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Leave a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Submit Comment</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default PostPage;
