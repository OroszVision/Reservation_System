import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdditionalList.css';

const AdditionalList = () => {
  const [additionals, setAdditionals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdditionals();
  }, []);

  const fetchAdditionals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/additional', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setAdditionals(response.data);
    } catch (error) {
      console.error('Error fetching additionals:', error);
    }
  };

  const editAdditional = (additional) => {
    navigate(`/edit-additional/${additional.id}`);
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/additional/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      fetchAdditionals(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting additional:', error);
    }
  };

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredAdditionals = additionals.filter((additional) =>
    additional.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAdditionals = [...filteredAdditionals].sort((a, b) => {
    if (sortType === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortType === 'price') {
      return a.price - b.price;
    } else if (sortType === 'availability') {
      return a.available === b.available ? 0 : a.available ? -1 : 1;
    }
    return 0;
  });

  const paginatedAdditionals = sortedAdditionals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="search-container">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={onSearch} />
      </div>
      <div className="button-container">
        <button onClick={() => setSortType('name')}>Sort by Name</button>
        <button onClick={() => setSortType('price')}>Sort by Price</button>
        <button onClick={() => setSortType('availability')}>Sort by Availability</button>
      </div>
      <div className="additionals-container">
        {paginatedAdditionals.map((additional) => (
          <div key={additional.id} className="additional-item">
            <div className="attribute name">
              <p>{additional.name}</p>
            </div>
            <div className="attribute">
              <p>Price: {additional.price}</p>
            </div>
            <div className="attribute">
              <p>Available: {additional.available ? 'Yes' : 'No'}</p>
            </div>
            <div className="attribute">
              <button onClick={() => editAdditional(additional)}>Edit</button>
            </div>
            <div className="attribute">
              <button onClick={() => onDelete(additional.id)} className="delete-button">
                Delete
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredAdditionals.length}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditionalList;
