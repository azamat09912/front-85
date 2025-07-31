import React, { useEffect, useState } from 'react';

// 20 фильмов с YouTube-превью и ссылками (пример)
const moviesData = [
  { id: 1, title: 'Келинка Сабина', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtibjh_zbvyXCSpTXhAAASmlbqHlUKsTjPA&s', youtubeUrl: 'https://www.youtube.com/watch?v=3Jj1vjJldH8' },
  { id: 2, title: 'Томирис', image: 'https://upload.wikimedia.org/wikipedia/ru/5/5a/%D0%A2%D0%BE%D0%BC%D0%B8%D1%80%D0%B8%D1%81_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%29.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=TxfS6Z5WqxA' },
  { id: 3, title: 'Рэкетир', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6fwcRzURGL2ecTFEBfaMJkifjzxKml2zSA&s', youtubeUrl: 'https://www.youtube.com/watch?v=Iksdi4A6L2s' },
  { id: 4, title: 'Жаужүрек Мың Бала', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=jHDtusnYMdc' },
  { id: 5, title: 'Қазақ хандығы', image: 'https://www.kino-teatr.ru/movie/posters/big/7/3/181937.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=RoC05QwFJdA' },
  { id: 6, title: 'Көксерек', image: 'https://cdn.kitap.kz/storage/book/16090d8e0d18e5c0b2aecda9c3063673.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=hTqDcTYrVbA' },
  { id: 7, title: 'Айка', image: 'https://upload.wikimedia.org/wikipedia/ru/0/0f/Ayka_poster.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=HGGm3qgSiOc' },
  { id: 8, title: 'Шал', image: 'https://upload.wikimedia.org/wikipedia/ru/b/b0/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%A8%D0%B0%D0%BB%C2%BB.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=-J-XqKk3Tks' },
  { id: 9, title: 'Жер', image: 'https://upload.wikimedia.org/wikipedia/ru/b/b0/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%A8%D0%B0%D0%BB%C2%BB.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=FLWfG6ci9r8' },
  { id: 10, title: 'Көшпенділер', image: 'https://www.kino-teatr.ru/movie/posters/big/6/1/3216.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=9PUS8p9RX6A' },
  { id: 11, title: 'Балуан Шолақ', image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/29c49393-5689-47a2-bcea-fa208d559bb4/600x900', youtubeUrl: 'https://www.youtube.com/watch?v=tYa6swY5pqA' },
  { id: 12, title: 'Түнгі құпия', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=6zmtKXq4nyo' },
  { id: 13, title: 'Қан мен тер', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=EtqVrbv8VxI' },
  { id: 14, title: 'Сүйікті ерке қыз', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=2fW8D6dzjic' },
  { id: 15, title: 'Жігіттер', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=Xx_mZ5-M2V8' },
  { id: 16, title: 'Арман', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=N0uC76XVhzA' },
  { id: 17, title: 'Бірге', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=Zq9rvpT50F8' },
  { id: 18, title: 'Тасжүрек', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=5N6YTYJ2dlM' },
  { id: 19, title: 'Ана мен бала', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=11GypNR9sW8' },
  { id: 20, title: 'Бауыржан Момышұлы', image: 'https://upload.wikimedia.org/wikipedia/kk/8/87/Myn_Bala.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=jUUIjKHZrYs' },
];

export default function Movies() {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    if (!token) {
      alert('Сначала войдите в аккаунт, чтобы добавлять фильмы в избранное.');
      return;
    }
    setFavorites((prev) => {
      const isFav = prev.find((m) => m.id === movie.id);
      return isFav ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  };

  const moviesToShow = showFavorites ? favorites : moviesData;
  const filteredMovies = moviesToShow.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1>🎬 Қазақ Фильмдері</h1>

      {!token && (
        <p style={{ color: '#ffcc00' }}>
          🔒 Войдите в аккаунт, чтобы сохранять фильмы в избранное
        </p>
      )}

      <button
        onClick={() => setShowFavorites(!showFavorites)}
        style={{
          marginBottom: '1rem',
          padding: '0.7rem 1.2rem',
          backgroundColor: showFavorites ? '#e50914' : '#008000',
          border: 'none',
          borderRadius: '6px',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {showFavorites ? '← Все фильмы' : '⭐ Мои избранные'}
      </button>

      <div>
        <input
          type="text"
          placeholder="🔍 Поиск фильмов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.5rem',
            marginBottom: '1.5rem',
            borderRadius: '5px',
            border: 'none',
            width: '60%',
            maxWidth: '400px',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: '1.5rem',
          justifyItems: 'center',
        }}
      >
        {filteredMovies.length === 0 ? (
          <p>❗ Фильмы не найдены.</p>
        ) : (
          filteredMovies.map((movie) => {
            const isFav = favorites.some((m) => m.id === movie.id);
            return (
              <div
                key={movie.id}
                style={{
                  backgroundColor: '#222',
                  borderRadius: '10px',
                  padding: '1rem',
                  width: '200px',
                  boxShadow: '0 0 10px #000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '10px', cursor: 'pointer' }}
                  onClick={() => window.open(movie.youtubeUrl, '_blank')}
                />
                <h3 style={{ margin: '0.8rem 0' }}>{movie.title}</h3>
                <button
                  onClick={() => toggleFavorite(movie)}
                  style={{
                    backgroundColor: isFav ? '#e50914' : '#555',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '0.5rem 1rem',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  {isFav ? 'Удалить из избранного ❤️' : 'В избранное 🤍'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
