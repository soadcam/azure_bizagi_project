import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { postRequestUnauthorized } from "../../helper/handleRequest";

var path = require('path');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Visaji
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);
  const [enableOperations, setEnableOperations] = useState(true);

  let history = useHistory();
  const classes = useStyles();

  async function login() {
    setEnableOperations(false);
    if (await isValidUser())
      redirectListCases();
    else
    showErrorMessage();
    setEnableOperations(true);
  }

  async function isValidUser() {
    const url = path.join('/user', 'login');
    const request = await postRequestUnauthorized(url, history, {
      'email': userName,
      'password': password
    });
    if (request && request.token) {
      localStorage.setItem('token', request.token);
      history.push('/');
      return true;
    }
    else
      return false;
  }

  function redirectListCases() {
    history.push("/cases");
  }

  function showErrorMessage() {
    setShowLoginError(true);
  }

  function redirectStartPage() {
    history.push("/");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Acceso Analistas
          </Typography>
          <form className={classes.form} noValidate>
            {
              showLoginError &&
              <Alert variant="filled" severity="error">
                Usuario o Contraseña Inválidos.
          </Alert>
            }
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={login}
                  disabled={!enableOperations}
                >
                  Iniciar Sesión
                </Button>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  onClick={redirectStartPage}
                  disabled={!enableOperations}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}