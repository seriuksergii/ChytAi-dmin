import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { get_books } from '../../api/auth';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import './BookList.scss';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBooks = useCallback(async (page = 1) => {
    try {
      const { results, count } = await get_books(page);
      setBooks(results);
      setTotalPages(Math.ceil(count / 10));
    } catch (err) {
      console.error('Помилка при завантаженні книг:', err);
      setError('Не вдалося завантажити книги');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, fetchBooks]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="books-container">
      <div className="books-card">
        <div className="card-header">
          <h2>Список книг</h2>
        </div>

        {books.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Автор</th>
                  <th>Ціна</th>
                  <th>Ціна зі знижкою</th>
                  {/* <th>Джерело</th> */}
                  <th>Тип продукту</th>
                  <th>Рік видання</th>
                  <th>Бестселер</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <Link to={`/books/${book.id}`}>{book.name}</Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.price} грн</td>
                    <td>{book.price_with_discount} грн</td>
                    {/* <td>{book.source}</td> */}
                    <td>{book.type_of_prod}</td>
                    <td>{book.year_of_publication}</td>
                    <td>{book.best_seller ? 'Так' : 'Ні'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p>Книги не знайдено</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
