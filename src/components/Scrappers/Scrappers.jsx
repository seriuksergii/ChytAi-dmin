import { useEffect, useState } from 'react';
import './Scrappers.scss';
import { get_scrappers } from '../../api/auth';

import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

const Scrappers = () => {
  const [scrappers, setScrappers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrappersPerPage] = useState(10);

  useEffect(() => {
    const fetchScrappers = async () => {
      try {
        const scrappersData = await get_scrappers();
        setScrappers(scrappersData);
      } catch (error) {
        console.error('Помилка при завантаженні скраперів:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScrappers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const indexOfLastScrapper = currentPage * scrappersPerPage;
  const indexOfFirstScrapper = indexOfLastScrapper - scrappersPerPage;
  const currentScrappers = scrappers.slice(
    indexOfFirstScrapper,
    indexOfLastScrapper
  );
  const totalPages = Math.ceil(scrappers.length / scrappersPerPage);

  return (
    <div className="scrappers-container">
      <div className="scrappers-card">
        <div className="card-header">
          <h2>Скрапери</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Назва</td>
              <td>Активний</td>
            </tr>
          </thead>
          <tbody>
            {currentScrappers.length > 0 ? (
              currentScrappers.map((scrapper, index) => (
                <tr key={index}>
                  <td>{scrapper.id}</td>
                  <td>{scrapper.name}</td>
                  <td>
                    <span
                      className={`status ${
                        scrapper.is_active ? 'active' : 'inactive'
                      }`}
                    >
                      {scrapper.is_active ? 'Активний' : 'Неактивний'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Немає скраперів</td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Scrappers;
