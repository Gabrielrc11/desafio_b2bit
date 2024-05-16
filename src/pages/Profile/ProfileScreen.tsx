import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
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
              Accept: 'application/json;version=v1_web',
              'Content-Type': 'application/json'
            }
          }
        );
        setName(response.data.name);
        setEmail(response.data.email)
        if (response.data.avatar && response.data.avatar.image_high_url) {
          setImage(response.data.avatar.image_high_url);
        } else {
          setImage(''); // Define uma imagem padrão ou vazia caso avatar ou image_high_url estejam ausentes
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfile();
  }, []); // A lista de dependências está vazia para que o useEffect só seja chamado uma vez, similar a componentDidMount

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="App">
      <div className="App-header">
        <button className="Button" onClick={handleLogout}>
          Logout
        </button>
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
