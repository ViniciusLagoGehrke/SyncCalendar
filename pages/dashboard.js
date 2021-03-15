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

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarList from '../components/CalendarList';
import Copyright from '../components/Copyright';
import useClock from '../utils/useClock';
import SearchBar from '../components/SearchBar';

import initialData from '../initialData.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  clockWrapper:{
    marginRight: theme.spacing(1),
    width: '100%'
  },
  clockIcon:{
    marginRight: theme.spacing(1)
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Dashboard() {
  const time = useClock();
  const classes = useStyles();
  //const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");

  const calendars = initialData.calendars;

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

  const handleSearchInput = e => {
    setSearchField(e.target.value);
  };

  const filteredCalendars = !searchField
    ? calendars
    : calendars.filter(
      calendar => {
        return (
          calendar
          .name
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
          calendar
          .owner
          .toLowerCase()
          .includes(searchField.toLowerCase())
        );
      }
    );

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {initialData.user.name}
          </Typography>
          <SearchBar
            value={searchField}
            onChange={handleSearchInput}
          />
          <div className={classes.grow} />
          <AccessTimeIcon className={classes.clockIcon}/>
          <Typography component="h3" variant="h6" color="inherit" noWrap >
            {time.toLocaleTimeString()}
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <CalendarList Calendars={filteredCalendars} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}