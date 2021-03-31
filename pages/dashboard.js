import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios' // to be update to fetchJson
import fetchJson from '../lib/fetchJson'
import useUser from '../lib/useUser'
import Layout from '../components/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarList from '../components/CalendarList';
 
export default function Dashboard(props) {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/' })
  const [loggedUser, setLoggedUser] = useState(user.user);

  //redirect according to user role
  const role = loggedUser.role
  let pageToRedirect = '/dashboard';
  if ( role === 'admin' || role === 'manager' ) { pageToRedirect = role }
  console.log(pageToRedirect)
  router.push(pageToRedirect)

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
      { (!user || role !== "basic" || user.isLoggedIn === false) ? (
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
    const response = await axios.get('https://sync-calendar.vercel.app/api/calendars');
    const initialCalendars = await response.data;
    return { props: { initialCalendars } }
}