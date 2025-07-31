import React, { useEffect, useState } from 'react';

// Қазақ режиссерларының тізімі
const directorsData = [
  { id: 1, name: 'Жан Тұрысбек', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=dZYuRq6s06A' },
  { id: 2, name: 'Серік Абдрахманов', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=7_YEsRkO1kM' },
  { id: 3, name: 'Бақыт Қайырбеков', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=CsD5twMq5sI' },
  { id: 4, name: 'Айдос Ержан', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=JoQX_8OYQFc' },
  { id: 5, name: 'Әбділда Тәжібаев', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=Xchc9LpTziY' },
  { id: 6, name: 'Нұржан Аушев', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=ZcywQuGB0xM' },
  { id: 7, name: 'Қасымхан Қалиев', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=pM6oKavHx_U' },
  { id: 8, name: 'Мұрат Әбенов', image: 'https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/08/09/5d4d8527a0f89795763247.jpeg', youtubeUrl: 'https://www.youtube.com/watch?v=oyED8XP7QAE' },
 
];

export default function Directors() {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const saved = localStorage.getItem('favoriteDirectors');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteDirectors', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (director) => {
    if (!token) {
      alert('Сначала войдите в аккаунт, чтобы добавлять режиссеров в избранное.');
      return;
    }
    setFavorites((prev) => {
      const isFav = prev.find((d) => d.id === director.id);
      return isFav ? prev.filter((d) => d.id !== director.id) : [...prev, director];
    });
  };

  const directorsToShow = showFavorites ? favorites : directorsData;
  const filteredDirectors = directorsToShow.filter((director) =>
    director.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1>🎬 Қазақ Режиссерлары</h1>

      {!token && (
        <p style={{ color: '#ffcc00' }}>
          🔒 Войдите в аккаунт, чтобы сохранять режиссеров в избранное
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
        {showFavorites ? '← Все режиссеры' : '⭐ Мои избранные'}
      </button>

      <div>
        <input
          type="text"
          placeholder="🔍 Поиск режиссеров..."
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
        {filteredDirectors.length === 0 ? (
          <p>❗ Режиссерлары не найдены.</p>
        ) : (
          filteredDirectors.map((director) => {
            const isFav = favorites.some((d) => d.id === director.id);
            return (
              <div
                key={director.id}
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
                  src={director.image}
                  alt={director.name}
                  style={{ width: '100%', borderRadius: '10px', cursor: 'pointer' }}
                  onClick={() => window.open(director.youtubeUrl, '_blank')}
                />
                <h3 style={{ margin: '0.8rem 0' }}>{director.name}</h3>
                <button
                  onClick={() => toggleFavorite(director)}
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
