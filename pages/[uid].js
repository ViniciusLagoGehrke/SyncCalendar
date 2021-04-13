import { useState, useEffect } from 'react';
import axios from 'axios' // to be update to fetchJson
import fetchJson from '../lib/fetchJson'
import useUser from '../lib/useUser'
import Layout from '../components/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarList from '../components/CalendarList';
 
export default function UserPage(props) {
  const { user } = useUser();
  const [loggedUser, setLoggedUser] = useState(user?.user);

  //search handling to be moved to SearchBar component
  const [searchCalendars, setSearchCalendars] = useState("");
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    setCalendars(props.initialCalendars)
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

export async function getServerSideProps(context) {
  const { uid } = context.params;
  const response = await axios.get(`https://sync-calendar.vercel.app/api/user/${uid}/calendars`);
  const initialCalendars = await response.data;
  return { props: { initialCalendars } }
}