import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Post from 'components/Post/Post';
import { Button } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import NoItemsCard from 'components/NoItemsCard/NoItemsCard';
import { requestConfig, API } from 'ApiHelper/ApiHelper';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const { state } = useLocation();
  const { id, name } = state;
  const navigate = useNavigate();

  const fetchAPI = () => {
    axios.get(`${API}/users/${id}/posts`, requestConfig).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`${API}/posts/${id}}`, requestConfig)
      .then(() => {
        console.log('udało się usunąć');
        fetchAPI();
      })
      .catch((err) => console.log(err));

    setShow(true);
  };

  const renderPosts = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else if (posts.length === 0) {
      return (
        <>
          <NoItemsCard text="post" />
        </>
      );
    } else {
      return posts.map((post) => (
        <Post key={post.id} postData={post} deletePost={deletePost} />
      ));
    }
  };
  return (
    <>
      <h1>{name} posts</h1>
      {renderPosts()}
      <Button
        onClick={() => {
          navigate('/add-post', { state: { id: id } });
        }}
      >
        Add post
      </Button>

      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Body>Post deleted</Toast.Body>
      </Toast>
    </>
  );
};

export default UserPosts;
