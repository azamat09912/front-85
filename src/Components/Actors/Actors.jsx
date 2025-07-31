import React, { useEffect, useState } from 'react';

// Список актёров
const actorsData = [
  { id: 1, name: 'Данияр Алшинов', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=2nKrQF2xZ4E' },
  { id: 2, name: 'Самал Еслямова', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=3mN8vOXRaCw' },
  { id: 3, name: 'Берик Айтжанов', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=sXU_7Fujp-I' },
  { id: 4, name: 'Аружан Джазильбекова', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=9McNQ9thVvo' },
  { id: 5, name: 'Нуркен Туматаев', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=WJxCqRKVkIY' },
  { id: 6, name: 'Куаныш Султанбеков', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=dCk_1RJb13g' },
  { id: 7, name: 'Азамат Сатыбалды', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=3lOeUJH0ZhA' },
  { id: 8, name: 'Фархат Абдраимов', image: 'https://www.film.ru/sites/default/files/people/49930921-2281460.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=tZu1gFS3d2Y' },
];

export default function Actors() {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const saved = localStorage.getItem('favoriteActors');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteActors', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (actor) => {
    if (!token) {
      alert('Сначала войдите в аккаунт, чтобы добавлять актёров в избранное.');
      return;
    }
    setFavorites((prev) => {
      const isFav = prev.find((a) => a.id === actor.id);
      return isFav ? prev.filter((a) => a.id !== actor.id) : [...prev, actor];
    });
  };

  const actorsToShow = showFavorites ? favorites : actorsData;
  const filteredActors = actorsToShow.filter((actor) =>
    actor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1>🎭 Қазақ Актерлары</h1>

      {!token && (
        <p style={{ color: '#ffcc00' }}>
          🔒 Войдите в аккаунт, чтобы сохранять актёров в избранное
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
        {showFavorites ? '← Все актёры' : '⭐ Мои избранные'}
      </button>

      <div>
        <input
          type="text"
          placeholder="🔍 Поиск актёров..."
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
        {filteredActors.length === 0 ? (
          <p>❗ Актёры не найдены.</p>
        ) : (
          filteredActors.map((actor) => {
            const isFav = favorites.some((a) => a.id === actor.id);
            return (
              <div
                key={actor.id}
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
                  src={actor.image}
                  alt={actor.name}
                  style={{ width: '100%', borderRadius: '10px', cursor: 'pointer' }}
                  onClick={() => window.open(actor.youtubeUrl, '_blank')}
                />
                <h3 style={{ margin: '0.8rem 0' }}>{actor.name}</h3>
                <button
                  onClick={() => toggleFavorite(actor)}
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
