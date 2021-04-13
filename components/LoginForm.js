/*
  Should be able to register with:
    -userId (ok)
    -password (ok)
    -name (ok)
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm({ handleNewUser }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { user, mutateUser } = useUser();
  const router = useRouter();

  async function handleLoginSubmit(e) {
    e.preventDefault()
    setLoading(true);
    const body = {
      usernameForm: username,
      passwordForm: password,
      nameForm: fullname
    }
    try {
      await mutateUser(
        fetchJson('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      ).then((data) => {
        //redirect to user page
        console.log(data.user.id)
        const userId = data.user.id;
        let pageToRedirect = `/${userId}`;
        router.push(pageToRedirect)
      })
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleLoginSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            onChange={event => setUsername(event.target.value)}
            value={username}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            onChange={event => setFullname(event.target.value)}
            value={fullname}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Button color="primary" onClick={handleNewUser}>
                  {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
          {loading && <CircularProgress />}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

LoginForm.propTypes = {
  onClick: PropTypes.func
}