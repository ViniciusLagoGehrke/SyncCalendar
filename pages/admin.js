/*
  Should be able to:
    -see a list of users (ok)
    -CRUD (including roles) (ok)
*/

import { useState, useEffect } from 'react';
import axios from 'axios' // to be update to fetchJson
import useUser from '../lib/useUser'
import AddUserForm from '../components/AddUserForm';
import Layout from '../components/Layout';
import UsersTable from '../components/UsersTable';

export default function Admin(props) {
  const { user } = useUser({ redirectTo: '/' })
  const [loggedUser, setLoggedUser] = useState(user.user);
  const [searchUsers, setSearchUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    setCalendars(props.initialCalendars);
    setUsers(props.initialUsers);
  }, []);

  //search handling to be moved to SearchBar component
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

  const handleAddUser = e => {
    e.preventDefault();
    const data = new FormData(event.target);
    console.log(data.getAll(password));
    //const newUser = e.currentTarget.value
    //setUsers( users => [...users, ]);)
  };

  return (
    <Layout
     title={loggedUser.name}
     searchValue={searchUsers}
     searchInput={handleSearchInput}     
    >
      <AddUserForm users={users} updateUsers={setUsers}/>
      <UsersTable users={filteredusers} updateUsers={setUsers} calendars={calendars} />
    </Layout>
  );
}

export const getServerSideProps = async () => {
    const resCalendars = await axios.get('https://synccalendar.viniciuslago.repl.co/api/calendars');
    const initialCalendars = await resCalendars.data;

    const resUsers = await axios.get('https://synccalendar.viniciuslago.repl.co/api/user');
    const initialUsers = await resUsers.data;

    return { props: { initialCalendars, initialUsers } }
}