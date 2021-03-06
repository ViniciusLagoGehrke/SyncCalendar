/*
  Should be able to SignUp with:
    -userId (ok)
    -password (ok)
    -name (ok)
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'

import PropTypes from 'prop-types'
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

import Copyright from './Copyright';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpForm({ handleNewUser }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [signupErrorMsg, setSignupErrorMsg] = useState('');

  async function handleSignupSubmit(e) {
    e.preventDefault()
    setLoading(true);
    const body = {
      usernameForm: username,
      passwordForm: password,
      nameForm: fullname
    }
    try {
      await fetchJson('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
      })

      handleNewUser();
      setLoading(false);      
    } catch (error) {
      setLoading(false);
      console.error('An unexpected error happened:', error)
      setSignupErrorMsg(error.data)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSignupSubmit}          
          noValidate
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
            label="name"
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button color="primary" onClick={handleNewUser}>
                  Already have an account? Log in
              </Button>
            </Grid>
          </Grid>
          {loading && <CircularProgress />}
          {signupErrorMsg && <Alert severity="error">{signupErrorMsg}</Alert>}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

SignUpForm.propTypes = {
  onClick: PropTypes.func
}