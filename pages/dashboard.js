/*
  Main Dashboard render according to user role
  ## To do Mobile Header !!!
*/
 
import { useState, useEffect } from 'react';
import axios from 'axios' // to be update to fetchJson
import fetchJson from '../lib/fetchJson'
import useUser from '../lib/useUser'
import Layout from '../components/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarList from '../components/CalendarList';
 
export default function Dashboard(props) {
  const { user } = useUser({ redirectTo: '/' })
  const [loggedUser, setLoggedUser] = useState(user.user);
  const role = loggedUser.role

  //search handling to be moved to SearchBar component
  const [searchCalendars, setSearchCalendars] = useState("");
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    setCalendars(props.initialData)
  }, []);
  
  const handleSearchInput = e => {
    setSearchCalendars(e.target.value);
  };

  /*
      const { user } = useUser()
      const role = user.user.role
      const [pageToRedirect, setPageToRedirect] = useState('/dashboard')
      if ( role === 'admin' || role === 'manager' ) { setPageToRedirect(role) }
      await mutateUser({
        redirectTo: pageToRedirect,
        redirectIfFound: true
      })
  */
  
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