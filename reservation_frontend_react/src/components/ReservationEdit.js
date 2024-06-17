import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ReservationEdit.css';

const ReservationEdit = () => {
  const [reservation, setReservation] = useState({
    id: 0,
    name: '',
    arrival: '',
    departure: '',
    selectedAdditionals: [],
  });
  const [originalReservation, setOriginalReservation] = useState(null);
  const [additionals, setAdditionals] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/reservation/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        setReservation(response.data);
        setOriginalReservation(response.data);
        // Fetch available additionals (if applicable in your application)
        // For simplicity, assuming this function exists and populates 'additionals'
        await fetchAvailableAdditionals();
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    };

    fetchReservation();
  }, [id]);

  const fetchAvailableAdditionals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/additionals', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      setAdditionals(response.data);
    } catch (error) {
      console.error('Error fetching additionals:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/reservation/${id}`, reservation, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      console.log('Reservation updated successfully');
      navigate('/list-reservations');
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const onCancel = () => {
    navigate('/list-reservations');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const additionalId = Number(value);
    const selectedAdditionals = checked
      ? [...reservation.selectedAdditionals, additionalId]
      : reservation.selectedAdditionals.filter((id) => id !== additionalId);

    setReservation({ ...reservation, selectedAdditionals });
  };

  return (
    <div className="edit-container">
      <form onSubmit={onSubmit} className="space">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={reservation.name}
            onChange={handleInputChange}
            placeholder={originalReservation ? originalReservation.name : 'Original Name'}
            required
          />
        </div>
        <div className="form-group">
          <label>Arrival Date:</label>
          <input
            type="date"
            name="arrival"
            value={reservation.arrival}
            onChange={handleInputChange}
            placeholder={originalReservation ? originalReservation.arrival : 'Original Arrival Date'}
            required
          />
        </div>
        <div className="form-group">
          <label>Departure Date:</label>
          <input
            type="date"
            name="departure"
            value={reservation.departure}
            onChange={handleInputChange}
            placeholder={originalReservation ? originalReservation.departure : 'Original Departure Date'}
            required
          />
        </div>
        <div className="form-group">
          <label>Selected Additionals:</label>
          <div className="checkbox-group">
            {additionals.map((additional) => (
              <div key={additional.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`additional-${additional.id}`}
                  value={additional.id}
                  checked={reservation.selectedAdditionals.includes(additional.id)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`additional-${additional.id}`}>{additional.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default ReservationEdit;
