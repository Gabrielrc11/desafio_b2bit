import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../BaseService';

import './ProfileScreen.css';


const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token') || '');
        const response = await axios.get(
          'https://api.homologation.cliqdrive.com.br/auth/profile/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setName(response.data.name);
        setEmail(response.data.email)
        if (response.data.avatar && response.data.avatar.image_high_url) {
          setImage(response.data.avatar.image_high_url);
        } else {
          setImage('');
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="App">
      <div className="App-header">
        <button className="Button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="App-container-profile">
        <div className="App-profile-head">
          <p className="Text2">Profile Picture</p>
          <img src={image} className="Image" alt="User" />
        </div>
        <p className="Text"><span className="Text1">Your</span> <span className="Text2">Name</span></p>
        <div className="Container-text">
        {name}
        </div>
        <p className="Text"><span className="Text1">Your</span> <span className="Text2">E-mail</span></p>
        <div className="Container-text">
        {email}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;