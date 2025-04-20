import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead><tr><th>Name</th><th>Email</th></tr></thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user.id}><td>{user.name}</td><td>{user.email}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="page">
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => (
  <div className="page">
    <h2>Welcome to the Dashboard</h2>
    <p>Use the sidebar to navigate.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="layout">
        <div className="sidebar">
          <h3>Menu</h3>
          <Link to="/">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/posts">Posts</Link>
        </div>
        <div className="main">
          <div className="topbar"><h1>Dashboard App</h1></div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
