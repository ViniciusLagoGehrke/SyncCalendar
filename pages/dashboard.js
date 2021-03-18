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
import Layout from '../components/Layout';
import CalendarList from '../components/CalendarList';

import { data } from '../initialData';
 
export default function Dashboard() {
  const [searchCalendars, setSearchCalendars] = useState("");
  const [calendars, setCalendars] = useState([]);

  //const [loading, setLoading] = useState(false);
  
  /*
  useEffect(() => {
    setLoading(true);
    axios
      .get("API End Point for User's Calendars")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err =>{
        console.log(err);
      });
  }, []);
  
  
  if (loading) {
    return {
  
    }
  }
  */

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
      <CalendarList Calendars={filteredCalendars} />
    </Layout>
  );
}