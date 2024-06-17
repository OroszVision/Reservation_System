import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationUsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const onUserSelectionChange = async () => {
    if (selectedUserId) {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/reservation/admin/user/${selectedUserId}/reservations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        console.log('Fetched reservations:', response.data);
        setSelectedUserDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user reservations:', error);
        setError('Error fetching user reservations. Please try again later.');
        setIsLoading(false);
      }
    }
  };

  console.log('selectedUserDetails:', selectedUserDetails);

  return (
    <div>
      <h2>Select User and View Reservations</h2>
      <div>
        <label>Select User:</label>
        <select
          value={selectedUserId}
          onChange={(e) => {
            setSelectedUserId(e.target.value);
            const selectedUser = users.find(user => user.id === Number(e.target.value));
            setSelectedUsername(selectedUser ? selectedUser.username : '');
          }}
          onBlur={onUserSelectionChange}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>

      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      
      {selectedUserDetails && selectedUserDetails.length > 0 ? (
        <div>
          <h3>{selectedUsername}'s Reservations</h3>
          <div className="reservation-cards">
            {selectedUserDetails.map((reservation) => (
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
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No reservations found for this user.</p>
      )}
    </div>
  );
};

export default ReservationUsersList;
