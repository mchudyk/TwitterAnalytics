// Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigation
import NavBar from '../components/NavBar';
import './Home.css';
import { supabase } from '../client';

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook for programmatically navigating

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let { data, error } = await supabase
          .from('posts')
          .select('*');

        if (error) throw error;

        // Filter posts by title if there is a search term
        if (searchTerm) {
          data = data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Sort posts based on the selected sorting
        if (sortBy === 'newest') {
          data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sortBy === 'most-popular') {
          data.sort((a, b) => b.upvotes - a.upvotes);
        }

        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [sortBy, searchTerm]);

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Function to navigate to individual post page
  const openPost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="Home">
      <NavBar onSearch={handleSearch} />

      <div className="order-section">
        <span>Order by:</span>
        <button onClick={() => handleSortBy('newest')} className={sortBy === 'newest' ? 'active' : ''}>
          Newest
        </button>
        <button onClick={() => handleSortBy('most-popular')} className={sortBy === 'most-popular' ? 'active' : ''}>
          Most Popular
        </button>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="post-container" // Updated class name for styling
          onClick={() => openPost(post.id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') openPost(post.id);
          }}
        >
          <div className="time">{new Date(post.created_at).toLocaleString()}</div>
          <h2 className="title">{post.title}</h2>
          <div className="upvotes">{post.upvotes} upvotes</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
