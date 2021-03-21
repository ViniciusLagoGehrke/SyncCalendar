/*
 Should contain:
   +User Name (done)
   +A Calendar filter by name and id (done)
   +Local time (done)
   +List of Calendars with:
     -their name (done)
     -owner (done)
     -their current time (down to seconds) *WIP*
     -diff from local time (down to seconds) *WIP*
   +CRUD Calendars !!!
 
 ## To do Mobile Header !!!
*/
 
import { useState, useEffect } from 'react';
import useUser from '../lib/useUser'
import Layout from '../components/Layout';
import CalendarList from '../components/CalendarList';

import { data } from '../initialData'; // change to API data fetch
 
export default function Dashboard() {
  const { user } = useUser({ redirectTo: '/login' })

  //to change loading alternative
  if (!user || user.isLoggedIn === false) {
    return <Layout>loading...</Layout>
  }

  //search handling to be moved to SearchBar component
  const [searchCalendars, setSearchCalendars] = useState("");
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    setCalendars(data.calendars)
  }, []);
  
  const handleSearchInput = e => {
    setSearchCalendars(e.target.value);
  };
  
  const filteredCalendars = !searchCalendars
    ? calendars
    : calendars.filter(
      calendar => {
        return (
          calendar
          .name
          .toLowerCase()
          .includes(searchCalendars.toLowerCase()) ||
          calendar
          .owner
          .toLowerCase()
          .includes(searchCalendars.toLowerCase())
        );
      }
    );
  
  return (
    <Layout
      title={data.users[0].name}
      searchValue={searchCalendars}
      searchInput={handleSearchInput}     
    >
      <CalendarList calendars={filteredCalendars} />
    </Layout>
  );
}