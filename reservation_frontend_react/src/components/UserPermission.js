import React, { useState, useEffect } from 'react';
import { getUsers, promoteUser, demoteUser } from '../services/api';
import { Tabs, Tab, Checkbox, Button, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useNotification, NotificationProvider, NotificationType } from './NotificationContext';
import Notification from './Notification';

const UserPermission = () => {
  const [promotedUsers, setPromotedUsers] = useState([]);
  const [demotedUsers, setDemotedUsers] = useState([]);
  const [selectedPromotedUsers, setSelectedPromotedUsers] = useState([]);
  const [selectedDemotedUsers, setSelectedDemotedUsers] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showNotification } = useNotification();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const users = await getUsers();
      setPromotedUsers(users.filter(user => user.role === 'USER'));
      setDemotedUsers(users.filter(user => user.role === 'ADMIN'));
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const promoteSelected = async () => {
    try {
      await Promise.all(selectedPromotedUsers.map(user => promoteUser(user.id)));
      console.log('All users promoted successfully');
      showNotification('All users promoted successfully', NotificationType.Success);
      loadUsers();
      setSelectedPromotedUsers([]);
    } catch (error) {
      console.error('Error promoting users:', error);
      showNotification('Error promoting users', NotificationType.Error);
      setError('Error promoting users. Please try again later.');
    }
  };

  const demoteSelected = async () => {
    try {
      await Promise.all(selectedDemotedUsers.map(user => demoteUser(user.id)));
      console.log('All users demoted successfully');
      showNotification('All users demoted successfully', NotificationType.Success);
      loadUsers();
      setSelectedDemotedUsers([]);
    } catch (error) {
      console.error('Error demoting users:', error);
      showNotification('Error demoting users', NotificationType.Error);
      setError('Error demoting users. Please try again later.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePromotedUserToggle = (user) => {
    const currentIndex = selectedPromotedUsers.indexOf(user);
    const newSelectedUsers = [...selectedPromotedUsers];

    if (currentIndex === -1) {
      newSelectedUsers.push(user);
    } else {
      newSelectedUsers.splice(currentIndex, 1);
    }

    setSelectedPromotedUsers(newSelectedUsers);
  };

  const handleDemotedUserToggle = (user) => {
    const currentIndex = selectedDemotedUsers.indexOf(user);
    const newSelectedUsers = [...selectedDemotedUsers];

    if (currentIndex === -1) {
      newSelectedUsers.push(user);
    } else {
      newSelectedUsers.splice(currentIndex, 1);
    }

    setSelectedDemotedUsers(newSelectedUsers);
  };

  return (
    <div>
      <h2>User Permissions</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Promote" />
        <Tab label="Demote" />
      </Tabs>
      {tabValue === 0 && (
        <div>
          <List>
            {promotedUsers.map(user => (
              <ListItem key={user.id} button onClick={() => handlePromotedUserToggle(user)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedPromotedUsers.indexOf(user) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={promoteSelected}>
            Promote Selected
          </Button>
        </div>
      )}
      {tabValue === 1 && (
        <div>
          <List>
            {demotedUsers.map(user => (
              <ListItem key={user.id} button onClick={() => handleDemotedUserToggle(user)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedDemotedUsers.indexOf(user) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="secondary" onClick={demoteSelected}>
            Demote Selected
          </Button>
        </div>
      )}
      <Notification />
    </div>
  );
};

const App = () => (
  <NotificationProvider>
    <UserPermission />
  </NotificationProvider>
);

export default App;
