import React, { useState, useEffect } from 'react';

function StarRating({ rating, setRating, disabled }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ cursor: disabled ? 'default' : 'pointer' }}>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => !disabled && setRating && setRating(star)}
          style={{
            color: star <= rating ? '#ffc107' : '#e4e5e9',
            fontSize: '1.8rem',
            marginRight: 6,
            transition: 'color 0.2s',
            userSelect: 'none',
          }}
          role={setRating && !disabled ? 'button' : undefined}
          aria-label={`${star} star`}
          onMouseEnter={(e) => !disabled && (e.target.style.color = '#ffda6a')}
          onMouseLeave={(e) =>
            !disabled && (e.target.style.color = star <= rating ? '#ffc107' : '#e4e5e9')
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const token = localStorage.getItem('token'); // проверка авторизации

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = () => {
    if (!token) {
      alert('Чтобы добавить рецензию, пожалуйста, войдите в аккаунт.');
      return;
    }
    if (newReviewText.trim() === '') {
      alert('Пожалуйста, введите текст рецензии.');
      return;
    }
    if (newReviewRating === 0) {
      alert('Пожалуйста, поставьте оценку звездочками.');
      return;
    }
    const newRev = {
      id: Date.now(),
      text: newReviewText.trim(),
      rating: newReviewRating,
      likes: 0,
    };
    setReviews([newRev, ...reviews]);
    setNewReviewText('');
    setNewReviewRating(0);
  };

  const deleteReview = (id) => {
    if (window.confirm('Удалить эту рецензию?')) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const startEdit = (review) => {
    setEditId(review.id);
    setEditText(review.text);
    setEditRating(review.rating);
  };

  const saveEdit = () => {
    if (editText.trim() === '') {
      alert('Пожалуйста, введите текст рецензии.');
      return;
    }
    if (editRating === 0) {
      alert('Пожалуйста, поставьте оценку звездочками.');
      return;
    }
    setReviews(
      reviews.map((r) =>
        r.id === editId ? { ...r, text: editText.trim(), rating: editRating } : r
      )
    );
    setEditId(null);
    setEditText('');
    setEditRating(0);
  };

  const likeReview = (id) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const filtered = reviews.filter((r) =>
    r.text.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    container: {
      maxWidth: 700,
      margin: '2rem auto',
      padding: '1.5rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#222',
      backgroundColor: '#fefefe',
      borderRadius: 12,
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontWeight: '700',
      fontSize: '2rem',
      color: '#333',
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: 8,
      border: '1.5px solid #ccc',
      fontSize: '1rem',
      resize: 'vertical',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
      fontFamily: 'inherit',
      transition: 'border-color 0.3s',
      backgroundColor: token ? 'white' : '#f0f0f0',
    },
    inputSearch: {
      width: '100%',
      padding: '10px 14px',
      marginBottom: '1.5rem',
      borderRadius: 8,
      border: '1.5px solid #ccc',
      fontSize: '1rem',
      fontFamily: 'inherit',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
      transition: 'border-color 0.3s',
    },
    btnPrimary: {
      padding: '10px 18px',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: 8,
      color: 'white',
      fontWeight: '600',
      cursor: token ? 'pointer' : 'not-allowed',
      opacity: token ? 1 : 0.6,
      transition: 'background-color 0.3s',
    },
    btnPrimaryHover: {
      backgroundColor: '#0056b3',
    },
    btnSecondary: {
      padding: '10px 16px',
      backgroundColor: '#6c757d',
      border: 'none',
      borderRadius: 8,
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    btnDanger: {
      padding: '10px 16px',
      backgroundColor: '#dc3545',
      border: 'none',
      borderRadius: 8,
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    reviewCard: {
      backgroundColor: '#fff',
      padding: '1rem 1.25rem',
      borderRadius: 10,
      boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
      marginBottom: '1.2rem',
      position: 'relative',
    },
    reviewText: {
      whiteSpace: 'pre-wrap',
      fontSize: '1.05rem',
      marginBottom: '0.5rem',
      color: '#444',
    },
    reviewActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    actionBtn: {
      fontSize: '0.95rem',
      padding: '6px 12px',
      borderRadius: 6,
      border: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background-color 0.3s',
    },
    likeBtn: {
      backgroundColor: '#17a2b8',
      color: 'white',
    },
    editBtn: {
      backgroundColor: '#ffc107',
      color: '#212529',
    },
    deleteBtn: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    noAuthMessage: {
      marginBottom: '1rem',
      color: '#b02a37',
      fontWeight: '600',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Рецензии на фильм</h2>

      {!token && (
        <p style={styles.noAuthMessage}>
          Чтобы добавить рецензию, пожалуйста, войдите в аккаунт.
        </p>
      )}

      <textarea
        placeholder="Напишите вашу рецензию..."
        value={newReviewText}
        onChange={(e) => setNewReviewText(e.target.value)}
        rows={4}
        style={styles.textarea}
        disabled={!token}
      />
      <div
        style={{ display: 'flex', alignItems: 'center', marginTop: 10, gap: 14 }}
      >
        <StarRating rating={newReviewRating} setRating={setNewReviewRating} disabled={!token} />
        <button
          onClick={addReview}
          style={styles.btnPrimary}
          disabled={!token}
          title={token ? 'Добавить рецензию' : 'Войдите в аккаунт чтобы писать рецензии'}
        >
          Добавить рецензию
        </button>
      </div>

      <input
        type="text"
        placeholder="Поиск по рецензиям..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.inputSearch}
      />

      {filtered.length === 0 ? (
        <p>Рецензии не найдены.</p>
      ) : (
        filtered.map((review) => (
          <div key={review.id} style={styles.reviewCard}>
            {editId === review.id ? (
              <>
                <textarea
                  rows={3}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.textarea}
                />
                <div
                  style={{ display: 'flex', alignItems: 'center', marginTop: 10, gap: 12 }}
                >
                  <StarRating rating={editRating} setRating={setEditRating} />
                  <button
                    onClick={saveEdit}
                    style={{ ...styles.actionBtn, ...styles.btnPrimary }}
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    style={{ ...styles.actionBtn, ...styles.btnSecondary }}
                  >
                    Отмена
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={styles.reviewText}>{review.text}</p>
                <StarRating rating={review.rating} />
                <div style={styles.reviewActions}>
                  <button
                    onClick={() => likeReview(review.id)}
                    style={{ ...styles.actionBtn, ...styles.likeBtn }}
                    title="Поставить лайк"
                  >
                    👍 {review.likes}
                  </button>
                  <button
                    onClick={() => startEdit(review)}
                    style={{ ...styles.actionBtn, ...styles.editBtn }}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
