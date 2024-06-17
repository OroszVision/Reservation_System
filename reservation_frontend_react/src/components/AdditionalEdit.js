import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/AdditionalEdit.css';

const AdditionalEdit = () => {
  const [additional, setAdditional] = useState({ id: 0, name: '', price: 0, available: true });
  const [originalAdditional, setOriginalAdditional] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdditionalById(id);
  }, [id]);

  const fetchAdditionalById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/additional/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      setAdditional(response.data);
      setOriginalAdditional(response.data);
    } catch (error) {
      console.error('Error fetching additional:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/additional/${id}`, additional, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      console.log('Additional updated successfully');
      navigate('/list-additionals');
    } catch (error) {
      console.error('Error updating additional:', error);
    }
  };

  const onCancel = () => {
    navigate('/list-additionals');
  };

  return (
    <div className="edit-container">
      <form onSubmit={onSubmit} className="space">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={additional.name}
            onChange={(e) => setAdditional({ ...additional, name: e.target.value })}
            placeholder={originalAdditional ? originalAdditional.name : 'Original Name'}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={additional.price}
            onChange={(e) => setAdditional({ ...additional, price: parseFloat(e.target.value) })}
            placeholder={originalAdditional ? originalAdditional.price.toString() : 'Original Price'}
            required
          />
        </div>
        <div className="form-group">
          <label>Available:</label>
          <select
            value={additional.available}
            onChange={(e) => setAdditional({ ...additional, available: e.target.value === 'true' })}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default AdditionalEdit;
