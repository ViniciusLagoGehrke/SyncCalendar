/*
  Should be able to:
    -see a list of users
    -access their dashboard
    -Edit their dashboards
*/

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import UsersTable from '../components/UsersTable';

import { data } from '../initialData';

export default function Management() {
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
     title={data.users[0].name}
     searchValue={searchUsers}
     searchInput={handleSearchInput}     
    >
      <UsersTable users={filteredusers} calendars={data.calendars}/>
    </Layout>
  );
}