import { useRouter } from 'next/router'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import LinkMui from '@material-ui/core/Link';

import SearchBar from '../components/SearchBar';
import Copyright from '../components/Copyright';
import fetchJson from '../lib/fetchJson'
import useUser from '../lib/useUser'
import useClock from '../utils/useClock';
 
 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
    flexWrap: "nowrap"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
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
  titleWrap: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  },
  title: {
      marginRight: theme.spacing(2)
  },
  logout: {
      color: theme.palette.primary.contrastText,
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
    grid: {
    display: 'flex',
    padding: theme.spacing(3),
  }
}));
 
export default function Layout({
  title,
  searchValue,
  searchInput,
  children }) {
    
  const { user, mutateUser } = useUser({ redirectIfFound: true });
  const router = useRouter()
  const time = useClock();
  const classes = useStyles();

  //Homepage according to user role
  const role = user?.role;
  let homepage = `/${user.id}`;
  if ( role === 'admin' || role === 'manager' ){
    homepage = `/${role}`;
  }

  return (
    <div className={classes.root}>

      <AppBar
        position="absolute"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Box className={classes.titleWrap}>
            <Link href={homepage}>
              <LinkMui
                className={classes.title}
                color="inherit"
                variant="h6"
              >
                { title }
              </LinkMui>
            </Link>
            <a
              href="/api/auth/logout"
              onClick={async (e) => {
                e.preventDefault()
                await mutateUser(fetchJson('/api/auth/logout'))
                router.push('/')
              }}
            >
              <ExitToAppRoundedIcon className={classes.logout} />
            </a>
          </Box>
          <SearchBar
            value={searchValue}
            onChange={searchInput}
          />
          <AccessTimeIcon className={classes.clockIcon}/>
          <Typography
            component="h3"
            variant="h6"
            color="inherit"
            noWrap
          >
            {time}
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            className={classes.grid}
          >
            { children }
          </Grid >
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>

    </div>
  );
}
