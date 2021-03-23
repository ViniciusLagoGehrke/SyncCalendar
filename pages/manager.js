/*
  Should be able to:
    -see a list of users
    -access their dashboard
    -Edit their dashboards
*/

import { useState, useEffect } from 'react';
import useUser from '../lib/useUser'
import Layout from '../components/Layout';
import UsersTable from '../components/UsersTable';

import { data } from '../initialData';

export default function Management() {
  const { user } = useUser({ redirectTo: '/' })
  const [loggedUser, setLoggedUser] = useState(user.user);
  const [searchUsers, setSearchUsers] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data.users)
  }, []);

  const handleSearchInput = e => {
    setSearchUsers(e.target.value);
  };

  const filteredusers = !searchUsers
  ? users
  : users.filter(
    user => {
      return (
        user
        .name
        .toLowerCase()
        .includes(searchUsers.toLowerCase()) ||
        user
        .role
        .toLowerCase()
        .includes(searchUsers.toLowerCase())
      );
    }
  );

  return (
    <Layout
     title={loggedUser.name}
     searchValue={searchUsers}
     searchInput={handleSearchInput}     
    >
      <UsersTable users={filteredusers} calendars={data.calendars}/>
    </Layout>
  );
}