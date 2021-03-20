/*
 
*/
 
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Copyright from '../components/Copyright';
import useClock from '../utils/useClock';
import SearchBar from '../components/SearchBar';
 
 
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
 title: {
   flexGrow: 1,
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
    
  const time = useClock();
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar
        position="absolute"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            { title }
          </Typography>
          <SearchBar
            value={searchValue}
            onChange={searchInput}
          />
          <div className={classes.grow} />
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
