/*
 Should contain:
   +User Name (done)
   +A Calendar filter by name and id (done)
   +Local time (done)
   +List of Calendars with:
     -their name (done)
     -owner (done)
     -their current time (down to seconds) (done)
     -diff from local time (down to seconds) (done)
     
   +CRUD Calendars !!!
 
 ## To do Mobile Header !!!
*/
 
import { useState, useEffect } from 'react';
import axios from 'axios'
import Layout from '../components/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarList from '../components/CalendarList';
 
export default function UserCalendar(props) {
  const loggedUser = props.user;

  //search handling to be moved to SearchBar component
  const [searchCalendars, setSearchCalendars] = useState("");
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    setCalendars(props.initialData)
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
    <>
      { (!user || user.isLoggedIn === false) ? (
        <Layout>
          <CircularProgress />
        </Layout>   
      ) : (
        <Layout
          title={loggedUser.name}
          searchValue={searchCalendars}
          searchInput={handleSearchInput}     
        >
          <CalendarList calendars={filteredCalendars} />
        </Layout>
      ) }
    </>
  );
}


export const getServerSideProps = async () => {
    const response = await axios.get('https://synccalendar.viniciuslago.repl.co/api/calendars');
    const initialData = await response.data;
    return { props: { initialData } }
}