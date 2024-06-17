import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createReservation, fetchAvailableAdditionals, getReservationById, updateReservation } from '../services/api';
import '../styles/ReservationForm.css';

const ReservationForm = () => {
  const { id } = useParams(); // Get reservation ID from URL params
  const isEditing = !!id; // Determine if we are in edit mode based on whether ID exists
  const navigate = useNavigate();

  const initialFormState = {
    name: '',
    arrival: '',
    departure: '',
    selectedAdditionals: [],
  };

  const [reservationForm, setReservationForm] = useState(initialFormState);
  const [additionals, setAdditionals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      // Fetch reservation details if in edit mode
      fetchReservationDetails();
    } else {
      // Fetch available additionals for creation mode
      fetchAvailableAdditionalsData();
    }
  }, [id, isEditing]);

  // Function to fetch reservation details for editing
  const fetchReservationDetails = async () => {
    try {
      const reservation = await getReservationById(id);
      setReservationForm({
        name: reservation.name,
        arrival: reservation.arrival,
        departure: reservation.departure,
        selectedAdditionals: reservation.additionalIds || [],
      });
      // Fetch available additionals (if needed in edit mode)
      fetchAvailableAdditionalsData();
    } catch (error) {
      console.error('Error fetching reservation:', error);
      setError('Failed to fetch reservation details. Please try again.');
    }
  };

  // Function to fetch available additionals for creation mode
  const fetchAvailableAdditionalsData = async () => {
    try {
      const additionalsData = await fetchAvailableAdditionals();
      setAdditionals(additionalsData);
    } catch (error) {
      console.error('Error fetching additionals:', error);
      setError('Failed to fetch available additionals. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const additionalId = Number(value);

    setReservationForm((prevForm) => {
      const selectedAdditionals = checked
        ? [...prevForm.selectedAdditionals, additionalId]
        : prevForm.selectedAdditionals.filter((id) => id !== additionalId);

      return { ...prevForm, selectedAdditionals };
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Set minimum date to tomorrow

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedReservation = {
        ...reservationForm,
        arrival: formatDate(reservationForm.arrival),
        departure: formatDate(reservationForm.departure),
        additionalIds: reservationForm.selectedAdditionals,
      };

      if (isEditing) {
        await updateReservation(id, formattedReservation);
        console.log('Reservation updated successfully');
      } else {
        await createReservation(formattedReservation);
        console.log('Reservation created successfully');
      }

      navigate('/list-reservations');
    } catch (error) {
      console.error('Error handling submission:', error);
      setError('Failed to save reservation. Please try again.');
    }
  };

  return (
    <div className="reservation-form-container">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Reservation' : 'Create Reservation'}</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={reservationForm.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Arrival Date:</label>
          <input
            type="date"
            name="arrival"
            value={reservationForm.arrival}
            onChange={handleInputChange}
            min={tomorrow.toISOString().split('T')[0]} // Set minimum date to tomorrow
            required
          />
        </div>
        <div className="form-group">
          <label>Departure Date:</label>
          <input
            type="date"
            name="departure"
            value={reservationForm.departure}
            onChange={handleInputChange}
            min={tomorrow.toISOString().split('T')[0]} // Set minimum date to tomorrow
            required
          />
        </div>
        <div className="form-group">
          <label>Additional Options:</label>
          <div className="checkbox-group">
            {additionals.map((additional) => (
              <div key={additional.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`additional-${additional.id}`}
                  value={additional.id}
                  checked={reservationForm.selectedAdditionals.includes(additional.id)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`additional-${additional.id}`}>{additional.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={!reservationForm.name || !reservationForm.arrival || !reservationForm.departure}>
          {isEditing ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
