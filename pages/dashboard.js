/*
  Main Dashboard render according to user role
  ## To do Mobile Header !!!
*/
 
import { useState, useEffect } from 'react';
import axios from 'axios'
import useUser from '../lib/useUser'
import Layout from '../components/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarList from '../components/CalendarList';
 
export default function Dashboard(props) {
  const { user } = useUser({ redirectTo: '/' })
  const loggedUser = user.user;
  const role = loggedUser.role
  const pageToRedirect = '/dashboard'
  if ( role === 'admin' || role === 'manager' ) { pageToRedirect = role }

  const { mutateUser } = useUser({ 
        redirectTo: pageToRedirect,
        redirectIfFound: true });

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