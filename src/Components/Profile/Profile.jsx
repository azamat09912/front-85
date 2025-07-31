import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');
  const [name, setName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [avatar, setAvatar] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImage, setMovieImage] = useState(null);
  const [movieLink, setMovieLink] = useState('');
  const [movies, setMovies] = useState([]);
  const [editingMovieId, setEditingMovieId] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3002/api/profile', { headers: getAuthHeaders() })
      .then(({ data }) => {
        setName(data.name);
        setAvatar(data.avatar);
        setMovies(data.movies || []);
        setTheme(data.theme || 'light');
      })
      .catch(() => {
        // localStorage.removeItem('token');
        // navigate('/login');
        console.error('Ошибка при загрузке профиля');
      });

    axios.get('http://localhost:3002/api/likes/user/liked', { headers: getAuthHeaders() })
      .then(({ data }) => setLikedMovies(data))
      .catch((err) => console.error('Ошибка при загрузке лайкнутых фильмов:', err));
  }, [navigate]);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const handleChangeName = () => {
    const trimmedName = newName.trim();
    if (trimmedName.length < 3 || trimmedName.length > 12) {
      setNameError('Имя должно быть от 3 до 12 символов');
      return;
    }

    axios.put('http://localhost:3002/api/profile/name', { name: trimmedName }, { headers: getAuthHeaders() })
      .then(() => {
        setName(trimmedName);
        setEditingName(false);
        setNewName('');
        setNameError('');
      })
      .catch(() => setNameError('Ошибка обновления имени'));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      axios.put('http://localhost:3002/api/profile/avatar', { avatar: reader.result }, { headers: getAuthHeaders() })
        .then(() => setAvatar(reader.result))
        .catch(() => alert('Ошибка загрузки аватара'));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAvatar = () => {
    axios.delete('http://localhost:3002/api/profile/avatar', { headers: getAuthHeaders() })
      .then(() => setAvatar(''))
      .catch(() => alert('Ошибка удаления аватара'));
  };

  const startEditing = (movie) => {
    setEditingMovieId(movie.id);
    setMovieTitle(movie.title);
    setMovieDescription(movie.description);
    setMovieImage(null);
    setMovieLink(movie.link);
  };

  const clearForm = () => {
    setEditingMovieId(null);
    setMovieTitle('');
    setMovieDescription('');
    setMovieImage(null);
    setMovieLink('');
  };

  const handleSubmitMovie = () => {
    if (!movieTitle.trim() || !movieDescription.trim() || !movieLink.trim() || (!movieImage && !editingMovieId)) {
      alert('Заполните все поля!');
      return;
    }

    const sendData = (imageBase64) => {
      const movieData = {
        title: movieTitle.trim(),
        description: movieDescription.trim(),
        link: movieLink.trim(),
      };
      if (imageBase64) movieData.image = imageBase64;

      if (editingMovieId) {
        axios.put(`http://localhost:3002/api/movies/${editingMovieId}`, movieData, { headers: getAuthHeaders() })
          .then(() => {
            setMovies((prev) => prev.map((m) => (m.id === editingMovieId ? { ...m, ...movieData } : m)));
            clearForm();
          })
          .catch(() => alert('Ошибка при обновлении фильма'));
      } else {
        axios.post('http://localhost:3002/api/movies', movieData, { headers: getAuthHeaders() })
          .then(({ data }) => {
            setMovies((prev) => [...prev, data]);
            clearForm();
          })
          .catch(() => alert('Ошибка при добавлении фильма'));
      }
    };

    if (movieImage) {
      const reader = new FileReader();
      reader.onloadend = () => sendData(reader.result);
      reader.readAsDataURL(movieImage);
    } else {
      sendData(null);
    }
  };

  const handleDeleteMovie = (movieId) => {
    axios.delete(`http://localhost:3002/api/movies/${movieId}`, { headers: getAuthHeaders() })
      .then(() => {
        setMovies((prev) => prev.filter((m) => m.id !== movieId));
      })
      .catch(() => alert('Ошибка удаления фильма'));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    axios.put('http://localhost:3002/api/profile/theme', { theme: newTheme }, { headers: getAuthHeaders() })
      .then(() => setTheme(newTheme))
      .catch(() => alert('Ошибка переключения темы'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile-page-custom">
      <button className="theme-toggle-custom" onClick={toggleTheme}>Переключить тему</button>

      <div className="profile-header-custom">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="profile-avatar-custom" />
        ) : (
          <div className="avatar-placeholder-custom">Нет фото</div>
        )}

        <div className="profile-name-block-custom">
          {editingName ? (
            <>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChangeName()} />
              <button onClick={handleChangeName}>Сохранить</button>
              {nameError && <div className="error">{nameError}</div>}
            </>
          ) : (
            <>
              <h2>{name}</h2>
              <button onClick={() => setEditingName(true)}>Изменить имя</button>
            </>
          )}
        </div>
      </div>

      <div className="avatar-section-custom">
        {!avatar && <input type="file" accept="image/*" onChange={handleAvatarChange} />}
        {avatar && <button onClick={handleDeleteAvatar} className="delete-avatar-button-custom">Удалить фото</button>}
      </div>

      <div className="add-movie-form-custom">
        <h3>{editingMovieId ? 'Редактировать фильм' : 'Добавить фильм'}</h3>
        <input type="text" placeholder="Название фильма" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
        <textarea placeholder="Описание" value={movieDescription} onChange={(e) => setMovieDescription(e.target.value)} />
        <input type="text" placeholder="Ссылка на фильм" value={movieLink} onChange={(e) => setMovieLink(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setMovieImage(e.target.files[0])} />
        <button onClick={handleSubmitMovie}>{editingMovieId ? 'Сохранить изменения' : 'Добавить'}</button>
        {editingMovieId && <button onClick={clearForm} style={{ marginLeft: 10 }}>Отмена</button>}
      </div>

      <div className="movie-list-custom">
        <h3>Мои фильмы</h3>
        <div className="movie-cards-container-custom">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card-custom">
              <a href={movie.link} target="_blank" rel="noopener noreferrer">
                <img src={movie.image || 'https://dummyimage.com/200x300/ccc/fff&text=No+Image'} alt={movie.title} />
              </a>
              <div className="movie-info-custom">
                <h4>{movie.title}</h4>
                <p>{movie.description}</p>
                <button onClick={() => startEditing(movie)}>Редактировать</button>
                <button onClick={() => handleDeleteMovie(movie.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="logout-button-custom" onClick={handleLogout}>Выйти из аккаунта</button>
    </div>
  );
}
