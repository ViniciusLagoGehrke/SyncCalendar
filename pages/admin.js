/*
  Should be able to:
    -see a list of users
    -CRUD (including roles)
*/

import { useState, useEffect } from 'react';
import AddUserForm from '../components/AddUserForm';
import Layout from '../components/Layout';
import UsersTable from '../components/UsersTable';

import { data } from '../initialData';

export default function Admin() {
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
      <AddUserForm />
      <UsersTable users={filteredusers} calendars={data.calendars}/>
    </Layout>
  );
}

/*
      <Grid
        container
        maxWidth="lg"
        spacing={3}
        className={classes.grid}
      >

      </Grid>
*/