import { useEffect, useState } from 'react';
import './Categories.scss';
import { get_categories } from '../../api/auth';
import { MdArrowBack, MdArrowForward } from 'react-icons/md'; 
import Loader from '../Loader/Loader';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await get_categories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Помилка при завантаженні категорій:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <div className="categories-container">
      <div className="categories-card">
        <div className="card-header">
          <h2>Категорії</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td>Назва</td>
              <td>Опис</td>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Немає категорій</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdArrowBack /> 
          </button>
          <span>
            Сторінка {currentPage} з {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdArrowForward /> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
