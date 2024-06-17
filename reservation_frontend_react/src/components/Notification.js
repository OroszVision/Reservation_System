import React from 'react';
import { useNotification } from './NotificationContext';
import '../styles/Notification.css';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => removeNotification(notification.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
