import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'VISAJI',
  description:
    "La mejor opción para adquirir microcréditos de vivienda.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
};

export default function StartPage() {
  let history = useHistory();
  const classes = useStyles();

  function redirectNewCase() {
    history.push("/new_case");
  }

  function redirectLogin() {
    history.push("/login");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="VISAJI" sections={[]} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={redirectNewCase}
                >
                  Solicitud Rápida
              </Button>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={redirectLogin}
                >
                  Acceso Empleados
              </Button>
              </Card>
            </Grid>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}