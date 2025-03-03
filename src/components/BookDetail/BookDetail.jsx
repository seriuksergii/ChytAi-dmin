import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get_books } from '../../api/auth';
import './BookDetail.scss';
import Loader from '../Loader/Loader';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const { results } = await get_books();
        const foundBook = results.find((book) => book.id === parseInt(id));
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError('Книгу не знайдено');
        }
      } catch (err) {
        console.error('Помилка при завантаженні деталей книги:', err);
        setError('Не вдалося завантажити книгу');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <div className="card-header">
          <h2>{book.name}</h2>
        </div>

        <div className="book-detail-content">
          <div className="book-image">
            <img src={book.image_url} alt={book.name} />
          </div>

          <div className="book-info">
            <p>
              <strong>Автор:</strong> {book.author}
            </p>
            <p>
              <strong>Опис:</strong> {book.description}
            </p>
            <p>
              <strong>Ціна:</strong> {book.price} грн
            </p>
            <p>
              <strong>Ціна зі знижкою:</strong> {book.price_with_discount} грн
            </p>
            <p>
              <strong>Джерело:</strong> {book.source}
            </p>
            <p>
              <strong>Тип продукту:</strong> {book.type_of_prod}
            </p>
            <p>
              <strong>Рік видання:</strong> {book.year_of_publication}
            </p>
            <p>
              <strong>Бестселер:</strong> {book.best_seller ? 'Так' : 'Ні'}
            </p>
            <p>
              <strong>Категорія:</strong> {book.category}
            </p>
            <p>
              <strong>Статус доступності:</strong> {book.availability_status}
            </p>
            <p>
              <strong>Посилання на сайт:</strong>{' '}
              <a href={book.site_url} target="_blank" rel="noopener noreferrer">
                {book.site_name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
