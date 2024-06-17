import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  // Function to fetch all reservations
  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/reservation/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  // useEffect with empty dependency array to fetch reservations on component mount
  useEffect(() => {
    fetchReservations();
  }, []);

  // Function to edit a reservation
  const editReservation = (id) => {
    navigate(`/reservation/${id}`);
  };

  // Function to delete a reservation
  const deleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/reservation/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      // After deletion, filter out the deleted reservation from state
      setReservations((prevReservations) => prevReservations.filter(reservation => reservation.id !== id));
      alert('Reservation deleted successfully.');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reservations</h2>
      <div className="reservation-cards">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <h3>{reservation.name}</h3>
              <p>Arrival: {reservation.arrival}</p>
              <p>Departure: {reservation.departure}</p>
              {reservation.additionals && reservation.additionals.length > 0 && (
                <div>
                  <p>Additional Details:</p>
                  <ul>
                    {reservation.additionals.map((additional) => (
                      <li key={additional.id}>
                        {additional.name} - Price: {additional.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="action-buttons">
                <button onClick={() => editReservation(reservation.id)} className="btn btn-primary">Edit</button>
                <button onClick={() => deleteReservation(reservation.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
};

export default ReservationList;
